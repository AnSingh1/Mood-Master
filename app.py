from flask import Flask, render_template, request, jsonify, Response
from chat import chatbot
app = Flask(__name__)
import json

from uploader import uploadhandler, delete_files
from video import process_cam
from text import textdetect
from firebase import addUser, getUserData
from cryptography.fernet import Fernet
from flask_socketio import SocketIO, emit

socket = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/app')
def app_page():
    return render_template('app.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/chat', methods=['POST'])

def chat():
    message = json.loads(request.form['message'])
    botmsg = chatbot(message)
    return botmsg

@app.route('/upload', methods = ["POST"])
def upload():
    print("UPLOADED")
    
    file = request.files['file']  # Use 'file' as the key to access the uploaded file
    
    url, result = uploadhandler(file)
    
    return jsonify({'message': 'File uploaded successfully', 'image_url': url, 'result': result})
@app.route('/mediareceived', methods = ["POST"])
def received():
    delete_files()
    return "Removed All Files"


@socket.on("webcam_frame")
def process(data):
    emit('processed_frame', {'frame': process_cam(data['frame'])})


@app.route('/text', methods = ["POST"])
def text():
    text = request.form['text']

    result = textdetect(text)

    return result

@app.route('/signup', methods = ["POST"])
def signup():
    data = json.loads(request.form['data'])
    print(data)

    if getUserData(data[1]):
        return jsonify({"message": "Account with email already exists"})
    else:
        addUser(data[0], data[1], data[2])

    key = Fernet.generate_key()
    f = Fernet(key)
    token = f.encrypt(bytes(data[1], 'utf-8'))

    return jsonify({'message': "Success", 'key': str(key, 'UTF-8'), 'token': str(token, 'UTF-8')})


@app.route('/login', methods = ["POST"])
def login():
    data = json.loads(request.form['data'])

    user_data = getUserData(data[0])
    if user_data:
        if user_data['password'] == data[1]:

            key = Fernet.generate_key()
            f = Fernet(key)
            token = f.encrypt(bytes(data[0], 'utf-8'))

            return jsonify({'message': "Success", 'key': str(key, 'UTF-8'), 'token': str(token, 'UTF-8')})
        
        else:
            return jsonify({"message": "Wrong password"})

    else:
        return jsonify({"message": "Account does not exist"})

@app.route('/confirmUser', methods = ["POST"])
def confirm():

    try:
        keys = json.loads(request.form['keys'])
        key = bytes(keys[0], 'utf-8')
        token = bytes(keys[1], 'utf-8')

        f=Fernet(key)
        email = str(f.decrypt(token), 'UTF-8')
        data = getUserData(email)
        

        return jsonify({"message": "Success", "name": data['name'], "email": data['email']})
    except:
        return jsonify({"message": "Error"})
    


if __name__ == "__main__":
    socket.run(app, debug = True)