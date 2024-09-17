from flask import Flask, render_template, request, send_file
from PIL import Image
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('convert.html')

@app.route('/convert', methods=['POST'])
def convert_image():
    image_file = request.files['image']
    format = request.form['format']
    img = Image.open(image_file)
    
    output_filename = f'converted_image.{format}'
    output_path = os.path.join('/tmp', output_filename)
    
    img.save(output_path, format.upper())

    return send_file(output_path, as_attachment=True, download_name=output_filename)

if __name__ == '__main__':
    app.run(debug=True)
