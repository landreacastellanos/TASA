import time
import sys
import stomp
from datetime import datetime
import uuid
import json
import sys

class LogModel(object):
    """ Response model class represents and manipulates atributes of API. """

    def __init__(self, class_id, log_level, message, method_id, module_id, operation_date, owner, transaction_id, user_id):
        """ Create a new instance of class responseModel """
        self.class_id = class_id
        self.log_level = log_level
        self.message = message
        self.method_id = method_id
        self.module_id = module_id
        self.operation_date = operation_date
        self.transaction_id = transaction_id
        self.user_id = user_id

    def to_json(self):
        return dict(class_id=self.class_id, log_level=self.log_level, message=self.message,
                    method_id=self.method_id, module_id=self.module_id, operation_date=self.operation_date,
                    transaction_id=self.transaction_id, user_id=self.user_id)

class ComplexEncoder(json.JSONEncoder):
    """ Class ComplexEncoder """
    def default(self, obj):
        """ Method default """
        if hasattr(obj, 'to_json'):
            return obj.to_json()
        else:
            return json.JSONEncoder.default(self, obj)


class Producer():

    def send_message_to_target(self, message, name_target_mq,target_mq='queue'):
        conn2 = stomp.Connection(host_and_ports=[("desarrollo-08", 61613)])
        conn2.connect('admin', 'admin', wait=True)
        conn2.send(body=message,
                destination='/'+target_mq+'/'+name_target_mq)
        conn2.disconnect()
    
# ACTIVE MQ
# ====== Connection ====== #
CON_ACTIVE_MQ = Producer()
NAME_QUEUE = "Logs"
TOPIC_NAME = "Logs.Topic"


class ListenerMQ(stomp.ConnectionListener):
    def on_error(self, headers, message):
        print('received an error "%s"' % message)
        now_date = datetime.today().isoformat()
        data_log = LogModel("Consumer", "ERROR", message, "start",
                            "ActiveMQ", now_date, "PRIMESTONE", str(uuid.uuid4()), "PRIME")
        result = json.loads(json.dumps(data_log.to_json(),
                                       cls=ComplexEncoder).replace("'", '"'))
        CON_ACTIVE_MQ.send_Message_To_Queue(
            message=result, queue_name=NAME_QUEUE)

    def on_message(self, headers, message):
        print('received a message "%s"' % message)
        data_message = json.loads(message)
        if(data_message['event_type'] == "MultiSpeak.ServicePoint.Ins"):
            print("instance your service here and send de data:" + data_message['data'])


conn = stomp.Connection(host_and_ports=[("desarrollo-08", 61613)])
conn.set_listener('', ListenerMQ())
conn.connect('admin', 'admin', wait=True)
conn.subscribe(destination='/topic/'+TOPIC_NAME, id=1, ack='auto')
while True:
    print("ActiveMQ conected")
    time.sleep(1000)


# class Consumer():
#     def __init__(self, topic_name):
#         self.topic_name = topic_name

#     def start(self):
#         conn = stomp.Connection(host_and_ports=[("desarrollo-08", 61613)])
#         conn.set_listener('', ListenerMQ())
#         conn.connect('admin', 'admin', wait=True)
#         conn.subscribe(destination='/topic/'+self.topic_name, id=1, ack='auto')
#         while True:
#             print("ActiveMQ conected")
#             time.sleep(1000)

    #conn = stomp.Connection(host_and_ports= [("desarrollo-08", 61613)])
