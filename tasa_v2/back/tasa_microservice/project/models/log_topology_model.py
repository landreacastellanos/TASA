from project.resources.utils.generals_utils import GeneralsUtils


class LogTopologyModel():

    def __init__(self, message, action=None, entity_1_name=None, entity_2_name=None, entity_1_id=None, entity_2_id=None, result=None):
        """ Initializer to properties """
        # T
        LOG_TOPOLOGY_PROCESS_VALUE = "logtopology"
        GLOBAL_DATA_TRANSACTION_ID_KEY = "transaction_id"

        self.message = message
        self.action = action
        self.entity_1_name = entity_1_name
        self.entity_2_name = entity_2_name
        self.entity_1_id = entity_1_id
        self.entity_2_id = entity_2_id
        self.result = result
        self.process = LOG_TOPOLOGY_PROCESS_VALUE
        self.guid_file = GeneralsUtils.get_global_data(GLOBAL_DATA_TRANSACTION_ID_KEY)
        self.datestamp_process = GeneralsUtils.get_datetime()

    message = None
    action = None
    entity_1_name = None
    entity_2_name = None
    entity_1_id = None
    entity_2_id = None
    result = None
    process = None
    guid_file = None
    datestamp_process = None
