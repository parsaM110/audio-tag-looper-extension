let isActive = false;

document.getElementById("enable-loop").addEventListener("click", () => {

  const button = document.getElementById("enable-loop");
  
  isActive = !isActive;
  
  if (isActive) {
    button.style.backgroundColor = "red";
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            console.log("Logged in active tab!");
          }
        });
      });
  } else {
    button.style.backgroundColor = "gray";
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            console.log("Logged in unactive tab!");
          }
        });
      });
  }
});



    