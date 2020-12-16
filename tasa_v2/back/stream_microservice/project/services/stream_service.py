from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken
from project.resources.utils.encryption_utils import Encryption

class RoleService():

    def __init__(self):
        self.__repository_roles = CommonRepository(
         entity_name="roles")
    
        self.__repository_user = CommonRepository(
         entity_name="createUser") 

    def get_roles(self):
        """
        Method for get roles user
        """
        result = {
            "data": [],
            "details": []
        }

        validation_token = SecurityToken().validate_token()
        data_validation = self.validation_data(validation_token)
   
        if len(data_validation['details'])>0 :
            return data_validation
           
        result['data'].append(
            {
                "role": self.__repository_roles.select()
            }
        )
        return result

    def verify_data(self, data):
        data = self.__repository_user.select(
            options={"filters":
                             [['email', "equals", data]]
                             }) 
        return True if len(data) > 0 else False

    def validation_data(self, validation_token):
        result = {
            "data": [],
            "details": []
        }
        
        if not self.verify_data(validation_token[2]):
            result['details'].append(
                {
                    "key": 400,
                    "value": "El usuario no tiene permisos"
                }
            )
        
        return result