from project.infrastructure.contexts.my_sql_context\
     import MySqlContext
from project.infrastructure.repositories.repository import Repository


class CommonRepository(Repository):

    def __init__(self, connection_string_name="MYSQL_CONNECTION",
                 entity_name=None):
        self.__context = MySqlContext(connection_string_name)

        Repository.__init__(self, self.__context, entity_name)
