const base = browser.runtime.getURL("");
console.log(base);
browser.webRequest.onHeadersReceived.addListener(
    (request) => {
        request.responseHeaders[
            "Content-Security-Policy"
        ] = `script-src ${base}`;
        return { responseHeaders: request.responseHeaders };
    },
    { urls: ["<all_urls>"] },
    ["blocking", "responseHeaders"]
);
