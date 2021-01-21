import os
import json
import manage
import uuid
from datetime import datetime, timedelta
from project.models.enum.stage_enum import Stage
from project.models.enum.date_stage_enum import DateStage
from project.models.enum.keys_enum import Keys
from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken   
from project.resources.utils.generals_utils import GeneralsUtils
from project.models.enum.type_planting_enum import TypePlanting

class StageServices:
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
                    "enabled": edit
                }
            )
        else:
            property_stage = property_stage[0]            
            json_data = json.loads(property_stage['data'])            
            edit = 'real_date' in json_data and not json_data['real_date']
            json_data['enabled'] = edit
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
        
        if("images" in data):
            images = data['images']
            stage_db["procedure_image"] = json.dumps(images)
            data.pop("images")
        
        if("application_date" in data and data['application_date']):
            stage_db["application_date"] = data['application_date']
            complete_stage = True
            stage_db["end_date"] = datetime.now()
        
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
        dates = self.calulate_date_stage(stage_number, tuple_stage[3])

        property_stage = tuple_stage[1]
        edit = tuple_stage[0]

        stage = self.calulate_stage(stage_number)    
    
        if(len(property_stage) == 0):

            property_stage_one = self.get_property_stage(email, land_id, stage)[1]
            edit &= (len(property_stage_one) > 0)

            edit &= property_stage_one[0]['stage_complete'] if(len(property_stage_one) > 0) else edit

            if(len(property_stage_one) > 0 and stage_number is Stage.stage_two.value):
                data = json.loads(property_stage_one[0]['data'])
                edit = data['sowing_date'] != ''

            start_traking_date = ''
            end_traking_date = ''
            data = []
            if (edit):
                property_stage_one = property_stage_one[0]
                data = json.loads(property_stage_one['data'])
            date =  self.validation_system(stage_number, email, land_id, data)

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
                    "products": []
                }
            )
        else:
            property_stage = property_stage[0]            
            json_data = json.loads(property_stage['data'])            
            edit = 'application_date' in json_data and not json_data['application_date']
            json_data['enabled'] = edit
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
        dates = self.calulate_date_stage(stage_number, tuple_stage[3])
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
            date =  self.validation_system(stage_number, email, land_id, data)

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
                    "products": []
                }
            )
        else:
            property_stage = property_stage[0]            
            json_data = json.loads(property_stage['data'])            
            edit = 'application_date' in json_data and not json_data['application_date']
            json_data['enabled'] = edit
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
            new_file = str(uuid.uuid1()) +"."+ file.filename.split(".")[1]
            l_files.append(new_file)
            file.save(os.path.join(manage.uploads_dir, new_file))

        if 'image_2' in files:
            file = files['image_2']
            new_file = str(uuid.uuid1()) +"."+ file.filename.split(".")[1]
            l_files.append(new_file)
            file.save(os.path.join(manage.uploads_dir, new_file))

        if 'image_3' in files:
            file = files['image_1']
            new_file = str(uuid.uuid1()) +"."+ file.filename.split(".")[1]
            l_files.append(new_file)
            file.save(os.path.join(manage.uploads_dir, new_file))
        
        results['data'].append(l_files)

        return results
    
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
                                [['landId', "equals", id_land]]
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

    def set_stage_one(self,data):
        results = {
            "data": [],
            "details": []
        }
        
        land_id = data['land_id']         
        
        stage_number = Stage.stage_one.value
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
        
        if("images" in data):
            images = data['images']
            stage_db["procedure_image"] = json.dumps(images)
            data.pop("images")
        
        if("real_date" in data and data['real_date']):
            stage_db["real_date"] = data['real_date']
            complete_stage = True
            stage_db["end_date"] = datetime.now()

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


        results['data'].append("Datos guardados exitosamente")
        return results

    def calulate_date_stage(self,stage, type_planting):
        start = 0
        end = 0
        if stage == Stage.stage_two.value:
           start = DateStage.stage_two_start.value
           end = DateStage.stage_two_end.value
        elif stage == Stage.stage_three.value and type_planting == TypePlanting.riego.value:
           start = DateStage.stage_three_start_riego.value
           end = DateStage.stage_three_end_riego.value
        elif stage == Stage.stage_three.value or stage == Stage.stage_four.value:
           start = DateStage.stage_three_start.value
           end = DateStage.stage_three_end.value
        elif stage == Stage.stage_five.value and type_planting == TypePlanting.riego.value:
            start = DateStage.stage_five_start_riego.value
            end = DateStage.stage_five_end_riego.value
        elif stage == Stage.stage_five.value and type_planting == TypePlanting.secano.value:
            start = DateStage.stage_five_start_secano.value
            end = DateStage.stage_five_end_secano.value 
        elif stage == Stage.stage_six.value and type_planting == TypePlanting.secano.value:
            start = DateStage.stage_six_start_secano.value
            end = DateStage.stage_six_end_secano.value
        elif stage == Stage.stage_six.value and type_planting == TypePlanting.riego.value:
            start = DateStage.stage_six_start_riego.value
            end = DateStage.stage_six_end_riego.value  
        elif stage == Stage.stage_seven.value and type_planting == TypePlanting.secano.value:
            start = DateStage.stage_seven_start_secano.value
            end = DateStage.stage_seven_end_secano.value
        elif stage == Stage.stage_seven.value and type_planting == TypePlanting.riego.value:
            start = DateStage.stage_seven_start_riego.value
            end = DateStage.stage_seven_end_riego.value 
        elif stage == Stage.stage_eight.value and type_planting == TypePlanting.riego.value:
            start = DateStage.stage_eight_start_riego.value
            end = DateStage.stage_eight_end_riego.value
        elif stage == Stage.stage_eight.value and type_planting == TypePlanting.secano.value:
            start = DateStage.stage_eight_start_secano.value
            end = DateStage.stage_eight_end_secano.value
        elif stage == Stage.stage_nine.value and type_planting == TypePlanting.riego.value:
            start = DateStage.stage_nine_start_riego.value
            end = DateStage.stage_nine_end_riego.value
        elif stage == Stage.stage_nine.value and type_planting == TypePlanting.secano.value:
            start = DateStage.stage_nine_start_secano.value
            end = DateStage.stage_nine_end_secano.value
        elif stage == Stage.stage_ten.value and type_planting == TypePlanting.riego.value:
            start = DateStage.stage_ten_start_riego.value
            end = DateStage.stage_ten_end_riego.value
        elif stage == Stage.stage_ten.value and type_planting == TypePlanting.secano.value:
            start = DateStage.stage_ten_start_secano.value
            end = DateStage.stage_ten_end_secano.value 
        elif stage == Stage.stage_eleven.value and type_planting == TypePlanting.riego.value:
            start = DateStage.stage_eleven_start_riego.value
            end = DateStage.stage_eleven_end_riego.value
        elif stage == Stage.stage_eleven.value and type_planting == TypePlanting.secano.value:
            start = DateStage.stage_eleven_start_secano.value
            end = DateStage.stage_eleven_end_secano.value  
        elif stage == Stage.stage_twelve.value and type_planting == TypePlanting.riego.value:
            start = DateStage.stage_twelve_start_riego.value
            end = DateStage.stage_twelve_end_riego.value
        elif stage == Stage.stage_twelve.value and type_planting == TypePlanting.secano.value:
            start = DateStage.stage_twelve_start_secano.value
            end = DateStage.stage_twelve_end_secano.value 
        elif stage == Stage.stage_thirteen.value and type_planting == TypePlanting.riego.value:
            start = DateStage.stage_thirteen_start_riego.value
            end = DateStage.stage_thirteen_end_riego.value
        elif stage == Stage.stage_thirteen.value and type_planting == TypePlanting.secano.value:
            start = DateStage.stage_thirteen_start_secano.value
            end = DateStage.stage_thirteen_end_secano.value 
        elif stage == Stage.stage_fourteen.value and type_planting == TypePlanting.riego.value:
            start = DateStage.stage_fourteen_start_riego.value
            end = DateStage.stage_fourteen_end_riego.value
        elif stage == Stage.stage_fourteen.value and type_planting == TypePlanting.secano.value:
            start = DateStage.stage_fourteen_start_secano.value
            end = DateStage.stage_fourteen_end_secano.value 
        elif stage == Stage.stage_fifteen.value:
            start = DateStage.stage_fifteen_start.value
            end = DateStage.stage_fifteen_end.value      
        return (start, end)

    def calulate_stage(self, stage):
        stage_result = 0
        if stage == Stage.stage_two.value or stage == Stage.stage_four.value:
           stage_result = Stage.stage_one.value
        elif stage == Stage.stage_three.value:
           stage_result = Stage.stage_two.value 
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
    
    def validation_system(self, stage, email, land_id, data):
        result = ''
        if stage == Stage.stage_two.value and len(data)>0:
           result = GeneralsUtils.try_parse_date_time(data['sowing_date'])
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
            stage_db = {}         
            stage_db['crop_complete'] = True
            self.__repository_property_stage_update.update(land_id,stage_db) 
