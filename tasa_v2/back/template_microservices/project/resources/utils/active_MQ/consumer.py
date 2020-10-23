import time
import sys

import stomp

class MyListener(stomp.ConnectionListener):
    def on_error(self, headers, message):
        print('received an error "%s"' % message)
    def on_message(self, headers, message):
        print('received a message "%s"' % message)

class Consumer():
    conn = stomp.Connection(host_and_ports= [("desarrollo-08", 61613)])
    conn.set_listener('', MyListener())
    conn.connect('admin', 'admin', wait=True)
    conn.subscribe(destination='/topic/TopicSampleJinete', id=1, ack='auto')
    while True:
        print("ActiveMQ conected")  
        time.sleep(1000)
