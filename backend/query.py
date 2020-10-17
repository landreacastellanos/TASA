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
    (name, last_name, age, profesion, \
            phone,email,role_id, password, created_date, active)
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


def update_data(table_name, headers, value,condition):
    body = ''
    for item in range(len(headers)):
        column  = headers[item]
        val  = value[item]
        body += column+'="'+val+'",'
    body = body[:-1]
    query = format("UPDATE %s \
SET %s where %s " % (table_name, body ,condition))

    return query


def select(table_name, headers):
    return format("select %s from %s" % (headers, table_name))


def selectwhere(table_name, headers, where):
    return format("select %s from %s where %s" % (headers, table_name, where))


def queryProperty(property_id):
    return format("select \
        property.id, property.name, property.business_name, \
        property.phone, property.address, property.web_site, \
        property.total_ha_property, property.sowing_system, \
        concat(ca.name, ' ', ca.last_name) as property_ca, \
        concat(df.name, ' ', df.last_name)as property_df, \
        concat(ec.name, ' ', ec.last_name) as property_ec, \
        concat(ep.name, ' ', ep.last_name) as property_ep, \
        concat(idc.name, ' ', idc.last_name) as property_idc, \
        concat(rdc.name, ' ', rdc.last_name) as property_rdc, \
        concat(sa.name, ' ', sa.last_name) as property_sa, \
        concat(v.name, ' ', v.last_name) as property_v \
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


def searchStageProducts(stage_id, type_planting):
    return format("select \
            stage.stage_name, stage.after_img as after, stage.before_img, \
            product.id, \
            commercial_name, ing_active, provider, dose_by_ha, \
            stage.segment_days \
            from product, stage \
            where stage_id='%s' \
            and type_planting_id='%s' and \
            stage_id=stage.id" % (stage_id, type_planting))


def getPropertyStage(property_id, land_id):
    return "select property_id, \
            property.name as pro_name, \
            concat(ca.name, ' ', ca.last_name) as property_ca_contact,\
            concat(df.name, ' ', df.last_name) as property_df_contact,\
            sowing_system, land.sowing_type, land.variety, \
            land.seedtime, total_ha_property,  \
            property.address as address_land, \
            land.land_name, land.land_ha, land.id as land_id, land.sowing_type as sowing_type \
            from land \
            join property \
                on property.id=land.property_id \
            join user as ca \
                on ca.id=property_ca  \
            join user as df  \
                on df.id=property_df  \
            where property.id='"+property_id+"' and land.id='"+land_id+"'"


def getPropertyLandCalendar(property_id, land_id):
    return "select property_id, \
            name, business_name, phone, \
            address, variety, \
            total_ha_property, sowing_system, \
            land.id as land_id, land.land_name, land.land_ha \
            from land join property on property.id=land.property_id \
            where property.id='"+property_id+"' and land.id='"+land_id+"'"


def getProperty2Product(property_id, stage_id, land_id):
    return "select product_id, product.commercial_name, ing_active, \
            provider, dose_by_ha, total_kg_lt from property2product \
            join product on \
            product.id=property2product.product_id \
            where property_id="+property_id+" and \
            property2product.stage_id ="+stage_id+" and \
            land_id="+land_id


def getPropertyProcedure(property_id, stage_id, land_id):
    return "select observation from property_procedure where \
            property_id="+property_id+" and stage_id="+stage_id+" and \
            land_id="+land_id


def getPropertiesList(offset=0):
    return "select id, name, business_name, phone, sowing_system \
            from property order by id \
            limit 7 offset "+str(offset)
