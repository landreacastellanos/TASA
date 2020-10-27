import unittest
import json
import os

from project.app import PlatformSettingsMicroservice
from pyms.constants import CONFIGMAP_FILE_ENVIRONMENT


class Test_System_External(unittest.TestCase):
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    @classmethod
    def setUpClass(self):
        "set up test fixtures"
        print('### Setting up flask server ###')
        os.environ[CONFIGMAP_FILE_ENVIRONMENT] = os.path.join(self.BASE_DIR,
                                                              "config.yml")
        ms = PlatformSettingsMicroservice(path="project")
        ms.reload_conf()
        app = ms.create_app()
        app.config['TESTING'] = True
        self.app = app.test_client()
        self.headers = {'Content-Type': 'application/json',
                        'Transaction-Id': 123, 'Owner': 12, 'User-Id': 12}
        self.utl = "http://localhost:8080/platform_settings"

    @classmethod
    def tearDownClass(self):
        "tear down test fixtures"
        print('### Tearing down the flask server ###')

    def test_get_list_config(self):
        """ Test that the flask server is running and reachable"""
        method = "/get_list_config"
        get = self.app.get(self.utl+method, headers=self.headers)
        self.assertEqual(get.status_code, 200)

    def test_get_key(self):
        """ Test that the flask server is running and reachable"""
        method = "/get_list_key"
        get = self.app.get(self.utl+method, headers=self.headers)
        self.assertEqual(get.status_code, 200)

    def test_get_config(self):
        """ Test that the flask server is running and reachable"""
        method = "/get_list_config"
        get = self.app.get(self.utl+method, headers=self.headers)
        self.assertEqual(get.status_code, 200)

    def test_get_config_type(self):
        """ Test that the flask server is running and reachable"""
        method = "/get_config_type?idType=32"
        get = self.app.get(self.utl+method, headers=self.headers)
        self.assertEqual(get.status_code, 200)

    def test_get_config_system(self):
        """ Test that the flask server is running and reachable"""
        method = "/get_config_system?idConfig=5"
        get = self.app.get(self.utl+method, headers=self.headers)
        self.assertEqual(get.status_code, 200)

    def test_add_config(self):
        """ Test that the flask server is running and reachable"""
        method = "/add_configuration"
        post = self.app.post(self.utl+method, headers=self.headers,
                             data=json.dumps({"description": "PAP"}))
        self.assertEqual(post.status_code, 200)


if __name__ == '__main__':
    unittest.main()
