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
            "sowing_system":int(data['sowing_system']),
            "property_owner":data['property_owner'],
            "seller":int(data['seller']),
            "total":data['hectares_total'],
            "created_date": datetime.now()
        }

        if("phone" in data):
            property_data['phone']=data['phone']

        if("direction" in data):
            property_data['address']=data['direction']
        
        if("web_page" in data):
            property_data['web_site']=data['web_page']

        if("purchasing_manager" in data):
            property_data['purchasing_manager']=data['purchasing_manager']
        
        if("pay_manager" in data):
            property_data['pay_manager']=data['pay_manager']

        if("responsible_purchasing" in data):
            property_data['responsible_purchasing']=data['responsible_purchasing']

        if("decision_influencer" in data):
            property_data['decision_influencer']=data['decision_influencer']
        
        if("parthner_add" in data):
            property_data['parthner_add']=data['parthner_add']
        
        if("manager" in data):
            property_data['manager']=data['manager']

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

    def get_properties(self):

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

        planting_type = self.__repository_planting.select_all()
        plant = self.__repository_properties.select_all()

        data = list(map(lambda  x:{ 
                                "id": x['id'],
                                "name": x['name'],
                                "business_name": x['business_name'],
                                "phone": x['phone'],
                                "type_planting": self.get_type_planting_name(planting_type,x['sowing_system'])['name']
                            } ,plant))        

        return data
    
    def get_type_planting_name(self,list,id):
        for item in list:
            if(item['id'] == id):
                return item

    def get_property(self, id):

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

        lands = self.__repository_land.select(entity_name="land", options={"filters":
                             [['property_id', "equals", id]]
                             })
        property = self.__repository_properties.select_one(int(id), entity_name="properties")
        property = property[0]

        batchs = list(map(lambda  x:{ 
                                "id": x['id'],
                                "name": x['land_name'],
                                "hectares_number": x['land_ha']
                            } ,lands))
        property['batchs'] = batchs

        property["direction"] = property.pop("address")
        property["web_page"] = property.pop("web_site")
        property["hectares_total"] = property.pop("total")
        
        results["data"].append(property)
        return results
     
    def delete_property(self, id):
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
        
        lands = self.__repository_land.select(entity_name="land", options={"filters":
                             [['property_id', "equals", id]]
                             })
        
        for item in lands:
            self.__repository_land.delete(item['id'])

        self.__repository_properties.delete(id)

        results['data'].append({
                                "key": 100,
                                "value": "Finca eliminado"
                                })
        return results

    def update_property(self, data):

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
            "sowing_system":int(data['sowing_system']),
            "total":data['hectares_total'],
            "property_owner":data['property_owner'],
            "seller":int(data['seller']),
            "created_date": datetime.now()
        }

        if("phone" in data):
            property_data['phone']=data['phone']

        if("direction" in data):
            property_data['address']=data['direction']
        
        if("web_page" in data):
            property_data['web_site']=data['web_page']

        if("purchasing_manager" in data):
            property_data['purchasing_manager']=data['purchasing_manager']
        
        if("pay_manager" in data):
            property_data['pay_manager']=data['pay_manager']

        if("responsible_purchasing" in data):
            property_data['responsible_purchasing']=data['responsible_purchasing']

        if("decision_influencer" in data):
            property_data['decision_influencer']=data['decision_influencer']
        
        if("parthner_add" in data):
            property_data['parthner_add']=data['parthner_add']
        
        if("manager" in data):
            property_data['manager']=data['manager']        

        self.__repository_properties.update(data['id'],property_data)

        for item in data['batchs']:
            batch = {
                'land_name':item['name'],
                'land_ha': float(item['hectares_number'])
            }
            if("id" in item):
                self.__repository_land.update(item['id'],batch)
            else:
                batch['property_id']=data['id']
                self.__repository_land.insert(batch)
        
        results['data'].append({
                                "key": 200,
                                "value": "Finca actualizada"
                                })
        return results