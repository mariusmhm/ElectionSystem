from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject


class Semester(NamedBusinessObject):

    def __init__(self):
        self.__wintersemester = True
        self.__submit_projects_end_date = 0
        self.__grading_end_date = 0

    def get_wintersemester(self):
        """Read out wintersemester."""
        return self.__wintersemester

    def set_wintersemester(self, ws):
        """Set wintersemester."""
        self.__wintersemester = ws

    def get_submit_projects_end_date(self):
        """Read submit_project_end_date."""
        return self.__submit_projects_end_date

    def set_submit_projects_end_date(self, date):
        """Set submit_project_end_date."""
        self.__submit_projects_end_date = date

    def get_grading_end_date(self):
        """Read the grading end date."""
        return self.__grading_end_date

    def set_grading_end_date(self, gdate):
        """Set the grading end date."""
        self.__grading_end_date = gdate

    def __str__(self):

        """Creats a simple textually Representation of a Semester() instanz.

        The Attributes are wintersemester, submit_project_end_date and grading_end_date."""

        return "Project:  {}, {}, {}, ".format(self.get_wintersemester(),self.get_submit_projects_end_date(), self.get_grading_end_date())

    @staticmethod
    def to_dict(dicti=dict()):

        """Convert a Python dict() in a Semester()."""

        semester = Semester()
        semester.set_wintersemester(dicti["Wintersemester"])
        semester.set_submit_projects_end_date(dicti["SubmitEndDate"])
        semester.set_grading_end_date(dicti["GradingEndDate"])
        return semester
