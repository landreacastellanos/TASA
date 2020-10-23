import json

from sqlalchemy import MetaData, Table, Column

from project.resources.utils.data_utils import DataUtils
from project.resources.utils.sqlalchemy_utils import SqlalchemyUtils


class Repository():

    def __init__(self, context, entity_name = None):
        self.__context = context

        self.__entity_name = entity_name

        self.__sqlalchemy_utils = SqlalchemyUtils()

    def query(self, operation, entity_name = None, options = None):
        context = self.__context

        have_id = False

        if entity_name == None:
            entity_name = self.__entity_name

        if not isinstance(entity_name, str):
            raise Exception

        if context is None:
            raise Exception

        if not isinstance(options, dict):
            options = {}

        if "id" in options:
            have_id = True

        session = context.session()

        meta_data = MetaData(session, schema="MS")

        table_sqlalchemy = self.__sqlalchemy_utils.configure_table(
            entity_name, meta_data)

        if operation == "update" or\
            operation == "select" and have_id:
            primary_key_columns = getattr(
                table_sqlalchemy.primary_key, "columns")

            if len(primary_key_columns) != 1:
                # La actualización o select común requiere una definición de llave primaria
                raise Exception

            primary_key_column = next(iter(primary_key_columns))

        if operation == "select":
            if "order_by" in options or\
               "paginate" in options or\
               "filter" in options:
                statement =  self.__sqlalchemy_utils.generate_statement(table_sqlalchemy, options)
            else:
                statement = table_sqlalchemy.select()

        elif operation == "insert" or\
             operation == "update":
            if "values" not in options:
                raise Exception

            if operation == "update":
                statement = table_sqlalchemy.update(None).\
                    values(options["values"])

            else:
                statement = table_sqlalchemy.insert(None).\
                    values(options["values"])

        if have_id:
            statement = statement.where(primary_key_column == options["id"])

        with session as connection:
            query_result = connection.execute(statement)

        return query_result

    def select_all(self, entity_name = None):
        query_result = self.query(
            "select",
            entity_name
        )

        result = []
        for row in query_result:
            result.append(dict(row))

        return result

    def select_one(self, id, entity_name = None):
        query_result = self.query(
            "select",
            entity_name,
            {
                "id": id
            }
        )

        result = []
        for row in query_result:
            result.append(dict(row))

        return result

    def select(self, entity_name = None, options = None):
        #pginacion, sort, filter
        query_result = self.query(
            "select",
            entity_name,
            options
        )

        result = []
        for row in query_result:
            result.append(dict(row))

        return result

    def insert(self, values, entity_name=None):
        query_result = self.query(
            "insert",
            entity_name,
            {
                "values": values
            }
        )

        if query_result.rowcount == 0:
            raise Exception

        return True

    def update(self, id, values, entity_name = None):
        query_result = self.query(
            "update",
            entity_name,
            {
                "id": id,
                "values": values
            }
        )

        if query_result.rowcount != 1:
            raise Exception

        return True
