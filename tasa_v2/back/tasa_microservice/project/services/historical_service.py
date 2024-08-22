import json
import uuid

from fpdf import FPDF, HTMLMixin
from project.infrastructure.repositories.common_repository\
    import CommonRepository
from flask import send_from_directory, current_app, request
from datetime import datetime, timedelta
import dateutil.parser
from csv2pdf import convert
import pandas as pd
import pdfkit

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
                if air_application['drone'] is not None and air_application['drone'] != '':
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
                                                    'dead': str(datetime.strptime(air_application['deadTime'] if air_application['deadTime'] != '' else '00:00', '%H:%M').time()),
                                                    'live': str(datetime.strptime(air_application['liveTime'] if air_application['liveTime'] != '' else '00:00', '%H:%M').time()),
                                                    'ha': float(air_application['dropSize'])}]
                        response.append(response_data)
                    else:
                        dron = list(filter(lambda x: x['id'] == air_application['drone'], current_element[0]['drones']))
                        if not dron:
                            current_element[0]['drones'].append(
                                                    {'dron': drone['name'],
                                                    'id': drone['id'],
                                                    'dead': str(datetime.strptime(air_application['deadTime'] if air_application['deadTime'] != '' else '00:00', '%H:%M').time()),
                                                    'live': str(datetime.strptime(air_application['liveTime'] if air_application['liveTime'] != '' else '00:00', '%H:%M').time()),
                                                    'ha': float(air_application['dropSize'])})
                        else:
                            dron[0]['ha'] += float(air_application['dropSize'])
                            live = datetime.strptime(dron[0]['live'], '%H:%M:%S') 
                            dead = datetime.strptime(dron[0]['dead'], '%H:%M:%S') 
                            dron[0]['dead'] = str((datetime.strptime(air_application['deadTime'] if air_application['deadTime'] != '' else '00:00', '%H:%M') + timedelta(hours=dead.hour, minutes=dead.minute)).time())
                            dron[0]['live'] = str((datetime.strptime(air_application['liveTime'] if air_application['liveTime'] != '' else '00:00', '%H:%M') + timedelta(hours=live.hour, minutes=live.minute)).time())
        
        return {'report': response,
                'total': {}}
                    
    def export_dron_report_file(self, year):
        file_name = str(year)+str(uuid.uuid1())
        # adding a page
        report = self.export_dron_report(year)['report']
        df = pd.DataFrame({'Finca' : [], 'Lote': [], 'Segmento': [], 'Fecha': []})
        for item in report:
            data = {}            
            for item2 in item['drones']:
                drone = self.__repository_drones.select_one(int(item2['id']))[0]
                data['Hora muerto '+drone['name']] = item2['dead']
                data['Hora vivo '+drone['name']] = item2['live']
                data['HA '+drone['name']] = item2['ha']
            df = df._append({'Finca': item['property'],
                             'Lote': item['batch'],
                             'Segmento': item['stage'],
                             'Fecha': item['date'], 
                             **(data.copy())
                             }, ignore_index = True)
           
        df = df.fillna(0)

        html_table = df.to_html()
        pdfkit.from_string(html_table, 'project/images/'+file_name+'.pdf')

        return send_from_directory('images', file_name+'.pdf')

