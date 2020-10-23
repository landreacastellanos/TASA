import os
import sys
import traceback
from datetime import datetime

class RegistryUtils():

    @staticmethod
    def report_event(type_event, report):
        print("-------------------------", type_event, "-------------------------")

        print(datetime.today(), ":")

        if isinstance(report, list):
            for item in report:
                print(item)
        
        else:   
            print(report)

    @staticmethod
    def manage_exception():
        exception_type, exception_value, exception_traceback = sys.exc_info()

        exceptions_report = []

        for traceback_information in traceback.extract_tb(exception_traceback):
            file_name, line_number, function_name, source = traceback_information

            if ('self' in exception_traceback.tb_frame.f_locals):
                class_name = exception_traceback.tb_frame.f_locals['self']

            else:
                class_name = None

            exception_report = {
                    file_name: os.path.basename(file_name),
                    class_name: str(class_name),
                    function_name: function_name,
                    line_number: line_number,
                    source: source
                }

            if not exception_value is None and\
                not exception_value.args is None and\
                isinstance(exception_value.args, list) and\
                len(exception_value.args) > 0:
                
                exception_report["exception_arguments"] = exception_value.args

            exceptions_report.append(exception_report)

        RegistryUtils.report_event("error", exceptions_report)
