from typing import TypeVar
import connection
import bcrypt
import query
import time
import json
import i18n

INSERT = 0
UPDATE = 1
SEARCH = 2

T = TypeVar('T')
db = connection.connection()


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


def searchUserByEmail(user, mode):
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from user where email='"+user["user"]+"'", (),)
    rows = cursor.fetchall()
    if len(rows) < 1:
        return -1
    return user
    db.close()


def updateUserPasswordByEmail(email, new_password):
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    pw_hash = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
    sql = "update user set password='"+pw_hash+"' where email='"+email+"'"
    cursor.execute(sql)
    db.commit()
    rows = cursor.rowcount
    if rows < 1:
        return -1

    return email

    db.close()


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
    form.pop("confirm_password")
    values = returnvalues(form, mode)
    querystr = query.insertUser(values, query.queryInsert())
    cursor, err = query.runQuery(querystr)
    if err != 1:
        print(cursor)
        return -1
    return "Great, now you are in the system!"


def updateUser(form, mode):
    email = form["email"]
    form.pop("email")
    if form["password"] == "":
        form.pop("password")
    values = returnvalues(form, mode)
    querystr = query.update(values, query.queryUpdate(), email)
    cursor, err = query.runQuery(querystr)
    if err != 1:
        print(err)
        return cursor
    # print(cursor.rowcount)
    return "User Updated"


def userList(user=""):
    # q = QueryString
    q = "SELECT "
    if user != "":
        q += "name, last_name, age, email, phone, profesion, role.id "
    else:
        q += "name, last_name, age, email, phone, profesion, role.role "
    q += "FROM user join role on role.id = user.role_id"
    if user != "":
        q += " where email='"+user+"'"
    rows, err = query.fetchall(q)
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
    response = saveLand(last_id.lastrowid, lands)
    if response == -1:
        print("Error Saving Lands")
        return -1
    return 1


def saveLand(last_id, lands):
    decode_lands = json.loads(lands)
    if len(decode_lands) == 0:
        print("Error No added Lands")
        return -1
    # decode_lands[0]["propert_id"] = str(last_id)
    result = [
        dict(item, **{'property_id': str(last_id)}) for item in decode_lands
    ]

    for land in result:
        headers, values = getHeadersAndValues(land)
        statement = query.insert("land", ",".join(headers), "','".join(values))
        last_id, err = query.runQuery(statement)
        if last_id == -1:
            print("Land Error Happend: ", err)
            return -1


def searchLandByPropertyId(property_id, land_name):
    cursor = db.cursor(dictionary=True)
    cursor.execute("select property_id, \
            property_name, business_name, phone, property_address, \
            total_ha_property, sowing_system, land.land_name, land.land_ha \
            from land join property on property.id=land.property_id \
            where property.id='"+property_id+"' and land_name='"+land_name+"'")

    land = cursor.fetchall()
    if len(land) < 1:
        return -1
    if land[0]["sowing_system"] == "1":
        land[0]["sowing_system"] = "Arroz Secano"
    else:
        land[0]["sowing_system"] = "Arroz de Riego"
    return land


def searchPropertyById(property_id):
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from property where id="+property_id)
    property_dict = cursor.fetchall()
    if len(property_dict) < 1:
        return -1
    return property_dict


def getPropertiesName():
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("select id, property_name from property order by id")
    property_dict = cursor.fetchall()
    if len(property_dict) < 1:
        return -1
    return property_dict


def getLandByProperty():
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("select property_id, land_name from land order by property_id")
    land_dict = cursor.fetchall()
    if len(land_dict) < 1:
        return -1
    return land_dict


def getHeadersAndValues(struct):
    headers = []
    values = []
    for k, v in struct.items():
        if k.find("name_land_1") == 0:
            continue
        elif k.find("hec_land_1") == 0:
            continue
        headers.append(k)
        values.append(v)
    return headers, values


def listOfUsers():
    q = "select user.id, name, role.role from user join role on user.role_id=role.id where not role.id=1 order by role.role"
    user_dict, err = query.fetchall(q)
    if err == -1:
        print(err)
        return -1
    last_role = ""
    dx = ""
    count = 0
    for i in user_dict:
        role = i["role"]
        if last_role != role:
            dx += "\n"
            if count == 1:
                dx += "\t</select>"
                dx += "\n"
                dx += "</div>"
                dx += "\n"
            dx += "<div class=\"form-group col-md-12\">"
            dx += "\n"
            dx += "\t<label for=\""+role+"\">"+role+"</label>"
            dx += "\n"
            dx += "\t<select id=\""+role+"\" name=\"property_"+i18n.role(role)+"\" class=\"form-control form-control-lg\">"
            dx += "\n"
            count = 1
            last_role = role

        dx += "\t\t<option value=\""+str(i["id"])+"\">"+i["name"]+"</option>\n"
    dx += "\t</select>"
    dx += "\n"
    dx += "</div>"
    return dx


def validateSession(session):
    if 'user' not in session:
        return -1

# https://stackoverflow.com/questions/14071038/add-an-element-in-each-dictionary-of-a-list-list-comprehension
