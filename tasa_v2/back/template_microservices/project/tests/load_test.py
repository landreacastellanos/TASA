import unittest
import time

class Load_Test_Service(unittest.TestCase):
    """Tests for my_Template Service."""

    def test_Funcionality_OK(self):
        """Ensure the service valid return OK correctly."""
        start_time = time.time()
        time.sleep(1)
        #Doing something 
        end_time = time.time()
        time_lapsed = end_time - start_time
        self.assertLess(time_lapsed, 3)

if __name__ == '__main__':
    unittest.main()