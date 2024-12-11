// Initialize state on install/update
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ loopState: false });
  });
  
  // Listener for toolbar icon click
  chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get('loopState', (data) => {
      const newState = !data.loopState;

      chrome.action.setIcon({ 
        path: {
          '16': '/data/icons'  + '/disabled' + '/16.png',
          '32': '/data/icons'  + '/disabled' + '/32.png',
          '48': '/data/icons' +  '/disabled' + '/48.png'
        }
      });
  
      // Update the loop state in storage
      chrome.storage.sync.set({ loopState: newState }, () => {
        
        // Inject script to toggle the loop attribute on all audio tags
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: toggleAudioLoop,
          args: [newState],
        }).catch((error) => console.error('Script execution error:', error));
      });
    });
  });
  
  // Function to toggle loop attribute on audio elements
  function toggleAudioLoop(state) {
    try {
      document.querySelectorAll('audio').forEach(audio => {
        if (state) {
          audio.setAttribute('loop', '');
        } else {
          audio.removeAttribute('loop');
        }
      });
    } catch (error) {
      console.error('Error toggling loop:', error);
    }
  }
  