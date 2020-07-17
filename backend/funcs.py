from typing import TypeVar, Generic
import connection
import bcrypt
import query
import time

import mysql.connector

T = TypeVar('T')

def parseGet(a):
    for i in a:
        print(i)

def now():
    return time.strftime('%Y-%m-%d %H:%M:%S')

#Receive as a parameter one dictorionary {user:'admin', password:'abc123'}
#TODO: Maybe this function is unnecessary
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
        pwd = user["password"]
        if bcrypt.checkpw(pwd.encode("utf-8"), i["password"].encode()):
            return i
        else:
            return -1
    
    db.close()


# name=Julian&last_name=Linares&age=22&profesion=web&email=julianlg97@hotmail.com&password=abc123&role_id=2
def saveUser(form):
    values = []
    db = connection.connection()  
    cursor = db.cursor()
    for k, v in form.items():
        if k == "password":
           v = bcrypt.hashpw(v.encode(), bcrypt.gensalt()).decode()
        values.append(v)
        
    querystr = query.insertUser(values, query.queryInsert)
    try:    
        cursor.execute(querystr)
        db.commit()
    except mysql.connector.errors.IntegrityError as err:
        cursor.close()
        db.close()
        return -1
    
    cursor.close()
    db.close()
    print(cursor.lastrowid)
    return "Great, now you are in the system!"


def validateSession(session):
    if not 'user' in session:
        return -1

