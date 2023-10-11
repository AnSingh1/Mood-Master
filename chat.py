import openai
import random
import json

import dotenv, os

dotenv.load_dotenv()

my_API = os.environ.get('OPENAI_API_KEY')
#change model to what you want
model = 'gpt-3.5-turbo'

noSaveMessages = ["API Error, please try again", "Server failure, please try again"]
openai.api_key = my_API

#adding the initial stuff
file = open("bot/instruction.txt", 'r')
instruction = file.read()
file.close()

file = open("bot/initial.txt", 'r')
initial = file.read()
file.close()

def chatbot(messages):
    global my_API

    old_messages = [{"role": "system", "content": instruction}, {"role": "assistant", "content": initial}]
    for count, content in enumerate(messages):
        if count % 2 == 1:
            old_messages.append({"role": "assistant", "content": content})
        else:
            old_messages.append({"role": "user", "content": content})

    #accessing the initial responses
    if len(old_messages) == 3:
        with open('bot/storedMessages.json', 'r') as stored:
            prev_responses = stored.read()

        prev_responses = json.loads(prev_responses)

        try:
            return prev_responses[old_messages[len(old_messages)-1]["content"].lower()].replace('"', "'")
        except:
            pass



    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=old_messages,
        )
    except Exception as e:
        print(str(e))
        if "Bad context detected!" in str(e):

            response = {"choices": [{"message": {"content": "Please keep the conversation appropriate"}}]}
                
        elif "Failed to establish a new connection:" in str(e):
            response = {"choices": [{"message": {"content": "Server failure, please try again"}}]}
        else:
            response = {"choices": [{"message": {"content": "API Error, please try again"}}]}


    bot = response["choices"][0]["message"]["content"]
    
    #caching the results to storedMessages.json if it is the first message
    if len(old_messages) == 3 and bot not in noSaveMessages:
        with open('bot/storedMessages.json', 'r+') as stored:
            prev_responses = json.loads(stored.read())
            prev_responses[old_messages[len(old_messages)-1]["content"].lower()] = bot

            stored.seek(0)
            stored.truncate()
            
            json.dump(prev_responses, stored, indent=None, separators=(',\n', ': '))
    return bot