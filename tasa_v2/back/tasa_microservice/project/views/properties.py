import connexion
from project.resources.utils.generals_utils import GeneralsUtils
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

def create_property():
    request_data = GeneralsUtils.get_request_body(connexion.request)
    results = {
            "data": [],
            "details": []
        }
    try:        
        result = PropertiesServices().create_properties(request_data)
        results = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results

def get_properties():
    results = {
            "data": [],
            "details": []
        }
    try:        
        result = PropertiesServices().get_properties()
        results['data'] = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results

def get_property(id):
    results = {
            "data": [],
            "details": []
        }
    try:        
        result = PropertiesServices().get_property(id)
        results = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results

def delete_property(id):
    results = {
            "data": [],
            "details": []
        }
    try:        
        result = PropertiesServices().delete_property(id)
        results = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results

def update_property():
    request_data = GeneralsUtils.get_request_body(connexion.request)
    try:        
        result = PropertiesServices().update_property(request_data)
        results = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results