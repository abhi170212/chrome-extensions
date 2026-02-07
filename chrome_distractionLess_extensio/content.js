// DistractionLess YouTube Extension
// Content script to modify YouTube interface for distraction-free viewing

(function() {
  'use strict';

  // Function to hide elements with animation
  function hideElementAnimated(element) {
    if (element && !element.classList.contains('distractionless-hidden')) {
      element.classList.add('animated-hide', 'distractionless-hidden');
      // Remove the element from DOM after animation completes
      setTimeout(() => {
        if (element.classList.contains('distractionless-hidden')) {
          element.style.display = 'none';
        }
      }, 700);
    }
  }

  // Function to show elements with animation
  function showElementAnimated(element) {
    if (element && element.classList.contains('distractionless-hidden')) {
      element.classList.remove('animated-hide', 'distractionless-hidden');
      element.style.display = '';
    }
  }

  // Function to apply distraction-free mode with animations
  function applyDistractionFreeMode() {
    const body = document.body;
    
    // Add entering animation class
    body.classList.add('distractionless-entering');
    
    // Hide sidebar
    const guideContent = document.querySelector('#guide-content');
    if (guideContent) {
      hideElementAnimated(guideContent);
    }
    
    // Hide related videos
    const related = document.querySelector('#related');
    if (related) {
      hideElementAnimated(related);
    }
    
    // Hide secondary content
    const secondaryResults = document.querySelector('.ytd-watch-next-secondary-results-renderer');
    if (secondaryResults) {
      hideElementAnimated(secondaryResults);
    }
    
    // Hide comments section
    const comments = document.querySelector('#comments');
    if (comments) {
      hideElementAnimated(comments);
    }
    
    // Hide secondary panel
    const secondary = document.querySelector('#secondary');
    if (secondary) {
      hideElementAnimated(secondary);
    }
    
    // Hide YouTube logo and extra header content
    const masthead = document.querySelector('ytd-masthead');
    if (masthead) {
      masthead.style.opacity = '0.8';
    }
    
    // Add the main enabled class
    body.classList.add('distractionless-enabled');
    
    // Remove entering class after animation
    setTimeout(() => {
      body.classList.remove('distractionless-entering');
    }, 800);
    
    console.log('DistractionLess mode activated');
  }

  // Function to restore normal mode with animations
  function restoreNormalMode() {
    const body = document.body;
    
    // Add exiting animation class
    body.classList.add('distractionless-exiting');
    
    // Show all hidden elements
    const hiddenElements = document.querySelectorAll('.distractionless-hidden');
    hiddenElements.forEach(el => {
      showElementAnimated(el);
    });
    
    // Restore YouTube logo visibility
    const masthead = document.querySelector('ytd-masthead');
    if (masthead) {
      masthead.style.opacity = '';
    }
    
    // Remove the main enabled class
    body.classList.remove('distractionless-enabled', 'distractionless-exiting');
    
    console.log('Normal mode restored');
  }

  // Toggle distraction-free mode
  function toggleDistractionFreeMode() {
    const body = document.body;
    if (body.classList.contains('distractionless-enabled')) {
      restoreNormalMode();
      localStorage.setItem('distractionless-enabled', 'false');
    } else {
      applyDistractionFreeMode();
      localStorage.setItem('distractionless-enabled', 'true');
    }
  }

  // Create toggle button with animations
  function createToggleButton() {
    // Check if button already exists
    if (document.querySelector('#distractionless-toggle-btn')) {
      return;
    }
    
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'distractionless-toggle-btn';
    toggleBtn.className = 'distractionless-toggle-btn';
    toggleBtn.innerHTML = '<span>🎬 Focus Mode</span>';
    
    // Add click event
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleDistractionFreeMode();
      
      // Update button text based on state
      const body = document.body;
      if (body.classList.contains('distractionless-enabled')) {
        this.innerHTML = '<span>🎬 Exit Focus</span>';
        // Add pulse animation
        this.classList.add('pulse-animation');
        setTimeout(() => this.classList.remove('pulse-animation'), 1000);
      } else {
        this.innerHTML = '<span>🎬 Focus Mode</span>';
      }
    });
    
    // Add to page
    document.body.appendChild(toggleBtn);
  }

  // Watch for page changes and reapply if needed
  let currentUrl = window.location.href;
  setInterval(() => {
    if (currentUrl !== window.location.href) {
      currentUrl = window.location.href;
      // Reapply mode if it was enabled before navigation
      if (localStorage.getItem('distractionless-enabled') === 'true') {
        setTimeout(() => {
          applyDistractionFreeMode();
          // Update button text if it exists
          const btn = document.querySelector('#distractionless-toggle-btn');
          if (btn) {
            btn.innerHTML = '<span>🎬 Exit Focus</span>';
          }
        }, 1000); // Wait for page to load
      }
    }
  }, 1000);

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleMode') {
      toggleDistractionFreeMode();
      
      // Update button text based on state
      const btn = document.querySelector('#distractionless-toggle-btn');
      if (btn) {
        const body = document.body;
        if (body.classList.contains('distractionless-enabled')) {
          btn.innerHTML = '<span>🎬 Exit Focus</span>';
        } else {
          btn.innerHTML = '<span>🎬 Focus Mode</span>';
        }
      }
      
      sendResponse({status: 'toggled'});
    } else if (request.action === 'checkStatus') {
      sendResponse({enabled: document.body.classList.contains('distractionless-enabled')});
    }
    return true; // Keep message channel open for async response
  });

  // Apply initial state based on stored preference
  function initializeExtension() {
    // Create the toggle button
    createToggleButton();
    
    // Apply initial state based on stored preference
    if (localStorage.getItem('distractionless-enabled') === 'true') {
      // Small delay to ensure page is loaded
      setTimeout(applyDistractionFreeMode, 1500);
      
      // Update button text
      setTimeout(() => {
        const btn = document.querySelector('#distractionless-toggle-btn');
        if (btn) {
          btn.innerHTML = '<span>🎬 Exit Focus</span>';
        }
      }, 1600);
    }
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeExtension);
  } else {
    // DOM is already loaded, run immediately
    initializeExtension();
  }

})();