document.getElementById('download-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    alert('Downloading: ' + url);
    // You can add AJAX later to make a request to your backend
});
