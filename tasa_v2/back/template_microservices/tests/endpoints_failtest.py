import json
import unittest
import os
import requests_mock


from pyms.constants import CONFIGMAP_FILE_ENVIRONMENT
from pyms.flask.app import Microservice
from pyms.flask.services.requests import DEFAULT_RETRIES

INFO = {"startdate":"2018-10-30T23:59:59.999", "enddate":"2020-01-15T23:59:59.999",
        "idsocket":"", "priority":[], "nametensionlv":[], "namecategory":[],
        "stepnumber": 1}

HEADER = {"Transaction-id": "asdasdsadsadadsa", "Content_type":"application/json"}
INFODUMPS = json.dumps(INFO)
NAMEAPI = '/metering_system'
class UnitTestService(unittest.TestCase):
    """Tests for metering_system Service."""
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

    def setUp(self):
        os.environ[CONFIGMAP_FILE_ENVIRONMENT] = os.path.join(self.BASE_DIR, "config-tests-requests-no-data.yml")
        ms = Microservice(path=__file__)
        ms.reload_conf()
        self.app = ms.create_app()
        self.request = ms.requests
        
    @requests_mock.Mocker()
    def test_unit_example(self, mock_request):
        """Ensure the service /metering_system/get-grid-data route behaves correctly."""
        url = "http://localhost:5000"
        full_url = url
        text = json.dumps([{'id': 1, 'name': 'Peter', 'email': 'peter@my-site.com.com'},
                           {'id': 2, 'name': 'Jon', 'email': 'jon@my-site.com.com'}])

        with self.app.app_context():
            mock_request.get(full_url, text=text)
            response = self.request.get(url)

        self.assertEqual(200, response.status_code)

# if __name__ == '__main__':
#     unittest.main()