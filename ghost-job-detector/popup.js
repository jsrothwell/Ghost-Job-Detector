(async () => {
  const { darkMode = false, showPositiveIndicator = true } = await browser.storage.local.get([
    'darkMode', 'showPositiveIndicator'
  ]);
  document.getElementById('darkModeToggle').checked = darkMode;
  document.getElementById('positiveIndicatorToggle').checked = showPositiveIndicator;
  if (darkMode) document.body.classList.add('dark-mode');
})();

document.getElementById('darkModeToggle').addEventListener('change', async (e) => {
  const enabled = e.target.checked;
  await browser.runtime.sendMessage({ action: 'toggleDarkMode', enabled });
  document.body.classList.toggle('dark-mode', enabled);
});

document.getElementById('positiveIndicatorToggle').addEventListener('change', async (e) => {
  await browser.runtime.sendMessage({ action: 'togglePositiveIndicator', enabled: e.target.checked });
});

document.getElementById('updateListBtn').addEventListener('click', async () => {
  const response = await browser.runtime.sendMessage({ action: 'updateGhostJobList' });

  // Try to show info banner in the active tab
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (tabs[0]?.id) {
    try {
      await browser.tabs.sendMessage(tabs[0].id, {
        action: 'showInfoBanner',
        message: `Ghost job list updated. Total companies: ${response.count}`
      });
    } catch (e) {}
  }
});
