import json
from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken    
from project.resources.utils.encryption_utils import Encryption
from project.resources.utils.mail_utils import MailUtils

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
        
        if len(data) ==0:
            value = False
        password_validation = Encryption().decrypt_value(data[0]['password']).decode("utf-8")
        if password_validation != password:
            value = False
        return value        

    def restore_password(self, data):
        results = {
                "data": [],
                "details": []
            }       

        result = self.__repository_roles.select(
            options={"filters":
                             [['email', "equals", data['user'].lower()]]
                             })        
        
        if(len(result) > 0):
            token = SecurityToken.get_token(data['user'])
            url = '{}?mail={}&token={}'.format(data['restore_form'],data['user'],token)
            body = "Hola,\nEste es el link para generar una nueva contraseña:\n{}".format(url)                     
            MailUtils().send_email("Reestablecer contraseña",[data['user']],body)
        else:
            results['details'].append(
                {
                    "key": 400,
                    "value": "Usuario no existe"
                }
            )
        return results

    def reset_password(self, data):
        validation_token = SecurityToken().validate_token() 
        result = {
            "data": [],
            "details": []
        }   

        if not validation_token[0]:
            result['details'].append(
                {
                    "key": validation_token[1],
                    "value": "Token invalido"
                }
            )
            return result
        
        password = Encryption().encrypt_value(data['password']).decode("utf-8")

        data_update_keys = {
                    "email": data['user']
                }
        values = { 'password': password }

        self.__repository_roles.update_compound_key(data_update_keys,values)

        result['data'].append('Contraseña actualizada.')
        
        return result