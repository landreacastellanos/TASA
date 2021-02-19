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

        self.__repository_properties = CommonRepository(
         entity_name="properties")

        self.__repository_land = CommonRepository(
         entity_name="land")   

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

    def delete_notification(self, type_id, data):

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
            notification = json.loads(item['Notification'])
            if(notification['type'] == type_id):
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
            "author": "{} {}".format(user["name"], user['last_name']),
            "id_author": user['id'],
            "land_id": data['id_land'],
            "role_id": user['role_id'],
            "created_date": datetime.now()
        }

        self.__repository_chat.insert(chat)
        self.set_chat_notification(data['id_land'], user['id'])
        results['data'].append("Chat creado correctamente.")

        return results

    
    def set_chat_notification(self, land_id, user_id):

        land = self.__repository_land.select_one(land_id)[0]
        property_field = self.__repository_properties.select_one(int(land["property_id"]))[0]
        user = self.__repository_user.select_one(user_id)[0]

        notification = {
                "land_id": land['id'],
                "type": 3, 
                "batch_name": land['land_name'], 
                "property_id": property_field['id'], 
                "property_name": property_field['name'],
                "id_user": user['id'],
                "user_name": user['name'] +' '+ user['last_name'],
        }        
        if(property_field['manager'] is not None and property_field['manager'] != user_id):
            self.insert_data(notification, property_field['manager'])
        if(property_field['property_owner'] is not None and property_field['property_owner'] != user_id):
            self.insert_data(notification, property_field['property_owner'])

        if(property_field['parthner_add'] is not None and property_field['parthner_add'] != user_id):
            self.insert_data(notification, property_field['parthner_add'])
        if(property_field['seller'] is not None and property_field['seller'] != user_id):
            self.insert_data(notification, property_field['seller'])


    def insert_data(self, notification, user_id):
            user = self.__repository_user.select_one(user_id)[0]
            user_notification = {
                "id_user": user['id'],
                "user_name": user['email'],
                "Notification": json.dumps(notification)                
            }
            self.__repository_notification.insert(user_notification)