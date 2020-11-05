from project.services.properties_service import PropertiesServices

def get_type_planting():
    results = {
            "data": [],
            "details": []
        }
    try:
        result = PropertiesServices().get_planting_type()
        results['data'].append(result)
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results

def get_users():
    results = {
            "data": [],
            "details": []
        }
    try:
        result = PropertiesServices().get_users()
        results['data'].append(result)
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results