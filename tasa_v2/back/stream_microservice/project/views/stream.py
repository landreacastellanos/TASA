import connexion
from project.resources.utils.generals_utils import GeneralsUtils
from project.services.stream_service import NotificationService

def get_notification():
    try:
        result = NotificationService().get_notification()
    except Exception as exception:
        result = exception.args[0]
        return result
    return result

def delete_notification(type,id = None ):
    try:
        result = NotificationService().delete_notification(type, id)
    except Exception as exception:
        result = exception.args[0]
        return result
    return result

def get_chat_message(land_id):
    try:
        result = NotificationService().get_chat_message(land_id)
    except Exception as exception:
        result = exception.args[0]
        return result
    return result

def set_chat_message():
    request_data = GeneralsUtils.get_request_body(connexion.request)
    try:
        result = NotificationService().set_chat_message(request_data)
    except Exception as exception:
        result = exception.args[0]
        return result
    return result