from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken   

class PropertiesServices:

    def __init__(self):
        self.__repository_planting = CommonRepository(
         entity_name="type_planting")
        self.__repository_user = CommonRepository(
         entity_name="user")


    def get_planting_type(self):
        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            return {
                    "key": 400,
                    "value": "Token Invalido"
                }        
        data = self.__repository_planting.select_all()          

        return data

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