import mysql.connector
import os


def connection():
    db = mysql.connector.connect(
        host=os.getenv("DB_HOST",'localhost'),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )
    return db




# usefull links
# https://stackoverflow.com/questions/7268178/python-mysql-and-select-output-to-dictionary-with-column-names-for-keys
