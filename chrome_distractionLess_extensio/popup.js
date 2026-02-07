// Popup script for DistractionLess YouTube extension

document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleBtn');
  const statusDiv = document.getElementById('status');
  
  // Function to update UI based on extension state
  function updateUI(enabled) {
    if (enabled) {
      toggleBtn.innerHTML = '<span>Disable Focus Mode</span>';
      statusDiv.textContent = 'Status: Enabled';
      statusDiv.className = 'status enabled';
      
      // Add pulse animation
      toggleBtn.classList.add('pulse-animation');
      setTimeout(() => toggleBtn.classList.remove('pulse-animation'), 500);
    } else {
      toggleBtn.innerHTML = '<span>Enable Focus Mode</span>';
      statusDiv.textContent = 'Status: Disabled';
      statusDiv.className = 'status disabled';
    }
  }
  
  // Get current tab and check extension status
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'checkStatus'}, function(response) {
      if (response) {
        updateUI(response.enabled);
      } else {
        // If no response, assume disabled
        updateUI(false);
      }
    });
  });
  
  // Add event listener to toggle button
  toggleBtn.addEventListener('click', function() {
    // Add animation class
    this.classList.add('pulse-animation');
    setTimeout(() => this.classList.remove('pulse-animation'), 500);
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleMode'}, function(response) {
        if (response) {
          // Update UI after toggling
          chrome.tabs.sendMessage(tabs[0].id, {action: 'checkStatus'}, function(checkResponse) {
            if (checkResponse) {
              updateUI(checkResponse.enabled);
            }
          });
        }
      });
    });
  });
});