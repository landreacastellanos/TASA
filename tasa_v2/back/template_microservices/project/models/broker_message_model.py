from project.resources.utils.generals_utils import GeneralsUtils


class BrokerMessageModel():
    """ class model for sending messages """
    #T
    BROKER_MESSAGE_PROCESS_VALUE = "brokerMessage"
    GLOBAL_DATA_OWNER_DATA_KEY = "owner_data"
    GLOBAL_DATA_USER_ID_KEY = "user_id"
    GLOBAL_DATA_TRANSACTION_ID_KEY = "transaction_id"

    def __init__(self, target, event_type, data, source):
        """ Initializer to properties """
        log_message_process_value = self.BROKER_MESSAGE_PROCESS_VALUE
        global_data_owner_data_key = self.GLOBAL_DATA_OWNER_DATA_KEY
        global_data_user_id_key = self.GLOBAL_DATA_USER_ID_KEY
        global_data_transaction_id_key = self.GLOBAL_DATA_TRANSACTION_ID_KEY

        self.target = target
        self.eventType = event_type
        self.data = data
        self.source = source
        self.owner = GeneralsUtils.get_global_data(global_data_owner_data_key)
        self.transactionId =\
            GeneralsUtils.get_global_data(global_data_transaction_id_key)
        self.user_id = GeneralsUtils.get_global_data(global_data_user_id_key)
        self.datestamp = GeneralsUtils.get_datetime()
        self.process = log_message_process_value

    target = None
    eventType = None
    data = None
    source = None
    owner = None
    transactionId = None
    datestamp = None
    process = None
