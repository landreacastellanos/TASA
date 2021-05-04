# encoding: utf-8
import json
import os
from datetime import datetime
from flask import g, request
from flask_cors import CORS
from flask_script import Manager
from flask_mail import Mail

from datetime import datetime
from flask import g, request, Response, send_from_directory
from flask_script import Manager

from project.app import create_app
from project.models.models import ResponseWrapper
from project.resources.utils.data_utils import DataUtils
from project.configuration_manager import ConfigurationManger
from project.resources.utils.registry_utils import RegistryUtils
from project.resources.utils.security_token import SecurityToken 

app = create_app()

@app.before_request
def before_request_function():
    results = {
            "data": [],
            "details": []
        }
    g.dateTimeStart = datetime.utcnow()

    g.endpoint = request.endpoint
    validation_url = True
    if any(url_exclude in request.base_url
    for url_exclude in ("swagger", "restore_password", "login", "get_file")):
        validation_url = False

    if validation_url:
        validation_token = SecurityToken().validate_token() 
        if not validation_token[0] or (not SecurityToken().verify_exist_token() and "is_authenticated" not in request.base_url):
            results['details'].append({
                    "key": 400,
                    "value": "Token Invalido"
                })
            return results

@app.after_request
def after_request_function(response):
    print(datetime.utcnow() - g.dateTimeStart)
    # T
    excluded_paths = ("swagger",)
    response_data_origin = None
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers['Access-Control-Allow-Headers'] = "*"
    response.headers['Access-Control-Allow-Methods'] = "*"

    if any(url_exclude in request.base_url
    for url_exclude in ("get_file")):
        return response

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
           isinstance(response_data_origin["details"], list) and\
           len(response_data_origin["details"]) >= 1:
            if("key" in response_data_origin["details"][0]):
                response_data_formated["statusCode"] = response_data_origin["details"][0]["key"]
            else: 
                response_data_formated["statusCode"] = 500
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
cors = CORS(app, resources={r"/tasa_service/*": {"origins": "*"}})

app.config['MAIL_SERVER'] = 'mail.atechit.com.co'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'servidor@atechit.com.co'
app.config['MAIL_PASSWORD'] = '8*G%HAOEp^}r'
app.config['MAIL_DEBUG '] = True
app.config['TESTING'] = False

app.response_class = ResponseWrapper

uploads_dir = os.path.join(app.root_path, 'images')
if not (os.path.exists(uploads_dir)):
    os.makedirs(uploads_dir)

manager = Manager(app)

mail = Mail(app)

if __name__ == "__main__":
    manager.run()