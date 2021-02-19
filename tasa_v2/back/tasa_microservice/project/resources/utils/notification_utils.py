
import json
from project.resources.utils.generals_utils import GeneralsUtils
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
        self.__repository_alarm = CommonRepository(
         entity_name="alarms")

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
                "type": 1, 
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

    def set_alarms(self, data):
        property_field = self.__repository_properties.select_one(int(data["property_id"]))[0]
        id_land = data['land_id']
        stage_id = data['stage_id']
        alarm_date = data['date_alarm']
        del data['land_id']
        del data['stage_id']
        del data['date_alarm']
        if(property_field['manager'] is not None):
            self.insert_data_alarm(data, property_field['manager'], id_land, stage_id, alarm_date)
        if(property_field['property_owner'] is not None):
            self.insert_data_alarm(data, property_field['property_owner'], id_land, stage_id, alarm_date)

        if(property_field['parthner_add'] is not None):
            self.insert_data_alarm(data, property_field['parthner_add'], id_land, stage_id, alarm_date)
        if(property_field['seller'] is not None):
            self.insert_data_alarm(data, property_field['seller'], id_land, stage_id, alarm_date)
        if(property_field['purchasing_manager'] is not None):
            self.insert_data_alarm(data, property_field['purchasing_manager'], id_land, stage_id, alarm_date)
        if(property_field['pay_manager'] is not None):
            self.insert_data_alarm(data, property_field['pay_manager'], id_land, stage_id, alarm_date)
        if(property_field['responsible_purchasing'] is not None):
            self.insert_data_alarm(data, property_field['responsible_purchasing'], id_land, stage_id, alarm_date)
        if(property_field['decision_influencer'] is not None):
            self.insert_data_alarm(data, property_field['decision_influencer'], id_land, stage_id, alarm_date)

    def insert_data_alarm(self, data, user_id, id_land, stage_id, alarm_date):
        user = self.__repository_user.select_one(user_id)[0]
        result = {
            "id_user": user['id'],
            "user_name": user['email'],
            "Notification": json.dumps(data),
            "id_land": id_land,
            "stage_id": stage_id,
            "alarm_date": GeneralsUtils().try_parse_date_time(alarm_date),
            "alarm": True
        }
        self.__repository_alarm.insert(result)
            