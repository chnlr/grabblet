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
            if (isMobileDevice()) {
                // Redirect mobile users to the mobile download page
                window.location.href = '/mobile-download/' + encodeURIComponent(data.video_url);
            } else {
                // Automatically trigger download for desktop users
                const a = document.createElement('a');
                a.href = data.video_url;
                a.download = 'video.mp4';
                a.click();
            }
        } else {
            alert('Failed to retrieve video.');
        }
    });
});

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}