document.getElementById('download-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    fetch('/get-video-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
        if (data.video_url) {
            const a = document.createElement('a');
            a.href = data.video_url;
            a.download = 'video.mp4';
            a.click();
        } else {
            alert('Failed to retrieve video.');
        }
    });

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
