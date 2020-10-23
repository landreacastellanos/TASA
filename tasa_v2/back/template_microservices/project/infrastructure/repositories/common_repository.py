from project.infrastructure.contexts.postgre_sql_context import PostgreSqlContext
from project.infrastructure.repositories.repository import Repository

class CommonRepository(Repository):

    def __init__(self, entity_name = None):
        self.__context = PostgreSqlContext("POSTGRESQL_MAIN")

        Repository.__init__(self, self.__context, entity_name)
