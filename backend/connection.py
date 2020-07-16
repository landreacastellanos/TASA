import mysql.connector

def connection():
    db = mysql.connector.connect(
        host="localhost",
        user="admin",
        password="Admin123.",
        database="tasa"
    )
    return db




#usefull links
#https://stackoverflow.com/questions/7268178/python-mysql-and-select-output-to-dictionary-with-column-names-for-keys
