const descEl = document.getElementById('desc');
const imageWrap = document.getElementById('imageWrap');
const copyBtn = document.getElementById('copyBtn');
const closeBtn = document.getElementById('closeBtn');
async function load() {
  const data = await chrome.storage.local.get(['lastImageDescription','lastImageUrl']);
  if (data.lastImageUrl) {
    const img = document.createElement('img');
    img.src = data.lastImageUrl;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '140px';
    imageWrap.appendChild(img);
  }
  descEl.textContent = data.lastImageDescription || 'No description available';
}
copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(descEl.textContent);
  alert('Copied');
});
closeBtn.addEventListener('click', () => window.close());
load();