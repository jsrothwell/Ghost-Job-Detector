// Ghost Job Detector - Content Script

browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'updateCompanyList') {
    highlightGhostJobs(message.companies, message.aliases);
  } else if (message.action === 'showInfoBanner') {
    showInfoBanner(message.message);
  }
});

(async () => {
  const { darkMode = false } = await browser.storage.local.get('darkMode');
  if (darkMode) document.body.classList.add('dark-mode');
})();

function highlightGhostJobs(companies, aliases) {
  const pageText = document.body.innerText;
  let flagged = false;

  companies.forEach(company => {
    const allNames = [company, ...(aliases[company] || [])];
    allNames.forEach(name => {
      if (pageText.includes(name)) {
        flagged = true;
        showWarningBanner(name);
      }
    });
  });

  if (!flagged) showPositiveIndicator();
}

function attachCloseButton(banner) {
  const closeBtn = document.createElement('span');
  closeBtn.textContent = '✖';
  closeBtn.className = 'banner-close';
  closeBtn.onclick = () => {
    banner.classList.add('fade-out');
    setTimeout(() => banner.remove(), 1000);
  };
  banner.appendChild(closeBtn);
}

function autoHideBanner(banner, delay = 5000) {
  setTimeout(() => {
    banner.classList.add('fade-out');
    setTimeout(() => banner.remove(), 1000);
  }, delay);
}

function showWarningBanner(company) {
  if (document.getElementById('ghost-job-warning')) return;

  const banner = document.createElement('div');
  banner.id = 'ghost-job-warning';
  banner.textContent = `⚠️ Warning: ${company} is reported for ghost job postings`;
  document.body.appendChild(banner);

  attachCloseButton(banner);
  browser.runtime.sendMessage({
    action: 'warningShown',
    company,
    url: window.location.href,
    jobAge: null
  });
  autoHideBanner(banner);
}

async function showPositiveIndicator() {
  const { showPositiveIndicator = true } = await browser.storage.local.get('showPositiveIndicator');
  if (!showPositiveIndicator || document.getElementById('ghost-job-safe')) return;

  const banner = document.createElement('div');
  banner.id = 'ghost-job-safe';
  banner.textContent = `✅ This posting does not match known ghost job companies`;
  document.body.appendChild(banner);

  attachCloseButton(banner);
  autoHideBanner(banner);
}

function showInfoBanner(message) {
  if (document.getElementById('ghost-job-info')) {
    document.getElementById('ghost-job-info').textContent = `ℹ️ ${message}`;
    return;
  }

  const banner = document.createElement('div');
  banner.id = 'ghost-job-info';
  banner.textContent = `ℹ️ ${message}`;
  document.body.appendChild(banner);

  attachCloseButton(banner);
  autoHideBanner(banner);
}
