# Image Describe — Chrome Extension

A Chrome extension that adds a **right-click context menu** on images to generate a short description using an AI service (OpenAI/Gemini/etc.).

---

## Features

* Right-click any image → **Describe this image**
* Sends the image URL to an AI API
* Shows description in a popup with image preview
* Copy description to clipboard
* Error handling: invalid images, network/API errors

---

## Setup Instructions

### 1. Clone / Download the code

```bash
git clone <your-repo-link>
# OR download ZIP and unzip
```

### 2. Open Chrome Extensions

* Go to `chrome://extensions/`
* Turn on **Developer Mode**
* Click **Load unpacked** and select the extension folder

### 3. Configure API

1. Click the **extension icon → Options**
2. Enter your API endpoint and API key

   * OpenAI endpoint example: `https://api.openai.com/v1/chat/completions`
   * API Key: `sk-...`
3. Click **Save**

### 4. Test the Extension

1. Open a webpage with images
2. Right-click an image → select **Describe this image**
3. Popup appears showing:

   * Image preview
   * AI-generated description
   * Copy & Close buttons

---

## File Structure

```
image-describe-extension/
│
├─ manifest.json          # Chrome manifest
├─ background.js          # Service worker, handles context menu + AI calls
├─ options.html           # API key/endpoint input page
├─ options.js
├─ popup.html             # Popup UI
├─ popup.js
├─ styles.css             # Popup styling

```

---

## Notes

* Ensure the API endpoint matches `host_permissions` in `manifest.json`
* Chrome requires **valid PNG icons**
* Stored API key is saved locally in Chrome storage — for production consider a backend proxy for security
* Supports OpenAI and Azure OpenAI endpoints

---

