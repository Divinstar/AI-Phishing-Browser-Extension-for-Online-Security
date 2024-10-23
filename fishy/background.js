// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkPhishing") {
        fetch("http://localhost:8000/detect_phishing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: request.url }),
        })
        .then(response => response.json())
        .then(data => {
            sendResponse(data);
        })
        .catch(error => {
            console.error("Error:", error);
            sendResponse({ status: "error", message: "Unable to check the URL." });
        });
        return true; // Indicates that the response is asynchronous
    }
});
