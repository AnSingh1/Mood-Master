import os
import dotenv
dotenv.load_dotenv()
os.environ["TRANSFORMERS_CACHE"] = os.environ.get("PATH_TO_TEXT")


import matplotlib.pyplot as plt
from transformers import pipeline

# Use the pipeline with the desired model
classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=None)


def textdetect(inp):

    result = classifier(inp)[0]

    labels = ['joy', 'surprise', 'neutral', 'sadness', 'fear', 'anger', 'disgust']
    scores = [0, 0, 0, 0, 0, 0, 0]

    for prediction in result:
        #print("Label: " + prediction['label'])
        #print("Score: " + str(prediction['score']) + "\n")

        ind = labels.index(prediction['label'])
        scores[ind] = prediction['score']*100

    return scores
