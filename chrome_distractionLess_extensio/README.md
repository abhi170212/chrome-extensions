# DistractionLess YouTube Chrome Extension

This Chrome extension creates a distraction-free environment for watching YouTube videos by hiding recommendations, comments, and other distracting elements. Features beautiful animations and modern design for an enhanced user experience.

## Enhanced Features

- Hides YouTube sidebar recommendations
- Removes comment sections
- Cleans up header clutter
- Focuses on video content
- Removes related videos
- Preserves video playback controls
- Toggle between distraction-free and normal modes
- Smooth animated transitions
- Beautiful gradient design
- Floating action button with animations
- Responsive design for all devices
- Custom scrollbars
- Glowing video player effects
- Professional popup interface

## Installation Instructions

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle switch in the top-right corner
3. Click "Load unpacked" button
4. Select the folder containing this extension (where this README file is located)
5. The extension should now appear in your extensions list

## Usage

- Click the extension icon in the Chrome toolbar
- In the popup, click "Enable Focus Mode" to activate
- The extension will hide distracting elements on YouTube with smooth animations
- Click "Disable Focus Mode" to return to normal view
- The setting persists between YouTube page visits
- You can also use the floating button on the YouTube page to toggle

## Files Included

- `manifest.json` - Extension configuration
- `content.js` - Core functionality that modifies YouTube pages
- `styles.css` - Enhanced styling with animations for the distraction-free experience
- `popup.html` - Beautiful user interface for the extension popup
- `popup.js` - Logic for the popup interface
- `background.js` - Background script for extension functionality
- `icon*.png` - Extension icons

## How It Works

The extension runs a content script on YouTube pages that:
- Identifies and smoothly hides distracting elements using CSS animations
- Maintains video playback functionality
- Stores user preferences using localStorage
- Responds to user commands from the popup interface
- Creates a beautiful gradient background for focus
- Adds glowing effects to the video player
- Provides smooth transitions between modes