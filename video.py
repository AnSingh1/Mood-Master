import base64

import numpy as np
from emotion import detect
import cv2

def webcam_feed():
    global stop

    stop = False

    video = cv2.VideoCapture(0)
    while True:
        ret, frame = video.read()
        
        if not ret or stop:
            print("Stopped")
            break

        frame = detect(frame)
        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    video.release()

def process_cam(data):

    decoded_data = base64.b64decode(data.split(',')[1])
    nparr = np.frombuffer(decoded_data, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)


    processed = detect(frame)

    
    _, encoded_processed_frame = cv2.imencode('.jpg', processed)
    processed_image_data = base64.b64encode(encoded_processed_frame).decode('utf-8')

    return processed_image_data