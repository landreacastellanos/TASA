from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.encryption_utils import Encryption
from project.resources.utils.security_token import SecurityToken
from project.models.enum.keys_enum import Keys

class UserService():

    def __init__(self):
        self.__repository_user = CommonRepository(
         entity_name="Createuser")

    def create_user(self, data):
        result = {
            "data": [],
            "details": []
        }

        validationToken = SecurityToken().validate_token() 
        if not validationToken[0]:
            result['details'].append(
                {
                    "key": validationToken[1],
                    "value": "Token Experied"
                }
            )
            return result
        data_validation = self.validation_data(data)

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
                    "key": 204,
                    "value": "Usuario no creado "
                }
            )
        return result 

    def complete_data(self, data):
        data['password'] = Encryption().encrypt_value(data['password']).decode("utf-8")
        data['email'] = data['email'].lower() 
        return data

    def verify_data(self, data):
        data = self.__repository_user.select(
            options={"filters":
                             [['email', "equals", data['email']]]
                             }) 
        return True if len(data) > 0 else False

    def validation_data(self, data):
        result = {
            "data": [],
            "details": []
        }

        if self.verify_data(data):
            result['details'].append(
                {
                    "key": 400,
                    "value": "Este correo se encuentra en uso"
                }
            )
        elif data['role_id'] != Keys.admi.value:
            result['details'].append(
                {
                    "key": 400,
                    "value": "El usuario no tiene permisos de creación"
                }
            )

        return result
