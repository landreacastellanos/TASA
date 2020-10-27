from flask import Response

from project.resources.utils.generals_utils import GeneralsUtils

class Variable():
    variable_id = ""
    custom_name = ""
    unit_of_measure = ""
    reading_type = ""
    id_vdi = -1
    id_vcn = -1
    relation = False

class ResponseWrapper(Response):
    api_version = ""
    details = []
    method = ""


class TransactionResult():

    def __init__(self, action, entity_1_name, entity_2_name=None):
        self.action = action
        self.entity_1_name = entity_1_name
        self.entity_2_name = entity_2_name
        self.datestamp_process = GeneralsUtils.get_datetime()

    guid_file = ""
    process = ""
    entity_1_id = None
    entity_2_id = None
    message = ""
    result = ""
