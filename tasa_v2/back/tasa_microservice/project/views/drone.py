import connexion
from project.resources.utils.generals_utils import GeneralsUtils
from project.services.drone_serivce import DroneService

def get_drone(id):
    results = {
            "data": [],
            "details": []
        }
    try:
        results['data'] = DroneService().get_drone(id)
    except Exception as exception:
        results['details'].append(exception.args[0])
    return results

def get_drones():
    results = {
            "data": [],
            "details": []
        }
    try:
        results['data'] = DroneService().get_drones()
    except Exception as exception:
        results['details'].append(exception.args[0])
    return results

def post_drone():
    request_data = GeneralsUtils.get_request_body(connexion.request)    
    results = {
            "data": [],
            "details": []
        }
    try:
        results = DroneService().post_drone(request_data)
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results

def put_drone(id):
    request_data = GeneralsUtils.get_request_body(connexion.request)    
    results = {
            "data": [],
            "details": []
        }
    try:
        results['data'] = DroneService().put_drone(id, request_data)
    except Exception as exception:
        results['details'].append(exception.args[0])
    return results

def delete_dron(id):
    results = {
            "data": [],
            "details": []
        }
    try:
        DroneService().delete_drone(id)
        results['data'] = "Dron eliminado correctamente"
    except Exception as exception:
        results['details'].append(exception.args[0])
    return results