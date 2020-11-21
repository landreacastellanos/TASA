import json
from project.models.enum.stage_enum import Stage
from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken   


class StageServices:
    TOKEN_INVALID = "Token invalido"
    def __init__(self):
        self.__repository_properties = CommonRepository(
         entity_name="properties")
        self.__repository_land = CommonRepository(
         entity_name="land")
        self.__repository_property_stage = CommonRepository(
         entity_name="property_stage")
        self.__repository_stage = CommonRepository(
         entity_name="stage")
        self.__repository_procedure = CommonRepository(
         entity_name="propertyProcedure") 

    def get_property_land(self, id, land):

        results = {
            "data": [],
            "details": []
        }
        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            results['details'].append({
                    "key": 400,
                    "value": TOKEN_INVALID
                })
            return results

        lands = self.__repository_land.select(entity_name="land", options={"filters":
                             [['property_id', "equals", id],
                             "and",
                             [['id', "equals", land]]]
                             })
        property = self.__repository_properties.select_one(int(id), entity_name="properties")
        property = property[0]
        lands = lands[0]
        batchs = { 
                    "id": lands['id'],
                    "name": lands['land_name'],
                    "hectares_number": lands['land_ha']
               } 

        property['batchs'] = batchs

        property["direction"] = property.pop("address")
        property["web_page"] = property.pop("web_site")
        property["hectares_total"] = property.pop("total")
        
        results["data"].append(property)
        return results

    def get_stage_one(self, land_id):
        stage_number = Stage.stage_one.value
        results = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            results['details'].append({
                    "key": 400,
                    "value": TOKEN_INVALID
                })
            return results

        land = self.__repository_land.select_one(land_id)
        property_field = self.__repository_properties.select_one(land[0]['property_id'])
        sowing_system = property_field[0]['sowing_system']

        stage = self.__repository_stage.select(entity_name="stage", options={"filters":
                             [['type_planting', "equals", sowing_system],
                             "and",
                             ['stage_number', "equals", stage_number]]
                             })

        stage_id = stage[0]['id']

        property_stage = self.__repository_property_stage.select(entity_name="property_stage", options={"filters":
                             [['stage_id', "equals", stage_id],
                             "and",
                             ['land_id', "equals", land_id],
                             "and",
                             ["crop_complete","equals",False]]
                             })
                        
        

        if(len(property_stage) == 0):
            results['data'].append(
                  {
                    "real_date": "",
                    "sowing_date": "",
                    "type_sowing": "",
                    "variety": ""
                }
            )
        else:
            property_stage = property_stage[0]
            results['data'].append(json.loads(property_stage['data']))

        return results
    
    def calendar_stage(self, id_lote):
        results = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            results['details'].append({
                    "key": 400,
                    "value": TOKEN_INVALID
                })
            return results

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
        {
            "id_stage": data['id'],
			"stage_number": data['stageNumber'],
			"stage_name": data['stage'],
			"complete": True
        }
        if x['stageId'] == data['id'] and
        (not x['stageComplete'])
        else
        {
            "id_stage": data['id'],
			"stage_number": data['stageNumber'],
			"stage_name": data['stage'],
			"complete": False
        }, stages))

        return result[0]        