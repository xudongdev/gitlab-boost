chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  console.log("onUpdated tabId", tabId, changeInfo);

  if (changeInfo?.status === "complete") {
    console.log("@@@");

    chrome.tabs.executeScript(tabId, {
      file: "scoped-labels.js",
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
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
