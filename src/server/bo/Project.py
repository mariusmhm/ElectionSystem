from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject
from server.Role import Role
from server.bo.Participation import Participation
from server.bo.User import User
from server.bo.Module import Module
from server.bo.Projecttype import Projecttype





class Project(NamedBusinessObject):

    """Realization of an examplary Project.
    """

    def __init__(self):
        super().__init__()
        self.__project_id = 0
        self.__project_name = ""
        self.__short_description = ""
        """self.__link = ""
        self.__room_desired = ""
        self.__grade_average = 0
        self.__num_blockdays_in_Exam = 0
        self.__blockdays_in_exam = True
        self.__special_room = True
        self.__date_blockdays_during_lecture = 0
        self.__num_blockdays_prior_lecture = 0
        self.__blockdays_prior_lecturetrue = True
        self.__num_blockdays_during_lecutre = 0
        self.__blockdays_during_lecture = True
        self.__weekly = True
        self.__num_spots = 0
        self.__project_type = Projecttype()
        self.__module = Module()
        self.__project_professor = User()
        self.__participation = Participation()"""

    def get_project_id(self):
        """Read out of the projectID."""
        return self.__project_id

    def set_project_id(self, pid):
        """Set the projectID."""
        self.__project_id = pid

    def set_project_name(self, projectName):
        """Set the projectname."""
        self.__project_name = projectName

    def get_project_name(self):
        """Read out if the projectname."""
        return self.__project_name

    def set_short_description(self, description):
        """Set the short description."""
        self.__short_decription = description

    def get_short_description(self):
        """Read out the short description."""
        return self.__short_decription

    

    def __str__(self):

        """Creats a simple textually Representation of a Project() instanz.
        """

        return "Project:  {}, {}, {}".format(self.get_project_id(),self.get_project_name(),self.get_short_description())

    @staticmethod
    def to_dict(dicti=dict()):

        """"Convert  a Python dict() in a Project()."""
        project = Project()
        project.set_id(dicti["ProjectID"])
        project.set_name(dicti["ProjectName"])
        project.set_short_description(dicti["ShortDescription"])
        return project
