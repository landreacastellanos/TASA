
import json
from project.infrastructure.repositories.common_repository\
    import CommonRepository

class NotificationUtils():

    def __init__(self):
        self.__repository_stage = CommonRepository(
         entity_name="stage")
        self.__repository_notification = CommonRepository(
         entity_name="notification")
        self.__repository_properties = CommonRepository(
         entity_name="properties")
        self.__repository_land = CommonRepository(
         entity_name="land")        
        self.__repository_user = CommonRepository(
         entity_name="user")

    def set_notification(self, land_id, stage_number):
        land = self.__repository_land.select_one(land_id)[0]
        property_field = self.__repository_properties.select_one(int(land["property_id"]))[0]
        stage = self.__repository_stage.select(entity_name="stage", options={"filters":
                             [['typePlanning', "equals", property_field['sowing_system']],
                             "and",
                             ['stageNumber', "equals", stage_number]]
                             })[0]

        user_notification = {
                "land_id": land['id'], 
                "batch_name": land['land_name'], 
                "stage_name": stage['stage'], 
                "property_id": property_field['id'], 
                "stage_number": stage_number, 
                "property_name": property_field['name']
        }

        if(property_field['manager'] is not None):
            self.insert_data(user_notification, property_field['manager'])
        if(property_field['property_owner'] is not None):
            self.insert_data(user_notification, property_field['property_owner'])

        if(property_field['parthner_add'] is not None):
            self.insert_data(user_notification, property_field['parthner_add'])
        if(property_field['seller'] is not None):
            self.insert_data(user_notification, property_field['seller'])
        if(property_field['purchasing_manager'] is not None):
            self.insert_data(user_notification, property_field['purchasing_manager'])
        if(property_field['pay_manager'] is not None):
            self.insert_data(user_notification, property_field['pay_manager'])
        if(property_field['responsible_purchasing'] is not None):
            self.insert_data(user_notification, property_field['responsible_purchasing'])
        if(property_field['decision_influencer'] is not None):
            self.insert_data(user_notification, property_field['decision_influencer'])

    def insert_data(self, notification, user_id):
            user = self.__repository_user.select_one(user_id)[0]
            user_notification = {
                "id_user": user['id'],
                "user_name": user['email'],
                "Notification": json.dumps(notification)
            }
            self.__repository_notification.insert(user_notification)

    def set_alarms(self, land_id, stage_number, date):
        land = self.__repository_land.select_one(land_id)[0]
        property_field = self.__repository_properties.select_one(int(land["property_id"]))[0]
        stage = self.__repository_stage.select(entity_name="stage", options={"filters":
                             [['typePlanning', "equals", property_field['sowing_system']],
                             "and",
                             ['stageNumber', "equals", stage_number]]
                             })[0]
        
        user_notification = {
                "land_id": land['id'], 
                "batch_name": land['land_name'], 
                "stage_name": stage['stage'], 
                "property_id": property_field['id'], 
                "stage_number": stage_number, 
                "property_name": property_field['name'],
                "date" : date,
                "title": stage
        }

        if(property_field['manager'] is not None):
            self.insert_data(user_notification, property_field['manager'])
        if(property_field['property_owner'] is not None):
            self.insert_data(user_notification, property_field['property_owner'])

        if(property_field['parthner_add'] is not None):
            self.insert_data(user_notification, property_field['parthner_add'])
        if(property_field['seller'] is not None):
            self.insert_data(user_notification, property_field['seller'])
        if(property_field['purchasing_manager'] is not None):
            self.insert_data(user_notification, property_field['purchasing_manager'])
        if(property_field['pay_manager'] is not None):
            self.insert_data(user_notification, property_field['pay_manager'])
        if(property_field['responsible_purchasing'] is not None):
            self.insert_data(user_notification, property_field['responsible_purchasing'])
        if(property_field['decision_influencer'] is not None):
            self.insert_data(user_notification, property_field['decision_influencer'])
            