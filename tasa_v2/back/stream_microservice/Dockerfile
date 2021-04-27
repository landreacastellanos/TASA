FROM "python:3.8-slim"
ENV FLASK_APP="manage.py"

COPY . /app
WORKDIR /app

RUN pip install -r "requirements/base.txt"

CMD flask run --host=0.0.0.0 --port 5024