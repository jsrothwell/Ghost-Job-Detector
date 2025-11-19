// Ghost Job Detector - Background Service Worker (cross-browser)

const DEFAULT_GHOST_COMPANIES = [
  'Accenture', 'CVS Health', 'Dice', 'Crossover', 'Revature',
  'TEKsystems', 'Robert Half', 'Insight Global', 'Apex Systems',
  'ManpowerGroup', 'Kelly Services', 'Randstad', 'Aerotek'
];

const COMPANY_ALIASES = {
  'Accenture': ['Accenture Federal Services', 'Accenture Technology', 'Avanade'],
  'CVS Health': ['CVS', 'CVS Pharmacy', 'Aetna', 'CVS Caremark'],
  'Robert Half': ['Robert Half Technology', 'Robert Half Finance', 'Protiviti'],
  'ManpowerGroup': ['Manpower', 'Experis', 'Talent Solutions'],
  'Kelly Services': ['Kelly', 'Kelly IT', 'Kelly Engineering'],
  'Randstad': ['Randstad Technologies', 'Randstad Digital', 'Randstad Engineering']
};

browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    await initializeGhostJobList();
  } else if (details.reason === 'update') {
    await updateGhostJobList();
  }
});

async function initializeGhostJobList() {
  await browser.storage.local.set({
    ghostJobCompanies: DEFAULT_GHOST_COMPANIES,
    companyAliases: COMPANY_ALIASES,
    lastUpdated: Date.now(),
    warningCount: 0,
    userReports: [],
    darkMode: false,
    autoUpdate: true,
    showPositiveIndicator: true
  });
  await updateGhostJobList();
}

async function scrapeGhostJobsIO() {
  try {
    const response = await fetch('https://ghostjobs.io/', {
      method: 'GET',
      headers: { 'Accept': 'text/html' }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const companyPattern = /<[^>]*class="[^"]*company[^"]*"[^>]*>([^<]+)<\/[^>]*>/gi;
    const matches = html.matchAll(companyPattern);
    const scraped = new Set();
    for (const m of matches) {
      const name = m[1].trim();
      if (name && name.length > 2 && name.length < 100) scraped.add(name);
    }
    return Array.from(scraped);
  } catch (e) {
    console.warn('GhostJobs.io fetch failed', e);
    return [];
  }
}

async function updateGhostJobList() {
  try {
    const { ghostJobCompanies, userReports, autoUpdate } = await browser.storage.local.get([
      'ghostJobCompanies', 'userReports', 'autoUpdate'
    ]);
    const current = ghostJobCompanies || [];
    const reports = userReports || [];
    const allowAuto = autoUpdate !== false;

    let updated = [...DEFAULT_GHOST_COMPANIES];

    const reported = reports.filter(r => (r.votes || 0) >= 2).map(r => r.company);
    updated = [...new Set([...updated, ...reported])];

    if (allowAuto) {
      const scraped = await scrapeGhostJobsIO();
      if (scraped.length) updated = [...new Set([...updated, ...scraped])];
    }

    const manual = current.filter(c => !DEFAULT_GHOST_COMPANIES.includes(c));
    updated = [...new Set([...updated, ...manual])].sort((a, b) => a.localeCompare(b));

    await browser.storage.local.set({
      ghostJobCompanies: updated,
      companyAliases: COMPANY_ALIASES,
      lastUpdated: Date.now()
    });

    const tabs = await browser.tabs.query({});
    for (const tab of tabs) {
      if (!tab.id) continue;
      try {
        await browser.tabs.sendMessage(tab.id, {
          action: 'updateCompanyList',
          companies: updated,
          aliases: COMPANY_ALIASES
        });
      } catch {}
    }
    return updated;
  } catch (e) {
    console.error('Update failed', e);
    return DEFAULT_GHOST_COMPANIES;
  }
}

browser.runtime.onMessage.addListener(async (request) => {
  if (request.action === 'updateGhostJobList') {
    const companies = await updateGhostJobList();
    return { success: true, count: companies.length };
  }
  if (request.action === 'warningShown') {
    const { warningCount = 0, warningHistory = [] } = await browser.storage.local.get([
      'warningCount', 'warningHistory'
    ]);
    const history = [...warningHistory, {
      company: request.company,
      url: request.url,
      timestamp: Date.now(),
      jobAge: request.jobAge
    }].slice(-100);
    await browser.storage.local.set({ warningCount: warningCount + 1, warningHistory: history });
    return { success: true };
  }
  if (request.action === 'addCompany') {
    const { ghostJobCompanies = [] } = await browser.storage.local.get('ghostJobCompanies');
    if (!ghostJobCompanies.includes(request.company)) {
      const companies = [...ghostJobCompanies, request.company].sort((a, b) => a.localeCompare(b));
      await browser.storage.local.set({ ghostJobCompanies: companies });
      return { success: true };
    }
    return { success: false, message: 'Company already exists' };
  }
  if (request.action === 'removeCompany') {
    const { ghostJobCompanies = [] } = await browser.storage.local.get('ghostJobCompanies');
    const companies = ghostJobCompanies.filter(c => c !== request.company);
    await browser.storage.local.set({ ghostJobCompanies: companies });
    return { success: true };
  }
  if (request.action === 'reportCompany') {
    const { userReports = [] } = await browser.storage.local.get('userReports');
    const idx = userReports.findIndex(r => r.company === request.company);
    if (idx >= 0) {
      userReports[idx] = {
        ...userReports[idx],
        votes: (userReports[idx].votes || 0) + 1,
        lastReported: Date.now()
      };
    } else {
      userReports.push({
        company: request.company,
        votes: 1,
        firstReported: Date.now(),
        lastReported: Date.now(),
        reason: request.reason
      });
    }
    await browser.storage.local.set({ userReports });
    return { success: true };
  }
  if (request.action === 'exportHistory') {
    const { warningHistory = [], ghostJobCompanies = [] } = await browser.storage.local.get([
      'warningHistory', 'ghostJobCompanies'
    ]);
    return {
      success: true,
      data: {
        exportDate: new Date().toISOString(),
        warningHistory,
        trackedCompanies: ghostJobCompanies
      }
    };
  }
  if (request.action === 'toggleDarkMode') {
    await browser.storage.local.set({ darkMode: request.enabled });
    return { success: true };
  }
  if (request.action === 'toggleAutoUpdate') {
    await browser.storage.local.set({ autoUpdate: request.enabled });
    return { success: true };
  }
  if (request.action === 'togglePositiveIndicator') {
    await browser.storage.local.set({ showPositiveIndicator: request.enabled });
    return { success: true };
  }
  return { success: false, message: 'Unknown action' };
});

browser.alarms.create('updateGhostJobList', { periodInMinutes: 1440 });
browser.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'updateGhostJobList') {
    await updateGhostJobList();
  }
});
