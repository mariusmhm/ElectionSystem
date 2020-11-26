from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject

class Participation(NamedBusinessObject):


    def __init__(self):

        self._student = Student()
        self._project = Project()
        self._grading  = Grading()
        self._priority = []

    def get_student(self):
        """Reads out the student."""
        return self.__student

    def set_student(self, student):
        """Sets the student."""
        self._student = student

    def get_project(self):
        """Reads out the project."""
        return self._project

    def set_project(self, project):
        """Sets the project."""
        self._project = project

    def get_grading(self):
        """Reads out the grading"""
        return self._grading

    def set_grading(self, grading):
        """Sets the grading"""
        self.__grading = grading

    def get_priority(self):
        """Reads out the priority."""
        return self._priority

    def set_priority(self, priority):
        """Sets the priority."""
        self._priority = priority

    def __str__(self):

        """Creats a simple textually Representation of a Participation() instanz.
        """

        return "Project:  {}, {}, {}, {} ".format(self.get_grading(),self.get_priority(),self.get_project(), self.get_student())


    @staticmethod
    def to_dict(dicti=dict()):

        """"Convert  a Python dict() in a Participation()."""
        participation = Participation()
        participation.set_grading(dicti["ParticipationGrading"])
        participation.set_priority(dicti["ParticipationPriority"])
        participation.set_project(dicti["ParticipationProject"])
        participation.set_student(dicti["ParticipationStudent"])
        return participation




