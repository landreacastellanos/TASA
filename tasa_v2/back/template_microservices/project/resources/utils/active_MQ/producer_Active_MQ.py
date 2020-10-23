
import stomp
import sys

class Producer():

    def send_message_to_target(self, message, name_target_mq,target_mq='queue'):
        conn = stomp.Connection(host_and_ports=[("desarrollo-08", 61613)])
        conn.connect('admin', 'admin', wait=True)
        conn.send(body=message,
                destination='/'+target_mq+'/'+name_target_mq)
        conn.disconnect()
    
# class Consumer():
#     conn = stomp.Connection(host_and_ports= [("desarrollo-08", 61613)])
#     conn.set_listener('', MyListener())
#     conn.connect('admin', 'admin', wait=True)
#     conn.subscribe(destination='/topic/TopicSampleJinete', id=1, ack='auto')
#     while True:
#         print("ActiveMQ conected")  
#         time.sleep(1000)
