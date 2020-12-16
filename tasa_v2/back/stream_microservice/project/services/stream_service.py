from project.infrastructure.repositories.common_repository\
    import CommonRepository
from project.resources.utils.security_token import SecurityToken
from project.resources.utils.encryption_utils import Encryption

class NotificationService():

    def __init__(self):
        self.__repository_notification = CommonRepository(
         entity_name="notification")

    def get_notification(self):
        data = self.__repository_notification.select_all()
        return data