# encoding: utf-8
from project.resources.utils.data_utils import DataUtils
from project.resources.utils.generals_utils import GeneralsUtils
from project.resources.utils.registry_utils import RegistryUtils


class ConfigurationManger():

    @staticmethod
    def get_connection_string(connection_string_name):
        #T
        DATABASE_SYSTEMS = ('postgres',)
        #T
        DRIVERS = ('psycopg2',)

        connection_string = DataUtils.get_global_data(connection_string_name)

        if connection_string == None:
            connections_strings = DataUtils.\
                get_configuration_setting("CONNECTIONS_STRINGS")

            if not GeneralsUtils.\
                validate_attribute(connection_string_name, connections_strings):
                raise Exception

        connection_string = connections_strings[connection_string_name]

        connection_string_parts = connection_string.split(",")

        if len(connection_string_parts) != 3:
            raise Exception

        database_system = connection_string_parts[0]

        driver = connection_string_parts[1]

        params = connection_string_parts[2]

        if database_system not in DATABASE_SYSTEMS:
            raise Exception

        if driver not in DRIVERS:
            raise Exception

        return "{}+{}://{}".format(database_system, driver, params)

    @staticmethod
    def get_entity_definitions(entity_name):
        entity_definition = DataUtils.get_global_data("entity_definition_" + entity_name)

        if not entity_definition == None:
            return entity_definition

        entities_definitions = DataUtils.get_global_data("entities_definitions")

        if entities_definitions == None:
            entities_definitions_path = DataUtils.get_configuration_setting(
                "ENTITIES_DEFINITIONS_PATH")

            entities_definitions = GeneralsUtils.read_file(entities_definitions_path)

            DataUtils.set_global_data("entities_definitions", entities_definitions)

        if entity_name not in entities_definitions:
            raise Exception

        return entities_definitions[entity_name]
