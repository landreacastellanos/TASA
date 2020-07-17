import connection
import funcs
import mysql

INSERT = 0
UPDATE = 1
SEARCH = 2


def insertUser(values, action):
    s = "','"
    values.append(funcs.now())
    dx = s.join(values)
    # query = "INSERT INTO user (
    # name, last_name, age, profesion, email, password, role_id, created_date
    # ) values('"
    query = action
    query += dx
    query += "')"
    return query


def update(values, action, email):
    s = ","
    dx = s.join(values)
    return action + dx + " where email='"+email+"'"


# Attach Columns of any Table,
# and pass as params table headers, and table name,
# the for all those crud function
def queryInsert():
    return ''' INSERT INTO user
(name, last_name, age, profesion, email,password, role_id, created_date)
 values(\' '''


def queryUpdate():
    return "UPDATE user set "


def runQuery(querystr):
    db = connection.connection()
    cursor = db.cursor()
    try:
        cursor.execute(querystr)
        db.commit()
    except mysql.connector.errors.IntegrityError as err:
        cursor.close()
        db.close()
        return err.msg, -1

    db.close()
    return cursor, 1


def fetchall(querystr):
    db = connection.connection()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute(querystr)
        data = cursor.fetchall()
        # db.commit()
    except mysql.connector.errors.IntegrityError as err:
        cursor.close()
        db.close()
        return err.msg, -1

    db.close()
    return data, 1
