# encoding: utf-8
import json

from datetime import datetime
from flask import g, request
from flask_cors import CORS
from flask_script import Manager

from datetime import datetime
from flask import g, request, Response
from flask_script import Manager

from project.app import create_app
from project.models.models import ResponseWrapper
from project.resources.utils.data_utils import DataUtils
from project.configuration_manager import ConfigurationManger
from project.resources.utils.registry_utils import RegistryUtils

app = create_app()

@app.before_request
def before_request_function():
    g.dateTimeStart = datetime.utcnow()

    g.endpoint = request.endpoint

@app.after_request
def after_request_function(response):
    print(datetime.utcnow() - g.dateTimeStart)
    # T
    excluded_paths = ("swagger",)
    response_data_origin = None
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers['Access-Control-Allow-Headers'] = "*"
    response.headers['Access-Control-Allow-Methods'] = "*"

    try:
        app_version = ConfigurationManger.get_config("APP_VERSION")

    except Exception as error:
        RegistryUtils.manage_error(error=error)
        app_version = ""

    response.api_version = app_version
    response.method = request.endpoint

    if any(excluded_path in request.base_url
            for excluded_path in excluded_paths):
        return response

    try:
        if response.is_json:
            response_data_origin = json.loads(response.get_data())

    except Exception as error:
        RegistryUtils.manage_error(error=error)
        return response

    response_data_formated = {
        "apiVersion": app_version,
        "data": [],
        "details": [],
        "method": request.endpoint,
        "statusCode": response.status_code
    }

    if not isinstance(response_data_formated["details"], list):
        response_data_formated["details"] = []

    if isinstance(response_data_origin, list) and\
            len(response_data_origin) == 1:
        response_data_formated["data"] = response_data_origin[0]

    elif isinstance(response_data_origin, dict):
        if "data" in response_data_origin:
            for key in response_data_origin:
                response_data_formated[key] = response_data_origin[key]

        else:
            response_data_formated["data"] = response_data_origin

        if "details" in response_data_origin and\
           isinstance(response_data_origin["details"], list):
            response_data_formated["details"] = response_data_origin["details"]

        elif "detail" in response_data_origin and\
                isinstance(response_data_origin["detail"], str):
            response_data_formated["details"].append(
                {
                    "code": response_data_origin["detail"],
                    "values": [],
                    "type": "ERROR"
                }
            )

    else:
        response_data_formated["data"] = response_data_origin

    response.set_data(json.dumps(response_data_formated))
    return response

app.config["CORS_HEADERS"] = "Content-Type"
cors = CORS(app, resources={r"/arroz_service/*": {"origins": "*"}})


app.response_class = ResponseWrapper
manager = Manager(app)

if __name__ == "__main__":
    manager.run()