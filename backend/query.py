import connection
import funcs


def insertUser(values, action):
    s = "','"
    values.append(funcs.now())
    dx = s.join(values)
    #query = "INSERT INTO user (name, last_name, age, profesion, email, password, role_id, created_date) values('"
    query = action
    query += dx
    query += "')"
    return query

def queryInsert():
    return "INSERT INTO user (name, last_name, age, profesion, email, password, role_id, created_date) values('"

