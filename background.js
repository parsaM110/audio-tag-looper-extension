// Initialize state on install/update
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ loopState: false });
  });
  
  // Listener for toolbar icon click
  chrome.action.onClicked.addListener((tab) => { 
    chrome.action.setIcon({ 
      path: {
        '16': '/data/icons'  + '/disabled' + '/16.png',
        '32': '/data/icons'  + '/disabled' + '/32.png',
        '48': '/data/icons' +  '/disabled' + '/48.png'
      }
  });
  });

  // chrome.action.onClicked.addListener((tab) => {
  //   chrome.tabs.create({url: "https://www.youtube.com"});
  // });
  
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
  