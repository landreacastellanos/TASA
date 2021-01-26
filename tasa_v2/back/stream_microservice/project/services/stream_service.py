import json
from datetime import datetime
from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken
from project.resources.utils.encryption_utils import Encryption

class NotificationService():

    def __init__(self):
        self.__repository_notification = CommonRepository(
         entity_name="notification")

        self.__repository_chat = CommonRepository(
         entity_name="chat")

        self.__repository_user = CommonRepository(
         entity_name="user")

    def get_notification(self):

        results = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token() 
        email = validation_token[2]

        data = self.__repository_notification.select(entity_name="notification",options={ "filters":
            [["user_name", "equals", email]
            ]         
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
            [["user_name",
            "equals",
            email]
            ]
        })  

        for item in data:
            self.__repository_notification.delete(item['id'],entity_name="notification")

        results['data'].append("Notificaciones eliminadas.")
        return results
    
    def get_chat_message(self, land):
        results = {
            "data": [],
            "details": []
        }

        data = self.__repository_chat.select(entity_name="chat",options={ "filters":
            [["land_id",
            "equals",
            land]
            ],
            "order_by": {'column_name': 'created_date', 'desc': False}
        }) 

        results['data'].append(data)
        return results
    
    def set_chat_message(self, data):
        results = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token() 
        email = validation_token[2]

        user = self.__repository_user.select(
            options={"filters":
                             [['email', "equals", email]]
                             })[0]

        chat = {
            "message": data["message"],
            "autor": "{} {}".format(user["name"], user['last_name']),
            "id_autor": user['id'],
            "land_id": data['id_land'],
            "created_date": datetime.now()
        }

        self.__repository_chat.insert(chat)

        results['data'].append("Chat creado correctamente.")

        return results