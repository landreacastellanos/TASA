from threading import Thread
from flask_mail import Message
from flask import current_app, render_template

import main

def send_async_mail(message):
    with main.app.app_context():
        main.mail.send(message)

def welcome_mail(email, recover_url):
    message = Message('Restaurar contraseña', sender='digitaltasa@gmail.com', recipients=[email])

    message.html = render_template('email/reset_password_email.html', user=email, recover_url=recover_url)

    thread = Thread(target=send_async_mail, args=[message])
    thread.start()