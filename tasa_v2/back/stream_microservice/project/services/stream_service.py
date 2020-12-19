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
            [["email",
            "equals",
            email]
            ],
            "paginate": {"offset": 0, "limit": 5}            
        })        

        for item in data:
            results['data'].append(json.loads(item['Notification']))
            #self.__repository_notification.delete(item['id'],entity_name="notification")
        return results