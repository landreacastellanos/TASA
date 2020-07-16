from typing import TypeVar, Generic
import connection

T = TypeVar('T')

def parseGet(a):
    for i in a:
        print(i)

#Receive as a parameter one dictorionary {user:'admin', password:'abc123'}
def parseForm(form, callback):
    T = {}
    for k, v in form.items():
        T[k] = v
    return callback(T)

def searchUser(user):
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from user where email='"+user["user"]+"'", (),)
    rows = cursor.fetchall()
    if len(rows) < 1:
        return -1
    
    for i in rows:
        if user["password"] == i["password"]:
            return i
        else:
            return -1
    
    db.close()

