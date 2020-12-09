import connexion

from project.services.stage_service import StageServices
from project.resources.utils.generals_utils import GeneralsUtils


def get_property_land(land_id, property_id):
    results = {
            "data": [],
            "details": []
        }
    try:        
        result = StageServices().get_property_land(property_id, land_id)
        results = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results

def get_stage_one(land_id):
    results = {
            "data": [],
            "details": []
        }
    try:        
        result = StageServices().get_stage_one(land_id)
        results = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results

def set_stage_one():
    request_data = GeneralsUtils.get_request_body(connexion.request)    
    try:        
        result = StageServices().set_stage_one(request_data)
        results = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results

def upload_file():
    files = connexion.request.files
    results = {
            "data": [],
            "details": []
        }

    try:        
        result = StageServices().upload_file(files)
        results = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)

    return results

def calendar_stage(id_lote):
    results = {
            "data": [],
            "details": []
        }
    try:        
        result = StageServices().calendar_stage(id_lote)
        results = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results

def set_stage():
    request_data = GeneralsUtils.get_request_body(connexion.request)    
    try:        
        result = StageServices().set_stage(request_data)
        results = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results

def get_stage(land_id, stage_number):
    results = {
            "data": [],
            "details": []
        }
    try:        
        result = StageServices().get_stage(land_id, stage_number)
        results = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
    return results