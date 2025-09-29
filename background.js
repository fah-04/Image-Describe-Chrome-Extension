// background.js
const MENU_ID = 'describe-image-menu';
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: 'Describe this image',
    contexts: ['image']
  });
});
function isValidImageUrl(url) {
  try {
    const u = new URL(url);
    return /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i.test(u.pathname) || url.includes('data:image') || url.includes('/image');
  } catch (e) { return false; }
}
async function callAIForDescription(imageUrl) {
  const { apiKey, apiEndpoint } = await chrome.storage.local.get(['apiKey','apiEndpoint']);
  if (!apiKey || !apiEndpoint) throw new Error('No API key or endpoint configured.');
  const body = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a concise assistant that returns a 1-2 sentence description of an image given its URL.' },
      { role: 'user', content: `Describe this image in 1-2 short sentences: ${imageUrl}` }
    ]
  };
  const res = await fetch(apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`API request failed: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || 'No description available';
}
chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== MENU_ID) return;
  const imageUrl = info.srcUrl;
  if (!imageUrl || !isValidImageUrl(imageUrl)) {
    chrome.notifications.create({ type: 'basic', iconUrl: 'icons/icon48.png', title: 'Error', message: 'Invalid image URL' });
    return;
  }
  try {
    const description = await callAIForDescription(imageUrl);
    await chrome.storage.local.set({ lastImageDescription: description, lastImageUrl: imageUrl });
    chrome.windows.create({ url: 'popup.html', type: 'popup', width: 420, height: 360 });
  } catch (err) {
    chrome.notifications.create({ type: 'basic', iconUrl: 'icons/icon48.png', title: 'Error', message: err.message });
  }
});