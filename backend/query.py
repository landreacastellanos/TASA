import connection
import funcs
import mysql

INSERT = 0
UPDATE = 1
SEARCH = 2


def insertUser(values, action):
    s = "','"
    values.append(funcs.now())
    values.append("1")
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
(name, last_name, age, profesion, phone,email,role_id, password, created_date, active)
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
        return -1, err.msg
    except mysql.connector.errors.DatabaseError as dbError:
        cursor.close()
        db.close()
        return -1, dbError.msg
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


def insert(table_name, headers, value):
    return format("insert into %s (%s) \
values('%s')" % (table_name, headers, value))


def select(table_name, headers):
    return format("select %s from %s" % (headers, table_name))


def selectwhere(table_name, headers, where):
    return format("select %s from %s where %s" % (headers, table_name, where))
