from typing import TypeVar
import connection
import bcrypt
import query
import time
import json

INSERT = 0
UPDATE = 1
SEARCH = 2

T = TypeVar('T')


def parseGet(a):
    for i in a:
        print(i)


def now():
    return time.strftime('%Y-%m-%d %H:%M:%S')


# Receive as a parameter one dictorionary {user:'admin', password:'abc123'}
# TODO: Maybe this function is unnecessary
def parseForm(form, callback, mode):
    T = {}
    for k, v in form.items():
        T[k] = v
    return callback(T, mode)


def searchUser(user, mode):
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


def returnvalues(form, mode):
    values = []
    for k, v in form.items():
        if k == "password":
            v = bcrypt.hashpw(v.encode(), bcrypt.gensalt()).decode()
        if k == "id":
            break
        if mode == UPDATE:
            values.append(k+"=\""+v+"\"")
        else:
            values.append(v)
    return values


# name=Julian&last_name=Linares&age=22&profesion=web&email=julianlg97@hotmail.com&password=abc123&role_id=2
def saveUser(form, mode):
    values = returnvalues(form, mode)
    querystr = query.insertUser(values, query.queryInsert())
    # print(querystr)
    cursor, err = query.runQuery(querystr)
    if err == -1:
        return cursor
    return "Great, now you are in the system!"


def updateUser(form, mode):
    email = form["email"]
    form.pop("email")
    values = returnvalues(form, mode)
    querystr = query.update(values, query.queryUpdate(), email)
    cursor, err = query.runQuery(querystr)
    if err == -1:
        return cursor
    print(cursor.rowcount)
    return "User Updated"


def userList(user=""):
    querystr = "SELECT "
    querystr += "concat(name,\" \",last_name), age, profesion,email,role.role "
    querystr += "FROM user join role on role.id = user.role_id"
    if user != "":
        querystr += " where email='"+user+"'"
    rows, err = query.fetchall(querystr)
    if err == -1:
        print(err)
        return -1
    return rows


def saveProperty(form, table_name):
    lands = form["lands"]
    table_name = form["table_name"]
    form.pop("lands")
    form.pop("table_name")
    form["created_date"] = now()
    property_dict = form
    headers, values = getHeadersAndValues(property_dict)
    statement = query.insert(table_name, ",".join(headers), "','".join(values))
    # print(statement)
    # return
    last_id, err = query.runQuery(statement)
    if last_id == -1:
        print("Error Happend: ", err)
        return -1
    print("Property Last Id:", last_id.lastrowid)
    saveLand(last_id.lastrowid, lands)


def saveLand(last_id, lands):
    decode_lands = json.loads(lands)
    if len(decode_lands) == 0:
        print("Error No added Lands")
        return
    # decode_lands[0]["propert_id"] = str(last_id)
    result = [
        dict(item, **{'property_id': str(last_id)}) for item in decode_lands
    ]

    for land in result:
        headers, values = getHeadersAndValues(land)
        statement = query.insert("land", ",".join(headers), "','".join(values))
        print(statement)
        last_id, err = query.runQuery(statement)
        if last_id == -1:
            print("Land Error Happend: ", err)
            return -1


def getHeadersAndValues(struct):
    headers = []
    values = []
    for k, v in struct.items():
        headers.append(k)
        values.append(v)
    return headers, values


def validateSession(session):
    if 'user' not in session:
        return -1

# https://stackoverflow.com/questions/14071038/add-an-element-in-each-dictionary-of-a-list-list-comprehension
