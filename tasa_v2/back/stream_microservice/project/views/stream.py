from project.services.stream_service import RoleService

def get_roles():
    try:
        result = RoleService().get_roles()
    except Exception as exception:
        result = exception.args[0]
        return result
    return result
