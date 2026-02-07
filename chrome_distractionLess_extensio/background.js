// Background script for DistractionLess YouTube extension

// Set up the extension when installed
chrome.runtime.onInstalled.addListener(function() {
  console.log('DistractionLess YouTube extension installed');
});

// Listen for tab updates to inject content script if needed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com')) {
    // Optionally inject content script again if needed
    chrome.scripting.executeScript({
      target: {tabId: tabId},
      files: ['content.js']
    }).catch(err => {
      // Handle error silently as content script is likely already injected via manifest
    });
  }
});

// Handle messages from content or popup scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getStatus') {
    // Return extension status if needed
    sendResponse({enabled: true});
  }
  return true; // Keep message channel open for async response
});