import os
import json
import manage
import uuid
import pathlib
from flask import send_from_directory, current_app, request
from datetime import datetime, timedelta
from project.models.enum.stage_enum import Stage
from project.models.enum.date_stage_enum import DateStage
from project.models.enum.type_planting_enum import TypePlanting
from project.models.enum.keys_enum import Keys
from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken   
from project.resources.utils.generals_utils import GeneralsUtils
from project.resources.utils.notification_utils import NotificationUtils
from holidays_co import is_holiday_date
from project.services.calendar_service import CalendarService
from project.resources.utils.data_utils import DataUtils


class StageServices:
    MESSAGE_HISTORIC = 'Historico del Lote %s de la Finca %s Fecha de cosecha %s'
    PATH_IMAGES = "%stasa_service/get_file/%s"

    def __init__(self):
        self.__repository_properties = CommonRepository(
         entity_name="properties")
        self.__repository_land = CommonRepository(
         entity_name="land")
        self.__repository_property_stage = CommonRepository(
         entity_name="property_stage")
        self.__repository_property_stage_update = CommonRepository(
         entity_name="property_stage_finish")
        self.__repository_stage = CommonRepository(
         entity_name="stage")
        self.__repository_procedure = CommonRepository(
         entity_name="propertyProcedure") 
        self.__repository_user = CommonRepository(
         entity_name="user")
        self.__repository_historical = CommonRepository(
            entity_name="historical"
        )
        self.__repository_stage = CommonRepository(
            entity_name="stage"
        ) 
        self.__service_activities = CalendarService()

    def get_property_land(self, id, land):

        results = {
            "data": [],
            "details": []
        }

        lands = self.__repository_land.select(entity_name="land", options={"filters":
                             [['property_id', "equals", id],
                             "and",
                             ['id', "equals", land]]
                             })
        property = self.__repository_properties.select_one(int(id), entity_name="properties")
        property = property[0]
        lands = lands[0]
        batchs = { 
                    "id": lands['id'],
                    "name": lands['land_name'],
                    "hectares_number": lands['land_ha']
               } 

        stage_number = Stage.stage_one.value

        validation_token = SecurityToken().validate_token() 
        email = validation_token[2]
        tuple_stage = self.get_property_stage(email, land, stage_number)        

        if(len(tuple_stage[1])>0):
            data = json.loads(tuple_stage[1][0]['data'])            
            batchs['variety'] = data['variety']

        property['batchs'] = batchs
        property["direction"] = property.pop("address")
        property["web_page"] = property.pop("web_site")
        property["hectares_total"] = property.pop("total")
        
        results["data"].append(property)
        return results

    def get_stage_one(self, land_id):
        stage_number = Stage.stage_one.value
        edit = False
        results = {
            "data": [],
            "details": []
        }

        self.insert_historic(land_id)
        validation_token = SecurityToken().validate_token() 
        email = validation_token[2]
        
        tuple_stage = self.get_property_stage(email, land_id, stage_number)
        property_stage = tuple_stage[1]
        edit = tuple_stage[0]                   
        
        if(len(property_stage) == 0):
            results['data'].append(
                  {
                    "real_date": "",
                    "sowing_date": "",
                    "type_sowing": "",
                    "variety": "",
                    "enabled": edit,
                    "images": None
                }
            )
        else:
            property_stage = property_stage[0]            
            json_data = json.loads(property_stage['data'])            
            edit = 'real_date' in json_data and not json_data['real_date'] and edit
            json_data['enabled'] = edit
            json_data['images'] = property_stage['procedure_image']
            results['data'].append(json_data)

        return results
    
    def get_stage(self, land_id, stage):
        stage_number = Stage(stage)

        if stage_number == Stage.stage_four:
            return self.get_stage_four(land_id, stage_number.value)    
        else:
            return self.get_stage_general(land_id, stage_number.value)
  
    def set_stage(self, data):
        stage_number = Stage(data['stage_number'])            
        return self.set_stage_general(data, stage_number)

    def set_stage_general(self, data, stage_number):
        results = {
            "data": [],
            "details": []
        }
        
        land_id = data['land_id']
        result_tuple = self.get_property_stage('',data['land_id'],stage_number.value)

        property_stage = result_tuple[1]
        stage_id = result_tuple[2]        
        
        images = []
        stage_db = {}
        complete_stage = False

        notification_utils = NotificationUtils()
        if("observations" in data and "products" in data and "images" in data):
            notification_utils.set_notification(land_id, stage_number.value)
        
        if("images" in data):
            images = data['images']
            stage_db["procedure_image"] = json.dumps(images)
            data.pop("images")

        if (stage_number == Stage.stage_fifteen and
           "amount_quintals" in data):
           complete_stage = True
           stage_db["end_date"] = datetime.now()

        if("application_date" in data and len(data['application_date']) > 0):
            stage_db["application_date"] = data['application_date']
            complete_stage = True
            stage_db["end_date"] = datetime.now()
        elif "application_date" in data and len(data['application_date']) == 0:
            data.pop('application_date')    
        
        data.pop("land_id")
        data.pop("stage_number")
        
        stage_db['data'] = json.dumps(data)
        stage_db['stage_complete'] = complete_stage

        if(len(property_stage) == 0):

            property_one = self.__repository_property_stage.select(entity_name="property_stage", options={"filters":
                             [
                             ['land_id', "equals", land_id],
                             "and",
                             ["crop_complete","equals",False]]
                             })

            stage_db['land_id'] = land_id            
            stage_db['crop_complete'] = False
            stage_db['start_date'] = datetime.now()
            stage_db['id_crop'] = property_one[0]['id_crop']
            stage_db['stage_id'] = stage_id
            self.__repository_property_stage.insert(stage_db)
            
        else:
            property_stage = property_stage[0]['id']
            self.__repository_property_stage.update(property_stage,stage_db)
           
        self.update_segments(land_id, stage_number, complete_stage)
        results['data'].append("Datos guardados exitosamente")

        return results

    def get_stage_general(self, land_id, stage_number):        

        results = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token()
        email = validation_token[2]

        tuple_stage = self.get_property_stage(email, land_id, stage_number)
        dates = DataUtils.calulate_date_stage(stage_number, tuple_stage[3])

        property_stage = tuple_stage[1]
        edit = tuple_stage[0]

        stage = self.calulate_stage(stage_number)    
    
        if(len(property_stage) == 0):            
            
            property_stage_one = self.get_property_stage(email, land_id, stage)[1]
            if(edit and not stage_number in (Stage.stage_two.value,Stage.stage_three.value)):                
                edit &= (len(property_stage_one) > 0)
                edit &= property_stage_one[0]['stage_complete'] if(len(property_stage_one) > 0) else edit

            if(edit and stage_number is Stage.stage_three.value):
                data = json.loads(property_stage_one[0]['data'])
                edit &= (len(property_stage_one) > 0 and 'sowing_date' in data
                and len(data['sowing_date']) > 0)  

            if(edit and len(property_stage_one) > 0 and stage_number is Stage.stage_two.value):
                data = json.loads(property_stage_one[0]['data'])
                edit = data['sowing_date'] != ''

            start_traking_date = ''
            end_traking_date = ''
            data = []
            date =  self.validation_system(stage_number, email, land_id)

            if date != '':
                dates_calculated = self.validate_dates(date, dates, stage_number)
                start_traking_date = dates_calculated[0]
                end_traking_date = dates_calculated[1]

            results['data'].append(
                  {
                    "application_date": "",
                    "end_traking_date": end_traking_date,
                    "observations": "",
                    "start_traking_date": start_traking_date,
                    "enabled": edit,
                    "products": [],
                    "images": None
                }
            )
        else:
            property_stage = property_stage[0]            
            json_data = json.loads(property_stage['data'])            
            edit = (stage_number == Stage.stage_fifteen.value and 
            'amount_quintals' not in json_data) or ('application_date' not in json_data and 
            stage_number != Stage.stage_fifteen.value) and (edit)
            json_data['enabled'] = edit
            json_data['images'] = property_stage['procedure_image']
            results['data'].append(json_data)

        return results

    def get_stage_four(self, land_id, stage_number):        

        results = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token()
        email = validation_token[2]

        tuple_stage = self.get_property_stage(email, land_id, stage_number)
        dates = DataUtils.calulate_date_stage(stage_number, tuple_stage[3])
        property_stage = tuple_stage[1]
        edit = tuple_stage[0]

        stage_one = Stage.stage_one.value    
        stage_three = Stage.stage_three.value
    
        if(len(property_stage) == 0):

            property_stage_one = self.get_property_stage(email, land_id, stage_one)[1]
            property_stage_three = self.get_property_stage(email, land_id, stage_three)[1]

            edit &= (len(property_stage_one) > 0 and len(property_stage_three) > 0)

            edit &= property_stage_one[0]['stage_complete'] if(len(property_stage_one) > 0 and len(property_stage_three) > 0) else edit
            edit &= property_stage_three[0]['stage_complete'] if(len(property_stage_three) > 0 and len(property_stage_one) > 0) else edit
            
            start_traking_date = ''
            end_traking_date = ''
            data = []
            if (edit):
                property_stage_one = property_stage_one[0]
                data = json.loads(property_stage_one['data'])
            date =  self.validation_system(stage_number, email, land_id)

            if date != '':
                dates_calculated = self.validate_dates(date, dates, stage_number)
                start_traking_date = dates_calculated[0]
                end_traking_date = dates_calculated[1]

            results['data'].append(
                  {
                    "application_date": "",
                    "end_traking_date": end_traking_date,
                    "observations": "",
                    "start_traking_date": start_traking_date,
                    "enabled": edit,
                    "products": [],
                    "images": None
                }
            )
        else:
            property_stage = property_stage[0]            
            json_data = json.loads(property_stage['data'])            
            edit = edit and 'application_date' not in json_data
            json_data['enabled'] = edit
            json_data['images'] = property_stage['procedure_image']
            results['data'].append(json_data)

        return results
    

    def get_property_stage(self, email, land_id, stage_number):
        
        edit = False
        user = self.__repository_user.select(entity_name="user", options={ "filters":
            [["email",
            "equals",
            email]
            ]
        })      

        land = self.__repository_land.select_one(land_id)
        property_field = self.__repository_properties.select_one(land[0]['property_id'])
        sowing_system = property_field[0]['sowing_system']

        if(len(user)>0):
            edit |= user[0]['role_id'] == Keys.admi.value
            edit |= user[0]['id'] == property_field[0]['manager']
            edit |= user[0]['id'] == property_field[0]['property_owner']
            edit |= user[0]['id'] == property_field[0]['seller']

        stage = self.__repository_stage.select(entity_name="stage", options={"filters":
                             [['typePlanning', "equals", sowing_system],
                             "and",
                             ['stageNumber', "equals", stage_number]]
                             })

        stage_id = stage[0]['id']

        property_stage = self.__repository_property_stage.select(entity_name="property_stage", options={"filters":
                             [['stage_id', "equals", stage_id],
                             "and",
                             ['land_id', "equals", land_id],
                             "and",
                             ["crop_complete","equals",False]]
                             })

        return (edit, property_stage, stage_id, sowing_system)
        
    def upload_file(self, files):
        l_files = []
        results = {
            "data": [],
            "details": []
        }
        
        if 'image_1' in files:
            file = files['image_1']
            new_file = str(uuid.uuid1()) +"."+ file.filename.split(".")[-1]
            l_files.append(new_file)
            file.save(os.path.join(manage.uploads_dir, new_file))

        if 'image_2' in files:
            file = files['image_2']
            new_file = str(uuid.uuid1()) +"."+ file.filename.split(".")[-1]
            l_files.append(new_file)
            file.save(os.path.join(manage.uploads_dir, new_file))

        if 'image_3' in files:
            file = files['image_3']
            new_file = str(uuid.uuid1()) +"."+ file.filename.split(".")[-1]
            l_files.append(new_file)
            file.save(os.path.join(manage.uploads_dir, new_file))
        
        results['data'].append(l_files)

        return results
    
    def get_file(self, file, token_new):
        results = {
            'details': []
        }
        validation_token = SecurityToken().validate_token(token=token_new) 
        if not validation_token[0] or (not SecurityToken().verify_exist_token(token_new) and "is_authenticated" not in request.base_url):
            results['details'].append({
                    "key": 400,
                    "value": "Token Invalido"
                })
            return results 
        return send_from_directory('images', file)

    def calendar_stage(self, id_lote):
        results = {
            "data": [],
            "details": []
        }

        data_land = self.__repository_land.select(entity_name="land",options={"filters":
                             [['id', "equals", id_lote]]
                             })
        if len(data_land) > 0:                     
            data_property = self.__repository_properties.select(options={"filters":
                                [['id', "equals", data_land[0]['property_id']]]
                                })
            if len(data_property) > 0:
                data_stage = self.__repository_stage.select(entity_name="stage", options={"filters":
                                [['typePlanning', "equals", data_property[0]['sowing_system']]]
                                })
                results['data'] = self.complete_stage(data_stage, id_lote)                

        return results

    def complete_stage(self, data, id_land):
        data_stages = self.__repository_procedure.select(entity_name="propertyProcedure",options={"filters":
                                [['landId', "equals", id_land],
                                "and",
                                ["cropComplete", "equals", False]]
                                })
        data = list(map(lambda x: 
        {
            "id_stage": x['id'],
			"stage_number": x['stageNumber'],
			"stage_name": x['stage'],
			"complete": False
        }
        if len(data_stages)==0 else self.validation_stage(x, data_stages) , data))
        
        return data

    def validation_stage(self, data, stages):
        result = list(map(lambda x: 
        {   "stage": "1",
            "id_stage": data['id'],
			"stage_number": data['stageNumber'],
			"stage_name": data['stage'],
			"complete": True
        }
        if x['stageId'] == data['id'] and
        (x['stageComplete'])
        else
        {   
            "stage":"2",
            "id_stage": data['id'],
			"stage_number": data['stageNumber'],
			"stage_name": data['stage'],
			"complete": False
        }, stages))

        data = sorted(result, key= lambda stage: stage['stage'])
        del data[0]['stage']
        return data[0]

    def set_stage_one(self, data):
        results = {
            "data": [],
            "details": []
        }
        
        validation_token = SecurityToken().validate_token()
        email = validation_token[2]
        land_id = data['land_id']         
        
        stage_number = Stage.stage_one.value
        tuple_stage = self.get_property_stage(email, land_id, stage_number)

        land = self.__repository_land.select_one(land_id)
        property_field = self.__repository_properties.select_one(land[0]['property_id'])
        sowing_system = property_field[0]['sowing_system']

        stage = self.__repository_stage.select(entity_name="stage", options={"filters":
                             [['typePlanning', "equals", sowing_system],
                             "and",
                             ['stageNumber', "equals", stage_number]]
                             })

        stage_id = stage[0]['id']
        
        property_stage = self.__repository_property_stage.select(entity_name="property_stage", options={"filters":
                             [['stage_id', "equals", stage_id],
                             "and",
                             ['land_id', "equals", land_id],
                             "and",
                             ["crop_complete","equals",False]]
                             })
        
        images = []
        stage_db = {}
        complete_stage = False

        notification_utils = NotificationUtils()        
        self.set_alarms(land_id, tuple_stage[3], data)
        if("sowing_date" in data and "type_sowing" in data and "variety" in data):
            notification_utils.set_notification(land_id, stage_number)
        
        if("images" in data):
            images = data['images']
            stage_db["procedure_image"] = json.dumps(images)
            data.pop("images")
        else:
            stage_db["procedure_image"] = None
        
        if("real_date" in data and len(data['real_date'].strip()) > 0 ):
            stage_db["real_date"] = data['real_date']
            complete_stage = True
            stage_db["end_date"] = datetime.now()
            self.set_calendar_real(land_id, property_field[0]['seller'], data['real_date'])
            self.set_calendar_real(land_id, property_field[0]['property_owner'], data['real_date'])
            self.set_calendar_real(land_id, property_field[0]['manager'], data['real_date'])
            self.set_calendar_real(land_id, property_field[0]['parthner_add'], data['real_date'])

        data.pop("land_id")
        
        stage_db['data'] = json.dumps(data)
        stage_db['stage_complete'] = complete_stage        

        if(len(property_stage) == 0):
            stage_db['land_id'] = land_id            
            stage_db['crop_complete'] = False
            stage_db['start_date'] = datetime.now()
            stage_db['id_crop'] = str(uuid.uuid1())
            stage_db['stage_id'] = stage_id
            self.__repository_property_stage.insert(stage_db)
        else:
            property_stage = property_stage[0]['id']
            self.__repository_property_stage.update(property_stage,stage_db)      

        if("sowing_date" in data and len(data['sowing_date'].strip()) > 0 ):
            date = GeneralsUtils.try_parse_date_time(data['sowing_date'])
            self.set_calendar_planning(land_id, property_field[0]['seller'], date)
            self.set_calendar_planning(land_id, property_field[0]['property_owner'], date)
            self.set_calendar_planning(land_id, property_field[0]['parthner_add'], date)
            self.set_calendar_planning(land_id, property_field[0]['manager'], date)

        results['data'].append("Datos guardados exitosamente")
        return results
    
    def set_calendar_planning(self, land_id, user, date):
        self.__service_activities.set_calendar(land_id, user, 2, date, True)
        self.__service_activities.set_calendar(land_id, user, 3, date, True)
        self.__service_activities.set_calendar(land_id, user, 1, date, True)

    def set_calendar_real(self, land_id, user, date):
        date = GeneralsUtils.try_parse_date_time(date)
        self.__service_activities.set_calendar(land_id, user, 4, date, False)
        self.__service_activities.set_calendar(land_id, user, 5, date, False)
        self.__service_activities.set_calendar(land_id, user, 6, date, False)
        self.__service_activities.set_calendar(land_id, user, 7, date, False)
        self.__service_activities.set_calendar(land_id, user, 8, date, False)
        self.__service_activities.set_calendar(land_id, user, 9, date, False)
        self.__service_activities.set_calendar(land_id, user, 10, date, False)
        self.__service_activities.set_calendar(land_id, user, 11, date, False)
        self.__service_activities.set_calendar(land_id, user, 12, date, False)
        self.__service_activities.set_calendar(land_id, user, 13, date, False)
        self.__service_activities.set_calendar(land_id, user, 14, date, False)
        self.__service_activities.set_calendar(land_id, user, 15, date, False)

    def calulate_stage(self, stage):
        stage_result = 0
        if stage == Stage.stage_two.value or stage == Stage.stage_four.value:
           stage_result = Stage.stage_one.value
        elif stage == Stage.stage_three.value:
           stage_result = Stage.stage_one.value 
        elif stage == Stage.stage_five.value:
            stage_result = Stage.stage_four.value
        elif stage == Stage.stage_six.value:
            stage_result = Stage.stage_five.value
        elif stage == Stage.stage_seven.value:
            stage_result = Stage.stage_six.value
        elif stage == Stage.stage_eight.value:
            stage_result = Stage.stage_seven.value
        elif stage == Stage.stage_nine.value:
            stage_result = Stage.stage_eight.value
        elif stage == Stage.stage_ten.value:
            stage_result = Stage.stage_nine.value
        elif stage == Stage.stage_eleven.value:
            stage_result = Stage.stage_ten.value  
        elif stage == Stage.stage_twelve.value:
            stage_result = Stage.stage_eleven.value
        elif stage == Stage.stage_thirteen.value:
            stage_result = Stage.stage_twelve.value
        elif stage == Stage.stage_fourteen.value:
            stage_result = Stage.stage_thirteen.value    
        elif stage == Stage.stage_fifteen.value:
            stage_result =  Stage.stage_fourteen.value               
        return stage_result
    
    def validation_system(self, stage, email, land_id):
        result = ''
        if stage == Stage.stage_two.value:
           result = GeneralsUtils.try_parse_date_time(self.get_date_initial(email, land_id)['sowing_date']) 
        elif stage == Stage.stage_three.value:
           result = GeneralsUtils.try_parse_date_time(self.get_date_initial(email, land_id)['sowing_date'])   
        elif stage != Stage.stage_two.value:
           result = GeneralsUtils.try_parse_date_time(self.get_date_initial(email, land_id)['real_date'])
        return result

    def get_date_initial(self, email, land_id):
        property_stage_one = self.get_property_stage(email, land_id, Stage.stage_one.value)[1]
        if len(property_stage_one) == 0:
            return {
                'real_date': '',
                'sowing_date': ''
            }

        data = json.loads(property_stage_one[0]['data'])
        return data

    def validate_dates(self, date, date_caluted, stage):
        start = 0
        end = 0
        if stage in (Stage.stage_two.value, Stage.stage_three.value):
            start = str(date - timedelta(days=date_caluted[1]))
            end = str(date - timedelta(days=date_caluted[0]))
        else:
            start = str(date + timedelta(days=date_caluted[0]))
            end = str(date + timedelta(days=date_caluted[1]))
        return (start,end)

    def update_segments(self, land_id, stage, stage_complete):
        if stage_complete and stage.value == Stage.stage_fifteen.value:
            self.insert_historic(land_id)
            stage_db = {}         
            stage_db['crop_complete'] = True
            self.__repository_property_stage_update.update(land_id,stage_db)

    def insert_historic(self, id_land):
        insert_object = {}
        insert_historical = {}
        property_stage = self.__repository_property_stage.select(entity_name="property_stage", options={"filters":
                             [
                             ['land_id', "equals", id_land],
                             "and",
                             ["crop_complete","equals", False]]
                             })
        land = self.__repository_land.select(options={"filters":
                             [
                             ['id', "equals", id_land]]
                             })
        
        property_ = self.__repository_properties.select(options={"filters":
                             [
                             ['id', "equals", land[0]["property_id"]]]
                             })

        owner =  self.__repository_user.select(options={"filters":
                             [
                             ['id', "equals", property_[0]["property_owner"]]]
                             })

        seller  = self.__repository_user.select(options={"filters":
                             [
                             ['id', "equals", property_[0]["seller"]]]
                             })
        
        segments = list(map(lambda x: self.join_segment(json.loads(x['data']), self.get_images(x['procedure_image'])), 
        property_stage))
        

        insert_object['title'] = self.MESSAGE_HISTORIC % (land[0]['land_name'], property_[0]['name'], property_stage[0]['start_date'].strftime('%Y-%m-%d'))
        insert_object['owner'] = {
            "id": owner[0]['id'],
            "name": owner[0]['name'] + " " + owner[0]['last_name'] 
        }
        insert_object['seller'] = {
            "id": seller[0]['id'],
            "name": seller[0]['name'] + " " + owner[0]['last_name'] 
        }

        insert_object['segments'] = segments
        insert_historical['id_land'] = id_land
        insert_historical['data'] = json.dumps(insert_object)
        self.__repository_historical.insert(insert_historical)              

    def get_images(self, data):
        if data is not None:
            data = json.loads(data)
            path = request.url_root
            list_images = list(map(lambda x: self.PATH_IMAGES % (path, x), data))
            return list_images
        return []

    def join_segment(self, data, images):
        result = {}
        result['segments'] = data
        result['segments']['images'] = images
        return result['segments']

    def set_alarms(self, land_id, type_land, type_date):
        segments = []
        if "sowing_date" in type_date and len(type_date['sowing_date']) > 0:
            segments = [Stage.stage_one.value, Stage.stage_two.value, Stage.stage_three.value]
            list(map(lambda x: self.get_data_alarms(land_id, x, type_land,  type_date['sowing_date']), segments))
        if "real_date" in type_date and len(type_date['real_date']) > 0:
            segments = (Stage.stage_four.value, Stage.stage_five.value,
            Stage.stage_six.value, Stage.stage_seven.value, Stage.stage_eight.value,
            Stage.stage_nine.value, Stage.stage_ten.value, Stage.stage_eleven.value,
            Stage.stage_twelve.value, Stage.stage_thirteen.value, Stage.stage_fourteen.value,
            Stage.stage_fifteen.value)
            list(map(lambda x: self.get_data_alarms(land_id, x, type_land, type_date['real_date']), segments))

    def get_data_alarms(self, land_id, stage, type_land, date):
        date_calculated = []
        stage_name = self.__repository_stage.select(options={"filters":
                             [
                             ['stageNumber', "equals", stage],
                             'and',
                             ['typePlanning', "equals", type_land]]
                             })
        land = self.__repository_land.select(options={"filters":
                             [
                             ['id', "equals", land_id]]
                             })
        
        property_ = self.__repository_properties.select(options={"filters":
                             [
                             ['id', "equals", land[0]["property_id"]]]
                             })
        if stage == Stage.stage_one.value:
            date_alarm = self.get_date_holidays(date)
            date_calculated = date
        else:
            dates = DataUtils.calulate_date_stage(stage, type_land)
            date_calculated = self.validate_dates(GeneralsUtils.try_parse_date_time(date), dates, stage)[0]
            date_alarm = self.get_date_holidays(date_calculated)
        
        result = {
            "batch_name": land[0]['land_name'],
            "property_name": property_[0]['name'],
            "title": stage_name[0]['stage'],
            "land_id": land_id,
            "property_id": property_[0]['id'],
            "type": 2,
            "date": date_calculated,
            "date_alarm": date_alarm,
            "stage_number": stage,
            "stage_id": stage_name[0]['id']
        }

        NotificationUtils().set_alarms(result)

    def get_date_holidays(self, date):
        date_alarm = (GeneralsUtils.try_parse_date_time(date) - timedelta(days=2))
        while is_holiday_date(date_alarm):
            date_alarm = (date_alarm + timedelta(days=1))
        return str(date_alarm)