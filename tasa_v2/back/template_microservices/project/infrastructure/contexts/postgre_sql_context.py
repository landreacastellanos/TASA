from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from project.configuration_manager import ConfigurationManger
from project.resources.utils.data_utils import DataUtils


class PostgreSqlContext():

    __session_maker = None

    def __init__(self, connection_string_name):
        self.set_connection_string(connection_string_name)

    def set_connection_string(self,connection_string_name):
        self.__connection_string = ConfigurationManger.\
            get_connection_string(connection_string_name)

        engine = create_engine(self.__connection_string)

        self.__session_maker = sessionmaker(bind=engine)

    def get_connection_string(self):
        return self.__connection_string

    @contextmanager
    def session(self):
        session = self.__session_maker()

        try:
            yield session

            session.commit()

        except Exception:
            session.rollback()

            raise

        finally:
            session.close()
