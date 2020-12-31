import json
from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken
from project.resources.utils.encryption_utils import Encryption

class NotificationService():

    def __init__(self):
        self.__repository_notification = CommonRepository(
         entity_name="notification")

    def get_notification(self):

        results = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token() 
        email = validation_token[2]

        data = self.__repository_notification.select(entity_name="notification",options={ "filters":
            [["user_name", "equals", email]
            ],
            "paginate": {"offset": 0, "limit": 10}            
        })        

        for item in data:
            data = json.loads(item['Notification'])
            data['id'] = item['id']
            results['data'].append(data)            
        return results

    def delete_notification(self, data):

        results = {
            "data": [],
            "details": []
        }

        if data is not None:
            results['data'].append("Notificacion eliminada.")
            self.__repository_notification.delete(data,entity_name="notification")
            return results

        validation_token = SecurityToken().validate_token() 
        email = validation_token[2]

        data = self.__repository_notification.select(entity_name="notification",options={ "filters":
            [["email",
            "equals",
            email]
            ],
            "paginate": {"offset": 0, "limit": 10}
        })  

        for item in data:
            self.__repository_notification.delete(item['id'],entity_name="notification")

        results['data'].append("Notificaciones eliminadas.")
        return results