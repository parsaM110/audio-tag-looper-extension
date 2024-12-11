// Initialize state on install/update
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ loopState: false });
  });
  
  // Listener for toolbar icon click
  // chrome.action.onClicked.addListener((tab) => { 
  //   chrome.action.setIcon({ path: {
  //      "16": "icon-red.png",
  //      "32": "icon-red.png",
  //      "48": "icon-red.png" 
  //   } });
  // });

  chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({url: "https://www.youtube.com"});
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
  