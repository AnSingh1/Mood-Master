# Mood Master ![favicon_small](https://github.com/AnSingh1/Mood-Master/assets/130875753/d8150d77-bfef-4034-ac51-25080b67c539)


## Description




Mood Master is a website that helps people with bipolar disorder learn more about their actions and emotions. It uses a video software to capture and analyze the facial expressions of the user and provide personalized feedback and suggestions. It also uses a message analysis tool to detect the tone and sentiment of the user’s texts and offer guidance and support.

My motivation for creating Mood Master was to help people with bipolar disorder learn more about their actions and emotions, and to use the power of technology to make this tool more accessible and engaging for the users. 

I learned a lot from building this project, such as how to use facial detection and emotion classification algorithms, how to use message analysis tools, how to design a user-friendly and interactive interface, how to optimize the performance and efficiency of the website, and how to publish the website on the internet.

## Table of Contents

- [Setup](#setup)
- [Features](#features)
- [Screenshots](#screenshots)
- [Frameworks](#frameworks)
- [License](#license)


## Setup

### Optimized for 1920 x 1080 resolution. No guarantee for other resolutions.
To run this project, follow these steps, must have python (3.11 preferred) and pip installed:

1. Use `git clone https://github.com/AnSingh1/Mood-Master.git` to clone the repo to your local machine
2. Run `pip install -r requirements.txt` to install the dependencies
3. Enter in the following fields in the .env file: 
```
API_KEY: Enter your OpenAI api key
PATH_TO_TEXT: Replace the absolutePath with the absolute path to the Mood Master folder, make sure it is followed by /text/model
FIREBASE_URL: Enter your firebase url
FIREBASE_API_KEY: Enter your firebase api key, should be in a json format.
```
4. Run `python app.py` to start the server
5. Open `http://localhost:5000` in your browser


## Features

- Mood View: Mood View is a feature that uses a video software to capture and analyze the facial expressions of the user in real time or with a video/image upload. It uses a facial detection algorithm to detect the user’s face and a facial expression classification algorithm to classify the user’s facial expression.

<video src='https://github.com/AnSingh1/Mood-Master/assets/130875753/76bdeb38-8453-4a06-ba3e-66b66590000b' width=180/></video>

Classified video through Mood View

- MoodBot: MoodBot is an interactive chatbot that can provide personalized feedback and suggestions to the user. It uses the results from Mood View to help the user learn more about their actions and emotions. Powered by OpenAI.
  
![MoodBot](https://github.com/AnSingh1/Mood-Master/assets/130875753/080f7078-198a-4dc3-8380-f1927fb640f1)

- Mood Text: Mood Text is a feature that uses a message analysis tool to detect the tone and sentiment of the user’s texts and offer guidance and support. Powered by OpenAI.

![Mood Text](https://github.com/AnSingh1/Mood-Master/assets/130875753/b81e04e7-2b6c-4df1-9259-cde0ff950b59)

- Login system: The login system allows the user to create an account and login to their account. It uses Fernet encryption and can withstand brute force attacks. Powered by Firebase.
  
![Signup Page](https://github.com/AnSingh1/Mood-Master/assets/130875753/d3fedf0a-94a7-4100-99fb-9c437264b860)
![logIn](https://github.com/AnSingh1/Mood-Master/assets/130875753/228142b6-3f02-468a-823b-5ff1866fa2d2)

## Screenshots

!![Main Page](https://github.com/AnSingh1/Mood-Master/assets/130875753/17e869d9-2ff5-451a-8dbb-73165164ab62)
Main Page

![App Page](https://github.com/AnSingh1/Mood-Master/assets/130875753/d1ec2076-408f-41f9-a53a-4d224b8c9772)
App Page

![Mood View](https://github.com/AnSingh1/Mood-Master/assets/130875753/b52dd0f2-503f-4c82-a5c4-e0bf46bc78fc)
Mood View Demo

![Mood Text Page](https://github.com/AnSingh1/Mood-Master/assets/130875753/072c8c5d-02da-4fe9-bdb6-03a29e3a39c6)
Mood Text

![About Page](https://github.com/AnSingh1/Mood-Master/assets/130875753/ed5d9724-045b-4a97-a439-d3b7392b3cf0)
About Page



## Frameworks

[Python](https://www.python.org/): Backend Language

[Flask](https://flask.palletsprojects.com/en/1.1.x/): Backend Microframework

[Firebase](https://firebase.google.com/): Login System

[Javascript](https://www.javascript.com/): Frontend Language

[Keras](https://keras.io/): Facial Detection and Emotion Classification

[OpenCV](https://opencv.org/): Image Manipulation

[OpenAI](https://openai.com/): Chatbot functionality

[NumPy](https://numpy.org/): Encoding handling

[Tensorflow](https://www.tensorflow.org/): Facial Detection and Emotion Classification

[jQuery](https://jquery.com/): Frontend Element Manipulation

[Jinja](https://jinja.palletsprojects.com/en/2.11.x/): Frontend to backend calls

[Typekit](https://typekit.com/): Custom Fonts

[HTML](https://html.com/): Frontend Structure

[CSS](https://www.w3.org/Style/CSS/Overview.en.html): Frontend Styling

## License

The Mood Master website is licensed under the [MIT License](https://mit-license.org/). This means that you can use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the website, as long as you include the original license notice and a list of changes in any modified copies.

