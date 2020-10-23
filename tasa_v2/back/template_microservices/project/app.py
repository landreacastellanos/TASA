import logging
import logging.config
import time

from pyms.flask.app import Microservice

logging.basicConfig()
logger = logging.getLogger("myapp.sqltime")
logger.setLevel(logging.DEBUG)


class MyMicroservice(Microservice):

    def init_logger(self) -> None:
        if not self.application.config["DEBUG"]:
            super().init_logger()
        else:
            level = "DEBUG"
            LOGGING = {
                'version': 1,
                'disable_existing_loggers': False,
                'handlers': {
                    'console': {
                        'level': level,
                        'class': 'logging.StreamHandler',
                    },
                },
                'loggers': {
                    '': {
                        'handlers': ['console'],
                        'level': level,
                        'propagate': True,
                    },
                    'anyconfig': {
                        'handlers': ['console'],
                        'level': "WARNING",
                        'propagate': True,
                    },
                    'pyms': {
                        'handlers': ['console'],
                        'level': "WARNING",
                        'propagate': True,
                    },
                    'root': {
                        'handlers': ['console'],
                        'level': level,
                        'propagate': True,
                    },
                }
            }

            logging.config.dictConfig(LOGGING)


def create_app():
    """Initialize the Flask app, register blueprints and intialize all libraries like Swagger, database, the trace system...
    return the app and the database objects.
    :return:
    """
    ms = MyMicroservice(path=__file__)
    return ms.create_app()

# def list_routes(app):
#     routes = []

#     for rule in app.url_map.iter_rules():
#         routes.append('%s' % rule)

#     return routes

# print("aca estan los endpoints")
# print(list_routes(create_app()))