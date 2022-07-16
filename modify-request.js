// let pattern =
//     "https://www.coursehero.com/api/v1/personalized-content/signup-suggestions/?schoolId=31&dbFilename=14207943";
let pattern = "https://www.coursehero.com/api/v1/users/details/";
// let targetUrl = "file:///home/humblecatcher/code/sandbox/firefox-addon/mock.json";
let targetUrl = browser.runtime.getURL("mock.json");
console.log("will redirect", pattern, "to", targetUrl);

function redirect(requestDetails) {
    console.log("Redirecting: " + requestDetails.url);
    if (requestDetails.url === targetUrl) {
        return;
    }
    return {
        redirectUrl: targetUrl,
    };
}

browser.webRequest.onBeforeRequest.addListener(redirect, { urls: [pattern] }, [
    "blocking",
]);
