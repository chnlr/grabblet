from flask import Flask, render_template, request, redirect, url_for, send_file
import os
import yt_dlp

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')


@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/download-video')
def download_video():
    return send_file('path-to-video.mp4', as_attachment=True, download_name='video.mp4')


@app.route('/download', methods=['POST'])
def download_video():
    video_url = request.form['url']
    download_folder = os.path.join(os.path.expanduser("~"), "Downloads")
    
    ydl_opts = {
        'format': 'best',
        'outtmpl': os.path.join(download_folder, '%(title)s.%(ext)s')
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])

    return render_template('download.html')  # Render a confirmation page for download completion

if __name__ == '__main__':
    app.run(debug=True)
