from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject


class Semester(NamedBusinessObject):

    def __init__(self):
        self.__wintersemester = True
        self.__submit_project_end_date = 0
        self.__grading_end_date = 0

