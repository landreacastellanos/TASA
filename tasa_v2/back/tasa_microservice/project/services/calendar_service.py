from project.infrastructure.repositories.common_repository\
    import CommonRepository
from datetime import datetime, timedelta
from project.resources.utils.data_utils import DataUtils
from project.resources.utils.security_token import SecurityToken  
from project.models.enum.keys_enum import Keys


class CalendarService:

    def __init__(self):
        self.__repository_user = CommonRepository(
         entity_name="user")
        self.__repository_calendar = CommonRepository(
         entity_name="calendar")
        self.__repository_properties = CommonRepository(
         entity_name="properties")
        self.__repository_land = CommonRepository(
         entity_name="land")
        self.__repository_stage = CommonRepository(
         entity_name="stage")
    
    def set_calendar(self, land_id, user_id, stage_number, date, is_planning):
        if(user_id is not None):
            land = self.__repository_land.select_one(land_id)
            property_field = self.__repository_properties.select_one(land[0]['property_id'])
            sowing_system = property_field[0]['sowing_system']

            stage = self.__repository_stage.select(entity_name="stage", options={"filters":
                            [['typePlanning', "equals", sowing_system],
                            "and",
                            ['stageNumber', "equals", stage_number]]
                            })[0]
            
            if(is_planning):
                start = DataUtils.calulate_date_stage(stage_number, sowing_system)[1]
                date = date - timedelta(days=start)
            else:
                start = DataUtils.calulate_date_stage(stage_number, sowing_system)[0]
                date = date + timedelta(days=start)

            calendar_activity = {
                "id_land": land_id,
                "id_user": user_id,
                "id_stage": stage['id'],
                "date": date,
                "property_name": property_field[0]['name'],
                "land_name": land[0]['land_name'],
                "property_id": property_field[0]['id'],
                "stage_number": stage_number,
                "stage_name": stage['stage']
            }       

            calendar = self.__repository_calendar.select(
                options={"filters":
                            [['id_land', "equals", land_id],
                            "and",
                            ['id_user', "equals", user_id],
                            "and",
                            ['id_stage', "equals", stage['id']]]
                            }
            )

            if(any(calendar)):
                calendar_activity['id'] = calendar[0]['id']
                self.__repository_calendar.update(calendar[0]['id'], calendar_activity)
            else:
                self.__repository_calendar.insert(calendar_activity)

    def get_calendar(self):
        validation_token = SecurityToken().validate_token() 
        email = validation_token[2]

        user = self.__repository_user.select(entity_name="user", options={ "filters":
            [["email",
            "equals",
            email]
            ]
        })

        if(user[0]['role_id'] == Keys.admi.value):
            calendar = self.__repository_calendar.select_all()

            calendar = list(map( lambda x: {
                "date": x['date'],
                "id_land": x['id_land'],
                "id_user": user[0]['id'],                
                "land_name": x['land_name'],
                "property_id": x['property_id'],
                "property_name": x['property_name'],
                "stage_number": x['stage_number'],
                "stage_name": x['stage_name']
            }, calendar))            

            return calendar
        else:
            calendar = self.__repository_calendar.select(options={ "filters":
                [["id_user",
                "equals",
                user[0]['id']]
                ]
            })

            calendar = list(map( lambda x: {
                "date": x['date'],
                "id_land": x['id_land'],
                "id_user": x['id_user'],
                "land_name": x['land_name'],
                "property_id": x['property_id'],
                "property_name": x['property_name'],
                "stage_number": x['stage_number'],
                "stage_name": x['stage_name']
            }, calendar))
            return calendar