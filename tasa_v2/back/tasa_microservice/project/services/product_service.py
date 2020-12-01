from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken 

class ProductServices:
    TOKEN_INVALID = "Token Invalido"
    def __init__(self):
        self.__repository_properties = CommonRepository(
         entity_name="properties")
        self.__repository_land = CommonRepository(
         entity_name="land")
        self.__repository_stage = CommonRepository(
         entity_name="stage")
        self.__repository_product = CommonRepository(
         entity_name="product") 


    def get_product(self, id_land, id_stage):
        results = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            results['details'].append({
                    "key": 400,
                    "value": self.TOKEN_INVALID
                })
            return results

        land = self.__repository_land.select(
            options={"filters":
                             [['id', "equals", id_land]]
                             })
        if len(land)>0:
            properties = self.__repository_properties.select(
                options={"filters":
                                [['id', "equals", land[0]['property_id']]]
                        })
            if len(properties)>0:
                stage = self.__repository_stage.select(
                    options={"filters":
                                    [['stageNumber', "equals", id_stage],
                                    "and",
                                    ['typePlanning', "equals", properties[0]['sowing_system']]]
                            })
                results['data'].append(self.transform_product(self.__repository_product.select(
                            options={"filters":
                                            [['stage_id', "equals", stage[0]['id']],
                                            "and",
                                            ['type_planting_id', "equals", properties[0]['sowing_system']]]
                                    })))
                
        return results

    def transform_product(self, data):
        for dictionary in data:
            del dictionary['stage_id']
            del dictionary['type_planting_id']
        return data
