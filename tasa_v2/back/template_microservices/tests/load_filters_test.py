import unittest
import time
import json
import os

from pyms.constants import CONFIGMAP_FILE_ENVIRONMENT
from project.app import PlatformSettingsMicroservice


class TestFilters(unittest.TestCase):
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

    def test_get_operator_filters(self):
        """ Test endPoint return successful data response to get_operator_filters"""
        method = "/get_operator_filters"
        start_time = time.time()
        time.sleep(1)
        get = self.app.get(self.utl+method, headers=self.headers)
        end_time = time.time()
        time_lapsed = end_time - start_time
        self.assertLess(time_lapsed, 3)
        self.assertEqual(get.status_code, 200)

    def test_get_operator_field(self):
        """ Test endPoint return successful data response to get_operator_field"""
        method = "/get_operator_field"
        start_time = time.time()
        time.sleep(1)
        get = self.app.get(self.utl+method, headers=self.headers)
        end_time = time.time()
        time_lapsed = end_time - start_time
        self.assertLess(time_lapsed, 3)
        self.assertEqual(get.status_code, 200)
        
    def test_get_field_filters(self):
        """ Test endPoint return successful data response to get_field_filters"""
        method = "/get_field_filters"
        start_time = time.time()
        time.sleep(1)
        get = self.app.get(self.utl+method, headers=self.headers)
        end_time = time.time()
        time_lapsed = end_time - start_time
        self.assertLess(time_lapsed, 3)
        self.assertEqual(get.status_code, 200)

    def test_create_config_filter(self):
        """ Test validation field required to endPoint create_config_filter """
        method = "/create_config_filter"
        start_time = time.time()
        time.sleep(1)
        post = self.app.post(self.utl+method, headers=self.headers,
                             data=json.dumps({"nameFilters": "PAP"}))
        end_time = time.time()
        time_lapsed = end_time - start_time
        self.assertLess(time_lapsed, 3)                                       
        self.assertEqual(post.status_code, 200)


if __name__ == '__main__':
    unittest.main()