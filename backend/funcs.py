from typing import TypeVar
from werkzeug.utils import secure_filename

import connection
import bcrypt
import query
import time
import json
import i18n
import os

INSERT = 0
UPDATE = 1
SEARCH = 2

T = TypeVar('T')
db = connection.connection()

UPLOAD_FOLDER = '../images_stages/'
ALLOWED_EXTENSIONS = {'jpg', 'png', 'gif', 'jpeg'}


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
    db = connection.connection()
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

def updateSeedtimeByLandId(id_land, seedtime, variety_land, sowing_type):
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    sql = "update land set seedtime='"+seedtime+"', variety='"+variety_land+"', sowing_type='"+sowing_type+"' where id="+id_land+""
    cursor.execute(sql)
    db.commit()
    rows = cursor.rowcount
    if rows < 0:
        return -1

    return id_land

    db.close()


def deactivateUser(email):
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    sql = "update user set active=0 where email='"+email+"'"
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
    cursor.execute("select * from user where email='"+user["user"]+"' and active=1", (),)
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
    return "Usuario Agregago al Sistema!"


def updateUser(form, mode):
    email = form["email"]
    old_email = form["old_email"]
    if email != old_email:
        email = old_email
    form.pop("old_email")
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


def userList(offset=0, user=""):
    # q = QueryString
    q = "SELECT "
    if user != "":
        q += "name, last_name, age, email, phone, profesion, role.id "
    else:
        q += "name, last_name, age, email, phone, profesion, role.role "
    q += "FROM user join role on role.id = user.role_id and user.active = 1"
    if user != "":
        q += " where email='"+user+"' "

    q += " order by trim(name)"
    q += " limit 7 offset " + str(offset)
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


# def searchLandByPropertyId(property_id, land_name):
def searchLandByPropertyId(query):
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute(query)
    land = cursor.fetchall()
    if len(land) < 1:
        return -1
    if land[0]["sowing_system"] == "1":
        land[0]["sowing_system"] = "Arroz Secano"
    else:
        land[0]["sowing_system"] = "Arroz de Riego"
    cursor.close()
    return land


def searchPropertyById(property_id, offset):
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute(query.queryProperty(property_id))
    property_dict = cursor.fetchall()
    if len(property_dict) < 1:
        return -1
    property_lands = getLandByPropertyID(property_id, offset)
    property_dict[0]["lands"] = property_lands
    property_dict[0]["sowing_system"] = i18n.sowing_system(property_dict[0]["sowing_system"])
    cursor.close()
    return property_dict


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def addStageProperty(form, files):
    values = []
    headers = []
    custom = []
    property_id = form['property_id']
    land_id = form['land_id']
    stage_id = form['stage_id']
    custom.append(form["stage_id"])
    new_id_product = 0
    for k, v in form.items():
        if k.startswith("total_kg"):
            product_id = k.split("_")
            addProperty2Product(property_id, land_id, product_id[2], stage_id, v)
        elif k.startswith("custom_"):
            if v != "":
                custom.append(v)
            if len(custom) == 6: # 6 Is equal to total of columns values with the minium of the product table
                custom_total = custom.pop()
                new_id_product = add_new_product(custom, property_id, land_id)
                custom = []
                custom.append(form["stage_id"])
                addProperty2Product(property_id, land_id, str(new_id_product), stage_id, custom_total)
        elif not k == "seedtime":
            headers.append(k)
            values.append(v)
    # new_id_product = add_new_product(custom, property_id, land_id)
    ext_name = form["property_id"]+"_"+form["stage_id"]+"_"+form["land_id"]
    path = upload_files_to_property(
                                    files,
                                    ext_name, form["property_id"])
    headers.append("procedure_image")
    values.append(path)
    q = appendinsert("property_procedure", headers, values)
    last_id, err = query.runQuery(q)
    if err != 1:
        print("Error inserting property_procedure [ERR02]: ", err)
        return -1
    return 1


