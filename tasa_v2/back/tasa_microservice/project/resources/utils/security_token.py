import jwt
import datetime
from project.configuration_manager import ConfigurationManger
from flask import request
class SecurityToken:
    @staticmethod
    def get_key():
        return ConfigurationManger.get_config("PRIVATE_KEY")

    @staticmethod
    def get_algorithms():
        return ConfigurationManger.get_config("ALGORITHMS")

    @staticmethod
    def get_token():
        return jwt.encode({'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=1200)}, 'secret').decode('utf-8')

    @staticmethod
    def validate_token():
        token_passed = request.headers['Token']
        try:
            data = jwt.decode(token_passed,SecurityToken.get_key(),
                           algorithm=SecurityToken.get_algorithms())
            return (True, SecurityToken.get_token())
        except jwt.exceptions.ExpiredSignatureError:
            return (False, 401)