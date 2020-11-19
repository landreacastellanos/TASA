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