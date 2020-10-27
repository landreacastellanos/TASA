import unittest
import os
import json

from project.app import PlatformSettingsMicroservice
from pyms.constants import CONFIGMAP_FILE_ENVIRONMENT


class TestFiltersConfig(unittest.TestCase):
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    MESSAGE_FIELD_REQUIRED = "KEY000119"
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

    def test_get_operator_filters(self):
        """ Test times endPoint return successful data response to get_operator_filters"""
        method = "/get_operator_filters"
        get = self.app.get(self.utl+method, headers=self.headers)
        data = json.loads(get.get_data())
        self.assertEqual(get.status_code, 200)
        self.assertTrue(len(data)>0)

    def test_get_operator_field(self):
        """ Test times endPoint return successful data response to get_operator_field"""
        method = "/get_operator_field"
        get = self.app.get(self.utl+method, headers=self.headers)
        data = json.loads(get.get_data())
        self.assertEqual(get.status_code, 200)
        self.assertTrue(len(data)>0)

    def test_get_field_filters(self):
        """ Test times endPoint return successful data response to get_field_filters"""
        method = "/get_field_filters"
        get = self.app.get(self.utl+method, headers=self.headers)
        data = json.loads(get.get_data())
        self.assertEqual(get.status_code, 200)
        self.assertTrue(len(data)>0)

    def test_create_config_filter(self):
        """ Test times validation field required to endPoint create_config_filter """
        method = "/create_config_filter"
        post = self.app.post(self.utl+method, headers=self.headers,
                             data=json.dumps({"nameFilters": "PAP"}))
        data = json.loads(post.get_data())                     
        self.assertEqual(post.status_code, 200)

        self.assertTrue('details' in data)

        self.assertTrue(len(data['details'])>0)

        self.assertEqual(data['details'][0]['code'],
        self.MESSAGE_FIELD_REQUIRED)  


if __name__ == '__main__':
    unittest.main()
