chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo?.status === "complete") {
    const url = new URL(tab.url);

    chrome.permissions.contains(
      {
        origins: [`${url.protocol}//${url.host}/*`],
      },
      (result) => {
        if (result) {
          chrome.tabs.executeScript(tabId, {
            file: "scoped-labels.js",
          });

          chrome.tabs.executeScript(tabId, {
            file: "panel.js",
          });
        }
      }
    );
  }
});

chrome.browserAction.onClicked.addListener((tab) => {
  const url = new URL(tab.url);

  chrome.permissions.request(
    {
      origins: [`${url.protocol}//${url.host}/*`],
    },
    (granted) => {
      console.log(granted);
    }
  );
});
