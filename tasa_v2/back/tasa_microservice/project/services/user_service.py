import datetime
from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.encryption_utils import Encryption
from project.resources.utils.security_token import SecurityToken
from project.models.enum.keys_enum import Keys

class UserService():
    USER_ACTIVE = True

    def __init__(self):
        self.__repository_user = CommonRepository(
         entity_name="createUser")

    def create_user(self, data):
        result = {
            "data": [],
            "details": []
        }

        validationToken = SecurityToken().validate_token() 
        if not validationToken[0] or not SecurityToken().verify_exist_token():
            result['details'].append(
                {
                    "key": 400,
                    "value": "Token Invalido"
                }
            )
            return result
        data_validation = self.validation_data(data, validationToken[2])

        if len(data_validation['details'])>0:
            return data_validation
        data = self.complete_data(data)
        try:
            data = self.__repository_user.insert(data)
        except Exception as ex:
            result['details'].append(
                {
                    "key": 400,
                    "value": "Error creando usuario "+ ex
                }
            )
            return result

        result['data'].append(
            {   
                "token": validationToken[1]
            }
        )
        
        if data:
           result['details'].append(
                {
                    "key": 200,
                    "value": "Usuario Creado"
                }
            )
        else:
            result['details'].append(
                {
                    "key": 400,
                    "value": "Usuario no creado "
                }
            )
    
        SecurityToken().add_token(validationToken[3], validationToken[1])
        return result 
    
    def validation_user(self):
        result = {
            "data": [],
            "details": []
        }
        validationToken = SecurityToken().validate_token() 
        if not validationToken[0] or not SecurityToken().verify_exist_token():
            result['data'].append(
                {
                    "authenticator": False
                }
            )
        else:
            result['data'].append(
                {
                    "authenticator": True
                }
            )
        return result

    def complete_data(self, data):
        data['active'] = self.USER_ACTIVE
        data['created_date'] = datetime.datetime.now().__str__()
        data['password'] = Encryption().encrypt_value(data['password']).decode("utf-8")
        data['email'] = data['email'].lower() 
        return data

    def verify_data(self, data):
        data = self.__repository_user.select(
            options={"filters":
                             [['email', "equals", data]]
                             }) 
        return (True, data) if len(data) > 0 else (False, data)

    def validation_data(self, data, user):
        result = {
            "data": [],
            "details": []
        }
        
        role = self.verify_data(user)[1][0]['role_id']\
            if len(self.verify_data(user)[1]) > 0 else 0

        if not self.verify_data(user)[0] or role != Keys.admi.value:
            result['details'].append(
                {
                    "key": 401,
                    "value": "El usuario no tiene permisos"
                }
            )
        elif self.verify_data(data['email'])[0]:
            result['details'].append(
                {
                    "key": 400,
                    "value": "Este correo se encuentra en uso"
                }
            )
        return result
    
    def close_session(self):
        result = {
            "data": [],
            "details": []
        }

        validationToken = SecurityToken().finish_token() 
        if validationToken:
            result['details'].append(
                {
                    "key": 200,
                    "value": True
                }
            )
        else:
           result['details'].append(
                {
                    "key": 400,
                    "value": False
                }
            )
        return result