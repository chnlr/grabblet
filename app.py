from flask import Flask, render_template, request
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
        'format': 'best',
        'outtmpl': os.path.join(download_folder, '%(title)s.%(ext)s'),
        'cookiefile': 'path-to-your-cookies.txt'  # Replace with your cookies file path
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])
        return render_template('download.html')
    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)
