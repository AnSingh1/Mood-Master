import cv2
import numpy as np
from keras.models import model_from_json


emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}

print("Loading model")

file = open('emotion/model/model.json', 'r')
model = file.read()
file.close()
model = model_from_json(model)

print("Loading weights of model")

model.load_weights("emotion/model/model.h5")

print("Loaded")


def detect(path):
    try:
        img = cv2.imread(path)
    except:
        img = path
    
    face_detection = cv2.CascadeClassifier('emotion/face/algorithm.xml')
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)


    results = face_detection.detectMultiScale(gray, scaleFactor = 1.3, minNeighbors = 5)
    
    for result in results:
        point1x = result[0]
        point1y = result[1]

        point2x = point1x+result[2]
        point2y = point1y+result[3]

        # I want to make it more cool

        line_color = (252, 217, 37)
        offset = 35

        img_clone = img.copy()

        # Top left corner
        cv2.line(img_clone, (point1x-offset, point1y-offset), (point1x + int((point2x - point1x) / 4), point1y-offset), line_color, 10)
        cv2.line(img_clone, (point1x-offset, point1y-offset), (point1x-offset, point1y + int((point2y - point1y) / 4)), line_color, 10)

        # Bottom left corner
        cv2.line(img_clone, (point1x-offset, point2y+offset), (point1x-offset, point2y - int((point2y - point1y) / 4)), line_color, 10)
        cv2.line(img_clone, (point1x-offset, point2y+offset), (point1x + int((point2x - point1x) / 4), point2y+offset), line_color, 10)

        # Top right corner
        cv2.line(img_clone, (point2x+offset, point1y-offset), (point2x - int((point2x - point1x) / 4), point1y-offset), line_color, 10)
        cv2.line(img_clone, (point2x+offset, point1y-offset), (point2x+offset, point1y + int((point2y - point1y) / 4)), line_color, 10)

        # Bottom right corner
        cv2.line(img_clone,  (point2x+offset, point2y+offset), (point2x - int((point2x - point1x) / 4), point2y+offset), line_color, 10)
        cv2.line(img_clone,  (point2x+offset, point2y+offset), (point2x+offset, point2y - int((point2y - point1y) / 4)), line_color, 10)
        
        #cv2.rectangle(img, (point1x-50, point1y-50), (point2x+50, point2y+50), (0, 255, 0), 4)

        cropped = gray[point1y:point2y, point1x:point2x]

        cropped = cv2.resize(cropped, (48, 48))
        cropped = np.expand_dims(cropped, axis=0)
        cropped = np.expand_dims(cropped, axis=-1)


        emotion = model.predict(cropped)
        index = int(np.argmax(emotion))
        
        cv2.putText(img_clone, emotion_dict[index], (point1x, point1y+5), cv2.FONT_HERSHEY_SIMPLEX, 1, (87, 255, 126), 2)

        alpha = 0.7

        cv2.addWeighted(img_clone, alpha, img, 1-alpha, 0, img)


    return img

def detect_img(path):
    img = detect(path)

    width = 1000
    height = 1000
    h, w = img.shape[:2]
    aspect = w/h

    # if w>h:
    #     img=cv2.resize(img, (width, int(width/aspect)))
    # else:
    #     img=cv2.resize(img, (int(height*aspect), height))
    
    return img

def video():
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        img=detect(frame)
        cv2.imshow("Video", img)

        if cv2.waitKey(1) & 0xFF==ord('q'):
            cap.release()
            cv2.destroyAllWindows()
            break
