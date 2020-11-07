from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken   
from project.models.enum.keys_enum import Keys
from datetime import datetime

class PropertiesServices:

    def __init__(self):
        self.__repository_planting = CommonRepository(
         entity_name="type_planting")
        self.__repository_user = CommonRepository(
         entity_name="user")
        self.__repository_properties = CommonRepository(
         entity_name="properties")
        self.__repository_land = CommonRepository(
         entity_name="land")


    def get_planting_type(self):
        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            return {
                    "key": 400,
                    "value": "Token Invalido"
                }        
        data = self.__repository_planting.select_all()          

        return data
    
    def verify_data(self, data):
        data = self.__repository_user.select(
            options={"filters":
                             [['email', "equals", data]]
                             }) 
        return (True, data[0]) if len(data) > 0 else (False, data)

    def get_users(self):
        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            return {
                    "key": 400,
                    "value": "Token Invalido"
                }   

        data = self.__repository_user.select_all()
        data = list(map(lambda  x:{ 
                                "id": x['id'],
                                "name": x['name']+' '+x['last_name'],
                                "rol": x['role_id'] 
                            } ,data))
        return data

    def create_properties(self, data):
        results = {
            "data": [],
            "details": []
        }
        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            results['details'].append({
                    "key": 400,
                    "value": "Token Invalido"
                })
            return results
        
        role = self.verify_data(validation_token[2])

        if role[0] and role[1]['role_id'] != Keys.admi.value:
            results['details'].append(
                {
                    "key": 401,
                    "value": "El usuario no tiene permisos"
                }
            )
            return results
        
        property_data={
            "name":str(data['name']),
            "business_name":str(data['business_name']),
            "phone":float(data['phone']),
            "address":str(data['direction']),
            "web_site":str(data['web_page']),
            "sowing_system":int(data['sowing_system']),
            "manager":int(data['manager']),
            "property_owner":int(data['property_owner']),
            "purchasing_manager":int(data['purchasing_manager']),
            "pay_manager":int(data['pay_manager']),
            "responsible_purchasing":int(data['responsible_purchasing']),
            "decision_influencer":int(data['decision_influencer']),
            "parthner_add":int(data['parthner_add']),
            "seller":int(data['seller']),
            "created_date": datetime.now()
        }

        try:
            propery = self.__repository_properties.insert(property_data)

            land = list(map(lambda  x:{ 
                                "property_id": propery[1],
                                "land_name": str(x['name']),
                                "land_ha": float(x['hectares_number']) 
                            } ,data['batchs']))
            self.__repository_land.insert(land)
            results['data'].append("Finca creada correctamente")
        except Exception as exception:
            results['details'].append(
                {
                    "key": 500,
                    "value": "Error al registrar finca: "+str(exception)
                }
            )
        
        return results
    