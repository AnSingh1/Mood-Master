from threading import Thread
import cv2
import numpy as np
import os
import time
from emotion import detect
import av



img_extensions = ['.jpeg', '.jpg', '.jpe', '.bmp', '.dib', '.jp2', '.png', '.webp', '.avif', '.pbm', '.pgm', '.ppm', '.pxm', '.pnm', 'pfm', '.sr', '.ras', '.tiff', '.tif', '.exr', '.hdr', '.pic']
vid_extensions = ['.mp4', '.avi', '.mkw', '.mov', '.wvm', '.flv', '.mpeg', '.mpg', '.3gp', '.webm']

def uploadhandler(file):
    name = file.filename
    size = len(file.read())
    file.seek(0)

    _, extension = os.path.splitext(name)
    extension = extension.lower()

    img_url = f'static/userupload/{size},{name}'

    if extension in img_extensions:
        #is an image
        img_bytes = file.read()
        nparr = np.frombuffer(img_bytes, np.uint8)
        img_cv = cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)

        final = detect(img_cv)

        img_url = f'static/userupload/{size},{name}'
        cv2.imwrite(img_url, final)

        Thread(target=del_item, args=(img_url,)).start()

        return img_url, "P"


    elif extension in vid_extensions:
        #is video
        temp_path = f'static/userupload/{name}'
        file.save(temp_path)

        img_url = f'static/userupload/{size},{_}.mp4'

        cap = cv2.VideoCapture(temp_path)

        container = av.open(img_url, mode="w")

        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)

        if width % 2 == 1:
            width +=1
        if height % 2 == 1:
            height +=1

        if fps>900:
            fps = 30
        fps = int(round(fps))
        print(f'{width}x{height}:{fps}')

        stream = container.add_stream("libx264", rate=fps)
        stream.width = width
        stream.height = height
        stream.pix_fmt = "yuv420p"

        while True:
            ret, frame = cap.read()

            if not ret:
                break
            img = detect(frame)
            img_av = av.VideoFrame.from_ndarray(img, format='bgr24')

            for packet in stream.encode(img_av):
                container.mux(packet)
        for packet in stream.encode():
            container.mux(packet)
        container.close()
        
        os.remove(temp_path)
        Thread(target=del_item, args=(img_url,)).start()

        return img_url, "V"
    else:
        return f"Bad file: {name}", "E"
    

def del_item(item):
    print(item)
    time.sleep(30)
    os.remove(item)
    return "done"
def delete_files():
    folder_path = 'static/userupload'

    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)
        os.remove(file_path)