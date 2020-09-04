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


def queryProperty(property_id):
    return format("select \
        property.id, property.name, property.business_name, \
        property.phone, property.address, property.web_site, \
        property.total_ha_property, property.sowing_system, \
        ca.name as property_ca, df.name as property_df, \
        ec.name as property_ec, ep.name as property_ep, \
        idc.name as property_idc, rdc.name as property_rdc, \
        sa.name as property_sa, v.name as property_v \
        from property  \
            join user as ca \
                on ca.id=property_ca  \
            join user as df  \
                on df.id=property_df  \
            join user as ec \
                on ec.id=property_ec  \
            join user as ep \
                on ep.id=property_ep  \
            join user as idc \
                on idc.id=property_idc \
            join user as rdc \
                on rdc.id=property_rdc \
            join user as sa \
                on sa.id=property_sa \
            join user as v \
                on v.id=property_v \
            where property.id=%s" % property_id)