def addProperty2Product(property_id, land_id, product_id, stage_id, v):
    v2 = []
    header = ["property_id", "land_id", "product_id", "stage_id", "total_kg_lt"]
    # TODO: validate length of the split total_kg_[id_product]
    # this is used to identified the product in the database
    v2.append(property_id)
    v2.append(land_id)
    v2.append(product_id)
    v2.append(stage_id)
    v2.append(v)
    q = query.insert("property2product",
                     ", ".join(header), "', '".join(v2))
    cursor, err = query.runQuery(q)
    if err != 1:
        print("Error happend[ERR01]: ", err)
    print(cursor.lastrowid)


def appendinsert(table_name, headers, values):
    q = query.insert(table_name, ",".join(headers), "', '".join(values))
    return q


def add_new_product(values, property_id, land_id):
    headers = ["stage_id", "commercial_name", "ing_active", "provider", "dose_by_ha"]
    q = appendinsert("product", headers, values)
    last_id, err = query.runQuery(q)
    if err != 1:
        print("Error inserting product [ERR03]: ", err)
        return -1
    return last_id.lastrowid


def upload_files_to_property(files, ext_name, property_id):
    img_path = []
    images = files
    folder = UPLOAD_FOLDER+property_id
    if not os.path.exists(folder):
        os.mkdir(folder)

    for image in images:
        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            path = os.path.join(folder, ext_name+"_"+filename)
            img_path.append(path)
            image.save(path)
        # images[image].save(some_destination)
    return ", ".join(img_path)


def getStageByProperty(stage_id, type_planting, property_id, land_name, land_id):
    (validateProducts, obs) = searchProduct2Property(property_id, stage_id, land_id)
    q = query.getPropertyStage(property_id, land_id)
    propertyLand = searchLandByPropertyId(q)
    if propertyLand[0]["property_ca_contact"] == "":
        del propertyLand[0]["property_ca_contact"]
    else:
        del propertyLand[0]["property_df_contact"]
    q = query.searchStageProducts(stage_id, type_planting)
    stageProducts = query.fetchall(q)
    segment_days = ""
    if stage_id != "14":
        segment_days = stageProducts[0][0]["segment_days"]
    return(stageProducts, propertyLand, segment_days, validateProducts, obs)


def searchProduct2Property(property_id, stage_id, land_id):
    q = query.getProperty2Product(property_id, stage_id, land_id)
    rows, err = query.fetchall(q)
    if len(rows) < 1:
        print("empty")
    q = query.getPropertyProcedure(property_id, stage_id, land_id)
    rows_procedure, err = query.fetchall(q)
    if len(rows_procedure) < 1:
        print("empty comments")
        rows_procedure = ""
    return (rows, rows_procedure)


def getLandByPropertyID(property_id, offset):
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    q = "select land_name, land_ha from land where property_id="+property_id
    q += " limit 3 offset " + str(offset)
    cursor.execute(q)
    lands = cursor.fetchall()
    if len(lands) < 1:
        return -1
    cursor.close()
    return lands


def getPropertiesName():
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("select id, name from property order by id")
    property_dict = cursor.fetchall()
    if len(property_dict) < 1:
        return -1
    return property_dict


def getLandByProperty():
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("select property_id, id, land_name from land order by property_id")
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
    q = "select user.id, concat(name, ' ', last_name) as name, role.role from user join role on user.role_id=role.id where not role.id=1 and active=1 order by role.role"
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
            dx += "\t<select id=\""+role+"\" name=\"property_"+i18n.role(role)+"\" class=\"form-control form-control-lg\" required>"
            dx += "\t\t<option disabled selected>"+"</option>\n"
            dx += "\n"
            count = 1
            last_role = role

        dx += "\t\t<option value=\""+str(i["id"])+"\">"+i["name"]+"</option>\n"
    dx += "\t</select>"
    dx += "\n"
    dx += "</div>"
    return dx


def search_property_procedure(property_id, land_id):
    where = "property_id="+property_id
    where += " and land_id="+land_id
    q = query.selectwhere("property_procedure", "distinct stage_id", where)
    rows, err = query.fetchall(q)
    if len(rows) < 1:
        return "-1"
    return rows


def validateSession(session):
    if 'user' not in session:
        return -1

# https://stackoverflow.com/questions/14071038/add-an-element-in-each-dictionary-of-a-list-list-comprehension
