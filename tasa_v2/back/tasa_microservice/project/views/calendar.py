from project.services.calendar_service import CalendarService


def get_calendar():
    results = {
            "data": [],
            "details": []
        }
    try:
        result = CalendarService().get_calendar()
        results['data'] = result
    except Exception as exception:
        result = exception.args[0]
        results['details'].append(result)
        return results
    return results