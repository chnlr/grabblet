document.getElementById('download-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    alert('Downloading: ' + url);

    // Function to detect if the user is on a mobile device
    function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    if (isMobileDevice()) {
        // For mobile devices, create a temporary link for the user to press and hold to download
        const tempLink = document.createElement('a');
        tempLink.href = url;  // This should be the direct video URL
        tempLink.textContent = 'Hold to Download Video';
        tempLink.download = 'video.mp4';  // You can customize the name
        document.body.appendChild(tempLink);
    } else {
        // Handle desktop download behavior
        // For desktops, you may trigger the backend download normally
    }

    // Optionally: Make an AJAX request to your backend to process the download
});
