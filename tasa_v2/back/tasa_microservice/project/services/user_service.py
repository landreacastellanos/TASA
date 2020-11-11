import datetime
from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.encryption_utils import Encryption
from project.resources.utils.security_token import SecurityToken
from project.models.enum.keys_enum import Keys

class UserService():
    USER_ACTIVE = True
    TOKEN_ERROR = "Token invalido"
    def __init__(self):
        self.__repository_user = CommonRepository(
         entity_name="createUser")

    def create_user(self, data):
        result = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            result['details'].append(
                {
                    "key": 400,
                    "value": self.TOKEN_ERROR
                }
            )
            return result
        data_validation = self.validation_data(validation_token[2])
        data_email = self.validation_email(data)

        if len(data_validation['details'])>0:
            return data_validation

        if len(data_email['details'])>0:
            return data_email

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
        
        if data:
           result['data'].append(
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
        return result
    
    def get_user(self):
        result = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            result['details'].append(
                {
                    "key": 400,
                    "value": self.TOKEN_ERROR
                }
            )
            return result
        
        data = self.__repository_user.select(entity_name="Users")

        result['data'] = data
        return result

    def update_user(self, data):
        result = {
            "data": [],
            "details": []
        }

        if 'id' not in data:
            result['details'].append(
                {
                    "key": 400,
                    "value": "id requerido"
                }
            )
            return result

        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            result['details'].append(
                {
                    "key": 400,
                    "value": self.TOKEN_ERROR
                }
            )
            return result
        data_validation = self.validation_data(validation_token[2])
        data_email = self.validation_email_update(data)

        if len(data_validation['details'])>0:
            return data_validation

        if len(data_email['details'])>0:
            return data_email

        data = self.complete_data(data)
        try:
            data = self.__repository_user.update(data['id'], data)
        except Exception as ex:
            result['details'].append(
                {
                    "key": 400,
                    "value": "Error modificando usuario "+ ex
                }
            )
            return result
        
        if data:
           result['data'].append(
                {
                    "key": 200,
                    "value": "Usuario Modificado"
                }
            )
        else:
            result['details'].append(
                {
                    "key": 400,
                    "value": "Usuario no modificado"
                }
            )
        return result

    def get_info_user(self, id):
        result = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            result['details'].append(
                {
                    "key": 400,
                    "value": self.TOKEN_ERROR
                }
            )
            return result
        
        data = self.__repository_user.select(entity_name="Users", options={"filters":
                             [['id', "equals", id]]
                             }) 
        result['data'] = data
        return result

    def delete_user(self, id):
        result = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or not SecurityToken().verify_exist_token():
            result['details'].append(
                {
                    "key": 400,
                    "value": self.TOKEN_ERROR
                }
            )
            return result
        data_validation = self.validation_data(validation_token[2])

        if len(data_validation['details'])>0:
            return data_validation
        try:
            data = self.__repository_user.delete(id)
        except Exception as ex:
            result['details'].append(
                {
                    "key": 400,
                    "value": "Error eliminado usuario "
                }
            )
            return result
        
        if data:
           result['data'].append(
                {
                    "key": 200,
                    "value": "Usuario eliminado"
                }
            )
        else:
            result['details'].append(
                {
                    "key": 400,
                    "value": "Usuario no eliminado"
                }
            )
        return result

    #region ValidationData
    def complete_data(self, data):
        data['active'] = self.USER_ACTIVE
        data['created_date'] = datetime.datetime.now().__str__()
        if 'password' in data:
            data['password'] = Encryption().encrypt_value(data['password']).decode("utf-8")
        if 'email' in data:
            data['email'] = data['email'].lower() 
        return data

    def verify_data(self, data):
        data = self.__repository_user.select(
            options={"filters":
                             [['email', "equals", data]]
                             }) 
        return (True, data) if len(data) > 0 else (False, data)

    def validation_data(self, user):
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
        return result
    
    def validation_email(self, data):
        result = {
            "data": [],
            "details": []
        }

        if self.verify_data(data['email'])[0]:
            result['details'].append(
                {
                    "key": 400,
                    "value": "Este correo se encuentra en uso"
                }
            )

        return result

    def validation_email_update(self, data):
        result = {
            "data": [],
            "details": []
        }
        if 'email' in data:
            result_data = self.verify_data(data['email'])
            if result_data[0] and result_data[0]['id'] != data['id']:
                result['details'].append(
                    {
                        "key": 400,
                        "value": "Este correo se encuentra en uso"
                    }
                )

        return result    
    #endregion