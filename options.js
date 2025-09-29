const endpointEl = document.getElementById('endpoint');
const keyEl = document.getElementById('key');
const saveBtn = document.getElementById('save');
chrome.storage.local.get(['apiKey','apiEndpoint'], (res) => {
  if (res.apiEndpoint) endpointEl.value = res.apiEndpoint;
  if (res.apiKey) keyEl.value = res.apiKey;
});
saveBtn.addEventListener('click', () => {
  chrome.storage.local.set({ apiEndpoint: endpointEl.value, apiKey: keyEl.value }, () => alert('Saved'));
});