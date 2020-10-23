import json
import unittest
from project.services.my_Template_Service import MyTemplateService

class FunctionalTestService(unittest.TestCase):
    """Tests for my_Template Service."""

    def test_Funcionality_OK(self):
        """Ensure the service valid return OK correctly."""
        result = MyTemplateService().some_Functionality()
        
        self.assertEqual(result, "OK")

if __name__ == '__main__':
    unittest.main()