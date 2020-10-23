# encoding: utf-8
import uuid

from datetime import datetime
from flask import g, request, Response
from flask_script import Manager

from project.app import create_app
from project.models.models import ResponseWrapper
from project.resources.utils.data_utils import DataUtils
app = create_app()

@app.before_request
def before_request_function():
    g.dateTimeStart = datetime.utcnow()

    g.transactionId = str(uuid.uuid4())

    g.endpoint = request.endpoint

@app.after_request
def after_request_function(response):
    print(datetime.utcnow() - g.dateTimeStart)

    try:
        app_version = DataUtils.get_configuration_setting("APP_VERSION")
    except:
        app_version = ""

    response.api_version = app_version

    response.method = request.endpoint

    return response

manager = Manager(app)

app.response_class = ResponseWrapper

if __name__ == "__main__":
    manager.run()