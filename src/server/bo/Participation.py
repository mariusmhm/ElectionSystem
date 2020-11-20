from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject

class Participation(NamedBusinessObject):


    def __init__(self):

        self.__student = Student()
        self.__project = Project()
        self.__grading  = Grading()
        self.__priority = []

    def get_student(self):
        """Reads out the student."""
        return self.__student

    def set_student(self, student):
        """Sets the student."""
        self.__student = student

    def get_project(self):
        """Reads out the project."""
        return self.__project

    def set_project(self, project):
        """Sets the project."""
        self.__project = project

    def get_grading(self):
        """Reads out the grading"""
        return self.__grading

    def set_grading(self, grading):
        """Sets the grading"""
        self.__grading = grading

    def get_priority(self):
        """Reads out the priority."""
        return self.__priority

    def set_priority(self, priority):
        """Sets the priority."""
        self.__priority = priority

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




