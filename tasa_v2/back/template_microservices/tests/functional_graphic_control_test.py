import unittest
import os

from project.app import PlatformSettingsMicroservice

from pyms.constants import CONFIGMAP_FILE_ENVIRONMENT


class Test_Graphic_Control(unittest.TestCase):
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
                        'Transaction-Id': 123,
                        'Owner': 'Test',
                        'User-Id': '2sdsade-23424-324-sdsdf-3dsdf'}
        self.url = "http://localhost:8080/platform_settings"

    def test_get_config(self):
        """ Test that the flask server is running and reachable"""
        method = "/get_control_state?" +\
                 "controlId=sistema_medicion_2&controlType=grid"
        get = self.app.get(self.url+method,
                           headers=self.headers)
        self.assertEqual(get.status_code, 200)


if __name__ == '__main__':
    unittest.main()
