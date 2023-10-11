import firebase_admin
from firebase_admin import db, credentials
import dotenv, json, os

dotenv.load_dotenv()

cred = credentials.Certificate(json.loads(os.environ.get("FIREBASE_KEY")))
firebase_admin.initialize_app(cred, {'databaseURL': os.environ.get("FIREBASE_URL")})

def addUser(name, email, password):
    ref = db.reference('users')  # Corrected the database reference here
    users_ref = ref.child(email.replace('.', ','))  # Replace '.' with ',' to avoid database restrictions
    users_ref.set({
        "name": name,
        "email": email,
        "password": password,
    })

def getUserData(email):
    ref = db.reference('users')
    users_ref = ref.child(email.replace('.', ','))  # Replace '.' with ','
    user_data = users_ref.get()
    if user_data:
        return user_data
    else:
        return False


def getNumUsers():
    return len(db.reference("users").get())

if __name__ == "__main__":
    print(getNumUsers())
