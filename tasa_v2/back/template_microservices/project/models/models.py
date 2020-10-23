from flask import Response

class ResponseWrapper(Response):

    api_version = ""

    # data = []

    details = []

    method = ""
