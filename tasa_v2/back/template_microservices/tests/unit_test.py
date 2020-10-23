import json
import unittest
from unittest.mock import Mock

from project.tests.base import BaseTestCase

INFO = {"startdate":"2018-10-30T23:59:59.999", "enddate":"2020-01-15T23:59:59.999",
        "idsocket":"", "priority":[], "nametensionlv":[], "namecategory":[],
        "stepnumber": 1}

HEADER = {"Transaction-id": "asdasdsadsadadsa", "Content_type":"application/json"}
INFODUMPS = json.dumps(INFO)
NAMEAPI = '/my_Template'

class UnitTestService(BaseTestCase):
    """Tests for my_Template Service."""

    def test_unit_example(self):
        """Ensure the service /my_Template/example route behaves correctly."""
        response = self.client.get(NAMEAPI+'/example', headers=HEADER)
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()