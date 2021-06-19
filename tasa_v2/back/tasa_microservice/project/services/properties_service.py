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

        self.__repository_notification = CommonRepository(
         entity_name="notification")
        self.__repository_historical = CommonRepository(
         entity_name="historical")
        self.__repository_calendar = CommonRepository(
         entity_name="calendar")
        self.__repository_procedure = CommonRepository(
         entity_name="propertyProcedure") 


    def get_planting_type(self):       
        data = self.__repository_planting.select_all()          

        return data
    
    def verify_data(self, data):
        data = self.__repository_user.select(
            options={"filters":
                             [['email', "equals", data]]
                             }) 
        return (True, data[0]) if len(data) > 0 else (False, data)

    def get_users(self): 
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
            data_validation = self.__repository_properties.select(
                options={"filters":
                             [['business_name', "equals", str(data['business_name'])]]
                             })

            if len(data_validation)>0:
                raise Exception("Razon social duplicada.")
            
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
        planting_type = self.__repository_planting.select_all()

        select_options = {}
        select_options["order_by"] =\
                {"column_name": 'name',
                 "desc": False}
                 
        plant = []

        validation_token = SecurityToken().validate_token()
        
        role = self.verify_data(validation_token[2])

        if role[0] and role[1]['role_id'] != Keys.admi.value:
            user = self.__repository_user.select(entity_name="user", options={ "filters":
                [["email",
                "equals",
                validation_token[2]]
                ]
            })[0] 
            select_options['filters'] = [
                 ["manager", "equals", user['id']],
                 "or",
                 ["property_owner", "equals", user['id']],
                 "or",
                 ["purchasing_manager", "equals", user['id']],
                 "or",
                 ["pay_manager", "equals", user['id']],
                 "or",
                 ["responsible_purchasing", "equals", user['id']],
                 "or",
                 ["decision_influencer", "equals", user['id']],
                 "or",
                 ["parthner_add", "equals", user['id']],
                 "or",
                 ["seller", "equals", user['id']]
                ]            
        
        plant = self.__repository_properties.select(entity_name="properties", options=select_options)    

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
        try:                
            for item in lands:
                historical = self.__repository_historical.select(options={"filters":
                                [['id_land', "equals", item['id']]]
                                })
                for item_h in historical:
                    self.__repository_historical.delete(item_h['id']) 
                results['details'].append("1")
                calendar = self.__repository_calendar.select(options={"filters":
                                    [['id_land', "equals", item['id']]]
                                    })
                for item_c in calendar:
                    self.__repository_calendar.delete(item_c['id'])
                results['details'].append("2")
                stages = self.__repository_procedure.select(options={"filters":
                                    [['landId', "equals", item['id']]]
                                    })
                for item in stages:
                    self.__repository_procedure.delete(item['id'])
                results['details'].append("3")
                self.__repository_land.delete(item['id'])
                results['details'].append("4")

            self.__repository_properties.delete(id)
            results['details'].append("11")

            results['data'].append({
                                    "key": 100,
                                    "value": "Finca eliminado"
                                    })            
        except Exception as exception:
            result = exception.args[0]
            results['details'].append(result)
        return results

    def update_property(self, data):

        results = {
            "data": [],
            "details": []
        }
        validation_token = SecurityToken().validate_token()
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

        try:
            data_validation = self.__repository_properties.select(
                options={"filters":
                             [['business_name', "equals", str(data['business_name'])]]
                             })
            data_before_upd = self.__repository_properties.select_one(data['id'])
            if len(data_validation)>0 and data_before_upd[0]['business_name'] != data['business_name']:
                raise Exception("Razon social duplicada.")

            self.__repository_properties.update(data['id'],property_data)

            for item in data['batchs']:
                batch = {
                    'land_name':item['name'],
                    'land_ha': float(item['hectares_number'])
                }
                if("id" in item):
                    if("delete" in item and item['delete'] == True):
                        self.delete_batch(item['id'])
                    else:
                        self.__repository_land.update(item['id'],batch)
                else:
                    batch['property_id']=data['id']
                    self.__repository_land.insert(batch)
        
            results['data'].append({
                                    "key": 200,
                                    "value": "Finca actualizada"
                                    })

        except Exception as exception:
            results['details'].append(
                {
                    "key": 500,
                    "value": "Error al registrar finca: "+str(exception)
                }
            )        
        return results
    
    def delete_batch(self, land_id):
        notifications = self.__repository_notification.select(options={"filters":
                            [['id_land', "equals", land_id]]
                            })
        for item in notifications:
            self.__repository_notification.delete(item['id'])    
        
        historical = self.__repository_historical.select(options={"filters":
                            [['id_land', "equals", land_id]]
                            })
        for item in historical:
            self.__repository_historical.delete(item['id']) 

        calendar = self.__repository_calendar.select(options={"filters":
                            [['id_land', "equals", land_id]]
                            })
        for item in calendar:
            self.__repository_calendar.delete(item['id'])

        stages = self.__repository_procedure.select(options={"filters":
                            [['landId', "equals", land_id]]
                            })
        for item in stages:
            self.__repository_procedure.delete(item['id'])
   
        self.__repository_land.delete(land_id)