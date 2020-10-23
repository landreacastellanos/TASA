from sqlalchemy import MetaData, Table, Column, Float, Boolean, Integer, String

from project.configuration_manager import ConfigurationManger
from project.resources.utils.generals_utils import GeneralsUtils


class SqlalchemyUtils():

    #T
    schema_types_by_sqlalchemy_functions = {
        "boolean": Boolean,
        "integer": Integer,
        "number": Float,
        "string": String
    }

    def configure_table(self, entity_name, meta_data):
        fail = False

        if not GeneralsUtils.validate_string(entity_name) or\
            not isinstance(meta_data, MetaData):
            raise Exception

        table_definitions = ConfigurationManger.get_entity_definitions(entity_name)

        if "tableName" not in table_definitions:
            raise Exception

        table_sqlalchemy = Table(table_definitions["tableName"], meta_data)
        
        if not GeneralsUtils.validate_attribute("properties", table_definitions, dict):
            raise Exception

        if not GeneralsUtils.validate_attribute("primary_key", table_definitions):
            table_definitions["primary_key"] = []

        if not GeneralsUtils.validate_attribute("uniques", table_definitions):
            table_definitions["uniques"] = []

        for item_key, item_value  in table_definitions["properties"].items():
            if "type" not in item_value or\
                not GeneralsUtils.validate_attribute(item_value["type"],\
                self.schema_types_by_sqlalchemy_functions):
                
                fail = True

                break

            if  item_key in table_definitions["primary_key"]:
                item_value["primary_key"] = True
            else:
                item_value["primary_key"] = False

            if  item_key in table_definitions["uniques"]:
                item_value["unique"] = True
            else:
                item_value["unique"] = False

            column_sqlalchemy = Column(
                item_key,
                self.schema_types_by_sqlalchemy_functions[item_value["type"]],
                primary_key = item_value["primary_key"],
                unique = item_value["unique"])

            table_sqlalchemy.append_column(column_sqlalchemy)

        if fail:
            raise Exception

        return table_sqlalchemy

    def generate_statement(self, table_sqlalchemy, options):
        if not isinstance(table_sqlalchemy, Table) or\
           not isinstance(options, dict):
            raise Exception 

        statement = table_sqlalchemy.select()

        if "filter" in options:
            statement = statement

        if "order_by" in options:
            fail = False

            validate_result = GeneralsUtils.validate_data(
                options["order_by"],
                {
                    "name": "order_by",
                    "columns": [
                        {
                            "name": "column_nmae",
                            "type": "string",
                            "attributes": {
                                "required": True
                            }
                        },
                        {
                            "name": "desc",
                            "type": "boolean",
                            "attributes": {
                                "required": False
                            }
                        }
                    ]
                }
            )
            if validate_result:
                for order_by_item in options["order_by"]:                    
                    try:
                        column_sqlalchemy = getattr(table_sqlalchemy.columns, order_by_item["column_name"])

                        if order_by_item["desc"] == True:
                            statement = statement.order_by(column_sqlalchemy.desc())
                        else:
                            statement = statement.order_by(column_sqlalchemy.asc())

                    except Exception as exception:
                        fail = True
                        break

                if fail:
                    raise exception

        if  "paginate" in options:
            fail = False

            options_paginate = options["paginate"]

            if not GeneralsUtils.\
                   validate_attribute("page", options_paginate, int) or\
               not GeneralsUtils.\
                   validate_attribute("per_page", options_paginate, int) or\
               options["paginate"]["page"] < 1 or\
               options["paginate"]["per_page"] < 1:
                raise Exception

            statement = statement.limit(
                options["paginate"]["per_page"]
            ).\
            offset(options["paginate"]["per_page"] * (options["paginate"]["page"] - 1))

        return statement
