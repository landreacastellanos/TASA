from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken
from project.resources.utils.encryption_utils import Encryption

class RoleService():

    def __init__(self):
        self.__repository_roles = CommonRepository(
         entity_name="roles")

        self.__repository_user = CommonRepository(
         entity_name="Createuser") 

    def get_roles(self):
        """
        Method for get roles user
        """
        result = {
            "data": [],
            "details": []
        }

        validationToken = SecurityToken().validate_token()
        data_validation = self.validation_data(validationToken)
   
        if len(data_validation['details'])>0:
            return data_validation
           
        result['data'].append(
            {
                "role": self.__repository_roles.select(),
                "token": validationToken[1]
            }
        )
        return result

    def verify_data(self, data):
        data = self.__repository_user.select(
            options={"filters":
                             [['email', "equals", data]]
                             }) 
        return True if len(data) > 0 else False

    def validation_data(self, validationToken):
        result = {
            "data": [],
            "details": []
        }
        
        if not validationToken[0] :
            result['details'].append(
                {
                    "key": validationToken[1],
                    "value": "Token Experied"
                }
            )
        elif not self.verify_data(validationToken[2]):
            result['details'].append(
                {
                    "key": 400,
                    "value": "El usuario no tiene permisos"
                }
            )
        
        
        return result