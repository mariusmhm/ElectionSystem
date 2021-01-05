from server.bo.NamedBusinessObject import NamedBusinessObject
from server.Automat import Automat
from datetime import date



class Project(Automat, NamedBusinessObject):
    """Realization of an examplary Project."""

    def __init__(self):
        super().__init__()
       
        self._short_description = ""
        self._special_room = True
        self._room_desired = ""
        self._num_blockdays_prior_lecture = 0
        self._date_blockdays_during_lecture = date
        self._num_blockdays_during_lecture = 0
        self._num_blockdays_in_exam = 0
        self._weekly = True
        self._num_spots = 0
        self._language = ""
        self._external_partner = ""
        self._projecttype_id = None
        self._module_id = None
        self._professor_id = None
        self._add_professor_id = None




    def set_short_description(self, description):
        """Sets  the short description of the project."""
        self._short_description = description 
    
    def get_short_description(self):
        """Read out the short description of the project."""
        return self._short_description

    def set_special_room(self, specialRoom):
        """Set if special room."""
        self._special_room = specialRoom

    def get_special_room(self):
        """Read out the special room."""
        return self._special_room 
    
    def set_room_desired(self, room):
        """Set the room desired."""
        self._room_desired = room

    def get_room_desired(self):
        """Read out the room desired."""
        return self._room_desired

    def set_num_blockdays_prior_lecture(self, numBdPriorLecture):
        """Set the number of blockdays pre lecture."""
        self._num_blockdays_prior_lecture = numBdPriorLecture

    def get_num_blockdays_prior_lecture(self):
        """Read out the number of blickdays pre lecture."""
        return self._num_blockdays_prior_lecture

    def set_date_blockdays_during_lecture(self, dateBdDuringLecture):
        """Set if there will be blockdays during lecture ."""
        self._date_blockdays_during_lecture = dateBdDuringLecture

    def get_date_blockdays_during_lecture(self):
        """Read out if there will be blockdays during lecture ."""
        return self._date_blockdays_during_lecture

    def set_num_blockdays_during_lecture(self, numBdDuringLecture):
        """Set how much blockdays there will be during lecture."""
        self._num_blockdays_during_lecture = numBdDuringLecture

    def get_num_blockdays_during_lecture(self):
        """Read out how much blockdays there will during lecture."""
        return self._num_blockdays_during_lecture
    
    def set_num_blockdays_in_exam(self, num):
        """Set the average grade ."""
        self._num_blockdays_in_exam = num

    def get_num_blockdays_in_exam(self):
        """Read out the average grade."""
        return self._num_blockdays_in_exam

    def set_weekly(self, weeklyLecture):
        """Set if there will be a weekly lecture."""
        self._weekly = weeklyLecture

    def get_weekly(self):
        """Read out if there will be a weekly lecture."""
        return self._weekly

    def set_num_spots(self, numSpots):
        """Set the amount of spots."""
        self._num_spots = numSpots

    def get_num_spots(self):
        """Read out the amount of spots."""
        return self._num_spots

    def set_language(self, language):
        """Sets  the language of the project."""
        self._language = language

    def get_language(self):
        """Read out out the language of the project."""
        return self._language

    def set_external_partner(self, externalPartner):
        self._external_partner = externalPartner

    def get_external_partner(self):
        return self._external_partner

    #--- foreign keys ----

    def set_projecttype_id(self, projecttypeId):
        """Sets  the project tyoe of the project."""
        self._projecttype_id = projecttypeId

    def get_projecttype_id(self):
        """Reads out the project type of the project."""
        return self._projecttype_id
    
    def set_module_id(self, moduleId):
        """Sets the modoule of the project"""
        self._module_id = moduleId

    def get_module_id(self):
        return self._module_id

    def set_professor_id(self, profId):
        """Sets  the professor  of the project."""
        self._professor_id = profId

    def get_professor_id(self):
        """Returns  the professor of the project."""
        return self._professor_id

    def set_add_professor_id(self, addProfId):
        """Set the additional professor of the project"""
        self._add_professor_id = addProfId

    def get_add_professor_id(self):
        """Readsout the additional professor"""
        return self._add_professor_id




    """def __str__(self):

        #Creats a simple textually Representation of a Project() instanc.

        return "Project:  {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ".
            format(self.get_id(),self.get_name(), self.get_date() ,self.get_link(),self.get_short_description(),
                   self.get_room_necessary(), self.get_professor_id(),self.get_module_id(),self.get_projecttype_id(),
                   self.get_num_spots())"
    """

    @staticmethod
    def to_dict(dicti=dict()):

        """"Convert  a Python dict() in a Participation()."""
        project = Project()
        project.set_id(dicti["id"])
        project.set_date(dicti["creation_date"])
        project.set_name(dicti["name"])
        project.set_short_description(dicti["short_description"])
        project.set_special_room(dicti["special_room"])
        project.set_room_desired(dicti["room_desired"])
        project.set_num_blockdays_prior_lecture(dicti["num_blockdays_prior_lecture"])
        project.set_date_blockdays_during_lecture(dicti["date_blockdays_during_lecture"])
        project.set_num_blockdays_during_lecture(dicti["num_blockdays_during_lecture"])
        project.set_num_blockdays_in_exam(dicti["num_blockdays_in_exam"])
        project.set_weekly(dicti["weekly"])
        project.set_num_spots(dicti["num_spots"])
        project.set_language(dicti["language"])
        project.set_external_partner(dicti["external_partner"])
        project.set_projecttype_id(dicti["projecttype_id"])
        project.set_module_id(dicti["module_id"])
        project.set_professor_id(dicti["professor_id"])
        project.set_add_professor_id(dicti["add_professor_id"])
        project.set_state(dicti["state"])
        return project
