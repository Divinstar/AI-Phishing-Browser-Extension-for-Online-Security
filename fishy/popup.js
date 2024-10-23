document.addEventListener('DOMContentLoaded', function () {
    const checkButton = document.getElementById('check-url');
    const resultDiv = document.getElementById('result');

    checkButton.addEventListener('click', function () {
        // Get the current tab's URL
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const currentTab = tabs[0];
            const currentUrl = currentTab.url;

            // Show loading message
            resultDiv.textContent = "Checking URL...";

            // Send the URL to the background script
            chrome.runtime.sendMessage({ action: "checkPhishing", url: currentUrl }, function (response) {
                // Handle the response from the backend
                if (response.status === "safe") {
                    resultDiv.innerHTML = `<span style="color: green;">Safe:</span> ${response.message}`;
                } else if (response.status === "phishing") {
                    resultDiv.innerHTML = `<span style="color: red;">Phishing Detected:</span> ${response.message}`;
                } else if (response.status === "error") {
                    resultDiv.innerHTML = `<span style="color: orange;">Error:</span> ${response.message}`;
                } else {
                    resultDiv.innerHTML = `<span style="color: gray;">Unknown status:</span> ${response.message}`;
                }
            });
        });
    });
});
