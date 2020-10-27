from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken
from project.resources.utils.encryption_utils import Encryption

class RoleService():

    def __init__(self):
        self.__repository_roles = CommonRepository(
         entity_name="roles")

    def get_roles(self):
        """
        Method for get roles user
        """
        a = Encryption().encrypt_value("123")
        b = Encryption().decrypt_value(a.decode("utf-8"))
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
        result['data'].append(
            {
                "role": self.__repository_roles.select(),
                "token": validationToken[1]
            }
        )
        return result
