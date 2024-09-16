document.getElementById('download-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    alert('Downloading: ' + url);

    // Function to detect if the user is on a mobile device
    function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    if (isMobileDevice()) {
        // For mobile devices, create a temporary link for the user to download manually
        const tempLink = document.createElement('a');
        tempLink.href = url;  // This should be the direct video URL (adjust to your video link handler)
        tempLink.textContent = 'Hold to Download Video';
        tempLink.download = 'video.mp4';  // Customize the name if needed
        document.body.appendChild(tempLink);
        tempLink.click();  // Simulate click for mobile download prompt
    } else {
        // Trigger the backend download behavior for desktop
        const form = document.getElementById('download-form');
        form.submit();  // Let the form handle the download on desktop
    }
});
