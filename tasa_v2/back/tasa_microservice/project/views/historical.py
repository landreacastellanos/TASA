from project.services.historical_service import HistoricalService

def get_historical_land(id):
    try:
        result = HistoricalService().get_historical_land(id)
    except Exception as exception:
        result = exception.args[0]
        return result
    return result

def get_historical(id):
    try:
        result = HistoricalService().get_historical(id)
    except Exception as exception:
        result = exception.args[0]
        return result
    return result
