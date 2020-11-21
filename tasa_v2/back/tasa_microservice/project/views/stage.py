import connexion

from project.services.stage_service import StageServices


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
    con = connexion.request
    results = {
            "data": [],
            "details": []
        }
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