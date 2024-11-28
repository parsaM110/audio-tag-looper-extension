// Initialize state on install/update
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ loopState: false });
  });
  
  // Listener for toolbar icon click
  chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get('loopState', (data) => {
      const newState = !data.loopState;
  
      // Update the loop state in storage
      chrome.storage.sync.set({ loopState: newState }, () => {
        // Update the toolbar icon based on the new state
        chrome.action.setIcon({
          path: newState ? './icon-red.png' : './icon-gray.png',
        });
  
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
  