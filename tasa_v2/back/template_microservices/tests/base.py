# /tests/base.py

from  flask_testing import TestCase

from project.app import create_app

app = create_app()


class BaseTestCase(TestCase):
    def create_app(self):
        #app.config.from_object('project.config.TestingConfig')jorder
        return app
