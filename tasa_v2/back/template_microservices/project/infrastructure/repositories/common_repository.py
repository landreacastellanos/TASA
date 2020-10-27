from project.infrastructure.contexts.postgre_sql_context\
     import PostgreSqlContext
from project.infrastructure.repositories.repository import Repository


class CommonRepository(Repository):

    def __init__(self, connection_string_name="POSTGRESQL_DB_PAP_PS",
                 entity_name=None):
        self.__context = PostgreSqlContext(connection_string_name)

        Repository.__init__(self, self.__context, entity_name)
