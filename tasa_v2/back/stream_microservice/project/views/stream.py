from project.services.stream_service import NotificationService

def get_notification():
    try:
        result = NotificationService().get_notification()
    except Exception as exception:
        result = exception.args[0]
        return result
    return result
