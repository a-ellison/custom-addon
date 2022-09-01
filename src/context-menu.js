browser.contextMenus.create({
    id: "dictionary",
    title: "Lookup definition",
    contexts: ["selection"],
});
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "dictionary") {
        const selection = info.selectionText;
        const url = `https://www.google.com/search?q=${encodeURIComponent(
            "define:" + selection
        )}`;
        browser.tabs.create({
            active: true,
            url,
        });
    }
});
