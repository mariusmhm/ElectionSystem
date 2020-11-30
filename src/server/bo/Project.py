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
        self.__link = ""
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
        self.__short_decription = ""
        self.__num_spots = 0
        self.__project_type = Projecttype()
        self.__module = Module()
        self.__project_professor = User()
        self.__participation = Participation()

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

    def set_link(self, link):
        """Set the link."""
        self.__link = link

    def get_link(self):
        """Read out of the links."""
        return self.__link

    def set_room_desired(self, room):
        """Set the room desired."""
        self.__room_desired = room

    def get_room_desired(self):
        """Read out the room desired."""
        return self.__room_desired

    def set_grade_average(self, grade):
        """Set the average grade ."""
        self.__grade_average = grade

    def get_grade_average(self):
        """Read out the average grade."""
        return self.__grade_average

    def set_num_of_spots(self, numSpots):
        """Set the amount of spots."""
        self.__num_spots = numSpots

    def get_nom_of_spots(self):
        """Read out the amount of spots."""
        return self.__num_spots

    def set_short_description(self, description):
        """Set the short description."""
        self.__short_decription = description

    def get_short_description(self):
        """Read out the short description."""
        return self.__short_decription

    def set_weekly(self, weeklyLecture):
        """Set if there will be a weekly lecture."""
        self.__weekly = weeklyLecture

    def get_weekly(self):
        """Read out if there will be a weekly lecture."""
        return self.__weekly

    def set_blockdays_during_lecture(self, bdDuringLecture):
        """Set if there will be blickdays during lecture."""
        self.__blockdays_during_lecture = bdDuringLecture

    def get_blockdays_during_lecture(self):
        """Read out if there will be blockdays during lecture."""
        return self.__blockdays_during_lecture

    def set_num_blockdays_during_lecture(self, numBdDuringLecture):
        """Set how much blockdays there will be during lecture."""
        self.__num_blockdays_during_lecutre = numBdDuringLecture

    def get_num_blockdays_during_lecture(self):
        """Read out how much blockdays there will during lecture."""
        return self.__num_blockdays_during_lecutre

    def set_blockdays_prior_lecture(self, bdPriorLecture):
        """Set if there will be blockdays pre lecture."""
        self.__blockdays_prior_lecturetrue = bdPriorLecture

    def get_blockdays_prior_lecture(self):
        """Read out if there will be blockdays pre lecture."""
        return self.__blockdays_prior_lecturetrue

    def set_num_blockdays_prior_lecture(self, numBdPriorLecture):
        """Set the number of blockdays pre lecture."""
        self.__num_blockdays_prior_lecture = numBdPriorLecture

    def get_num_blockdays_prior_lecture(self):
        """Read out the number of blickdays pre lecture."""
        return self.__num_blockdays_prior_lecture

    """get/set order change"""

    def get_date_blockdays_during_lecture(self):
        """Read out if there will be blockdays during lecture ."""
        return self.__date_blockdays_during_lecture

    def set_date_blockdays_during_lecture(self, dateBdDuringLecture):
        """Set if there will be blockdays during lecture ."""
        self.__date_blockdays_during_lecture = dateBdDuringLecture

    def get_special_room(self):
        """Read out the special room."""
        return self.__special_room

    def set_special_room(self, specialRoom):
        """Set if special room."""
        self.__special_room = specialRoom

    def get_blockdays_in_exam(self):
        """Read out if there will be blockdays during exams ."""
        return self.__blockdays_in_exam

    def set_blockdays_in_exam(self, bdInExam):
        """Set if there will be blockdays during exams."""
        self.__blockdays_in_exam = bdInExam

    def get_num_blockdays_in_exam(self):
        """Read out the number of blockdays during exam ."""
        return self.__num_blockdays_in_Exam

    def set_num_blockdays_in_exam(self, numBdInExam):
        """Set the number of blockdays during exams."""
        self.__num_blockdays_in_Exam = numBdInExam

    def get_participation(self):
        """Read out the participation  ."""
        return self.__participation

    def set_participation(self, participation):
        """Set the participation ."""
        self.__participation = participation

    def get_project_professor(self):
        """ Read out the professor of project."""
        return self.__project_professor

    def set_project_professor(self, professor):
        """Set the professor of project."""
        self.__project_professor = professor

    def get_module(self):
        """Read out the module of project ."""
        return self.__module

    def set_module(self, module):
        """Set the module of project."""
        self.__module = module

    def get_project_type(self):
        """Read out the projecttype."""
        return self.__project_type

    def set_project_type(self, projectType):
        """Set the projecttype ."""
        self.__project_type = projectType

    def __str__(self):

        """Creats a simple textually Representation of a Project() instanz.
        """

        return "Project:  {}, {}, {}, {}, {}, {}, {}, {} ".format(self.get_project_id(),self.get_project_name(),self.get_link(),self.get_short_description(),self.get_project_professor(),self.get_module(),self.get_project_type(),self.get_nom_of_spots())

    @staticmethod
    def to_dict(dicti=dict()):

        """"Convert  a Python dict() in a Project()."""
        project = Project()
        project.set_id(dicti["ProjectID"])
        project.set_name(dicti["ProjectName"])
        project.set_link(dicti["ProjectLink"])
        project.set_room_desired(dicti["ProjectRoomDesired"])
        return project

        """ to be continued """



















