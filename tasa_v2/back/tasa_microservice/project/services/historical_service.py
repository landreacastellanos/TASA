import json
from project.infrastructure.repositories.common_repository\
    import CommonRepository

class HistoricalService:
    def __init__(self):
        self.__repository_historical = CommonRepository(
         entity_name="historical")


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