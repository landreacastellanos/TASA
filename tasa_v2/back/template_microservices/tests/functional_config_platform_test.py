import unittest
import os
import json

from project.app import PlatformSettingsMicroservice
from pyms.constants import CONFIGMAP_FILE_ENVIRONMENT


class TestConfigPlatform(unittest.TestCase):
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

    def test_get_configuration(self):
        """ Test that the flask server is running and reachable"""
        method = "/get_configuration"
        get = self.app.get(self.utl+method, headers=self.headers)
        self.assertEqual(get.status_code, 200)

    def test_get_valid_object(self):
        """ Test that the flask server is running and reachable"""
        method = "/get_configuration"
        get = self.app.get(self.utl+method, headers=self.headers)

        data = json.loads(get.get_data())
        json_data = data['data'][0]
        size = len(json_data)
        self.assertGreater(size, 0)

    def test_get_qualityCodes(self):
        """ Test that the flask server is running and reachable"""
        method = "/get_configuration"
        get = self.app.get(self.utl+method, headers=self.headers)

        data = json.loads(get.get_data())
        json_data = data['data'][0]
        array = json_data['QualityCode']['PowerOutage']
        size = len(array)
        self.assertGreater(size, 0)


if __name__ == '__main__':
    unittest.main()
