import json
from project.infrastructure.repositories.common_repository\
    import CommonRepository
from flask import send_from_directory, current_app, request
from datetime import datetime, timedelta
import dateutil.parser

class HistoricalService:
    def __init__(self):
        self.__repository_historical = CommonRepository(
         entity_name="historical")
        self.__repository_procedure = CommonRepository(
         entity_name="property_stage")
        self.__repository_land = CommonRepository(
         entity_name="land")
        self.__repository_stage = CommonRepository(
         entity_name="stage")
        self.__repository_properties = CommonRepository(
         entity_name="properties")
        self.__repository_drones = CommonRepository(
         entity_name="drone")


    def get_historical_land(self, id):
        result = {
            "data": []
        }
        historical = self.__repository_historical.select(entity_name="historical", options={"filters":
                             [
                             ['id_land', "equals", id]]
                             }) 

        result['data'] =  list(map(lambda x: {"id": x['id'], "title": json.loads(x['data'])['title']}, historical))

        return result

    def get_historical(self, id):
        result = {
            "data": []
        }
        historical = self.__repository_historical.select(entity_name="historical", options={"filters":
                             [
                             ['id', "equals", id]]
                             }) 

        result['data'] =  list(map(lambda x: json.loads(x['data']), historical))

        return result
    
    def export_dron_report(self, year):
        applications = self.__repository_procedure.select(entity_name="property_stage")
        response = []
        for item in applications:
            
            data = json.loads(item['data'])
            
            if("application_date" in data 
               and item['air_application'] is not None
               and dateutil.parser.parse(data['application_date']).year == year):
                air_application = json.loads(item['air_application'])
                current_element = list(filter(lambda x: x['batch_id'] == item['land_id'] and x['stage_id'] == item['stage_id'], response))
                drone = self.__repository_drones.select_one(int(air_application['drone']))[0]
                if len(current_element) == 0:
                    response_data = {}
                    land = self.__repository_land.select_one(int(item['land_id']))[0]
                    property = self.__repository_properties.select_one(int(land["property_id"]))[0]
                    stage = self.__repository_stage.select_one(int(item['stage_id']))[0]
                    response_data['batch'] = land['land_name']
                    response_data['batch_id'] = land['id']
                    response_data['property'] = property['name']
                    response_data['stage'] = stage['stage']
                    response_data['stage_id'] = stage['id']
                    response_data['date'] = data['application_date']
                    response_data['drones'] = [{'dron': drone['name'],
                                                'id': drone['id'],
                                                'dead': str(datetime.strptime(air_application['deadTime'], '%H:%M').time()),
                                                'live': str(datetime.strptime(air_application['liveTime'], '%H:%M').time()),
                                                'ha': int(air_application['dropSize'])}]
                    response.append(response_data)
                else:
                    dron = list(filter(lambda x: x['id'] == air_application['drone'], current_element[0]['drones']))
                    if not dron:
                        current_element[0]['drones'].append(
                                                {'dron': drone['name'],
                                                'id': drone['id'],
                                                'dead': str(datetime.strptime(air_application['deadTime'], '%H:%M').time()),
                                                'live': str(datetime.strptime(air_application['liveTime'], '%H:%M').time()),
                                                'ha': int(air_application['dropSize'])})
                    else:
                        dron[0]['ha'] += int(air_application['dropSize'])
                        live = datetime.strptime(dron[0]['live'], '%H:%M:%S') 
                        dead = datetime.strptime(dron[0]['dead'], '%H:%M:%S') 
                        dron[0]['dead'] = str((datetime.strptime(air_application['deadTime'], '%H:%M') + timedelta(hours=dead.hour, minutes=dead.minute)).time())
                        dron[0]['live'] = str((datetime.strptime(air_application['liveTime'], '%H:%M') + timedelta(hours=live.hour, minutes=live.minute)).time())
        
        return {'report': response,
                'total': {}}