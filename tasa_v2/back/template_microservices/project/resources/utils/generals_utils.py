import json
import os


class GeneralsUtils:

    @staticmethod
    def validate_structure(dictionary, schema):
        return []

    @staticmethod
    def get_request_body(request):
        result = None

        if not GeneralsUtils.validate_attribute("json", request, dict):
            data = request.data
            if isinstance(data, bytes) or\
                isinstance(data, str):
                result = json.loads(data)
            elif isinstance(data, dict):
                result = json.loads(data)
            elif isinstance(request.form, dict):
                result = request.form

        return result

    @staticmethod
    def read_file(path, output_type="json"):
        #T
        OUTPUT_TYPES = ("json", "text")

        if not GeneralsUtils.validate_string(path):
            raise Exception

        if not os.path.isfile(path):
            raise Exception
        
        if not GeneralsUtils.\
            validate_attribute(output_type, OUTPUT_TYPES, str):
            raise Exception

        with open(path, "r") as text_file:
            if output_type == "json":
                result = json.load(text_file)
            if output_type == "text":
                result = text_file

        return result

    @staticmethod
    def validate_attribute(attribute_name, structure, types_attributes_allowed = None):
        result = False

        if not GeneralsUtils.validate_string(attribute_name) or\
        not isinstance(structure, (dict, tuple, list)) or\
        attribute_name not in structure:
            return False
        
        if types_attributes_allowed is None:
            result = True

        elif isinstance(types_attributes_allowed, type) or\
                (
                    isinstance(types_attributes_allowed, tuple) and\
                    all(isinstance(type_attribute_allowed, type)\
                        for type_attribute_allowed in types_attributes_allowed)
                ):

            if isinstance(structure, dict):
                attribute = structure[attribute_name]
            else:
                attribute = next(item for item in structure if attribute_name == item)

            if isinstance(attribute, types_attributes_allowed):
                result = True

        else:
            return False

        return result

    @staticmethod
    def validate_data(dictionary, schema):
        return True

    @staticmethod
    def validate_string(value):
        if not isinstance(value, str):
            return False

        if str.strip(value) == "":
            return False

        return True
