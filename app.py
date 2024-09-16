from flask import Flask, render_template, request, redirect, url_for
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


@app.route('/download', methods=['POST'])
def download_video():
    video_url = request.form['url']
    download_folder = os.path.join(os.path.expanduser("~"), "Downloads")
    
    ydl_opts = {
        'format': 'best',  # Automatically choose the best format
        'outtmpl': os.path.join(download_folder, '%(title)s.%(ext)s')
    }

    # Use yt-dlp's automatic platform detection based on URL
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])

    return render_template('download.html')  # Redirect to download complete page

if __name__ == '__main__':
    app.run(debug=True)
