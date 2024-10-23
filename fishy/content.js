// content.js

function captureData() {
    const url = window.location.href; // Get the current URL

    // Send the captured URL to the backend for phishing detection
    sendToBackend(url);
}

function sendToBackend(url) {
    fetch('http://localhost:5000/detect_phishing', {  // Local backend URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Phishing detection result:", data);
        if (data.is_phishing) {
            alert("Warning: This site may be a phishing site!");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Listen for when the page has fully loaded
window.addEventListener('load', captureData);
