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
    def get_token(value,expiration=3600):
        return jwt.encode({'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=expiration), 'val': value}, 
                          SecurityToken.get_key()).decode("utf-8")

    @staticmethod
    def validate_token():
        token_passed = request.headers['Token']
        try:
            data = jwt.decode(token_passed,SecurityToken.get_key(),
                           algorithm=SecurityToken.get_algorithms())
            return (True, SecurityToken.get_token(data['val']), data['val'])
        except jwt.exceptions.ExpiredSignatureError:
            return (False, 401, '')