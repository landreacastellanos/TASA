import json
from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken    
from project.resources.utils.encryption_utils import Encryption

class LoginService:
    def __init__(self):
        self.__repository_roles = CommonRepository(
         entity_name="user")

    def login(self, data):
        results = {
            "data": [],
            "details": []
        }

        result = self.__repository_roles.select(
            options={"filters":
                             [['email', "equals", data['user'].lower()]]
                             })
        if not self.validation_login(result, data['password']):
            results['details'].append(
                {
                    "key": 400,
                    "value": "Usuario o contraseña incorrectos"
                }
            )
            return results

        results['data'] = list(map(lambda x: {
                "nombre": x['name'] +" " + x['last_name'],
                "role": x['role_id'],
                "token": SecurityToken.get_token(data['user'])},
                result))
        return results


    def validation_login(self, data, password):
        value = True
        
        if len(data)==0:
            return False
        password_validation = Encryption().decrypt_value(data[0]['password']).decode("utf-8")
        if password_validation != password:
            return False
        return value        
