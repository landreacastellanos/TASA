from threading import Thread
from flask_mail import Mail, Message
from threading import Thread

import manage

class MailUtils:

    def __init__(self):
        self.__app = manage.app
        self.__mail = manage.mail

    
    def send_email(self, subject, recipients, body):
        with self.__app.app_context():
            message = Message(subject, sender= self.__app.config.get("MAIL_USERNAME"), recipients=recipients)
            message.body = body
            self.__mail.send(message)
