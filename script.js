document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById("enable-loop");
  
  const savedState = localStorage.getItem('buttonState') === 'true';
  
  if (savedState) {
    button.style.backgroundColor = "red";
  } else {
    button.style.backgroundColor = "gray";
  }

  button.addEventListener("click", () => {
    const currentState = localStorage.getItem('buttonState') === 'true';
    const newState = !currentState;
    
    localStorage.setItem('buttonState', newState);
    
    if (newState) {
      button.style.backgroundColor = "red";
    } else {
      button.style.backgroundColor = "gray";
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: (state) => {
          document.querySelectorAll('audio').forEach(audio => {
            if (state) {
              audio.setAttribute('loop', '');
            } else {
              audio.removeAttribute('loop');
            }
          });
          console.log(state ? "Looping Enabled" : "Looping Disabled");
        },
        args: [newState]
      });
    });
  });
});