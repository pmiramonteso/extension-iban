chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "IBAN_FOUND") {
        chrome.storage.local.set({ ibans: message.ibans });
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "loading") {
        chrome.storage.local.remove("ibans");
    }
});




