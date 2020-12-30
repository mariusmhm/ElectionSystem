from server.bo.BusinessObject import BusinessObject
#from server.bo.NamedBusinessObject import NamedBusinessObject

class Project(BusinessObject):

    """Realization of an examplary Project. Test
    """

    def __init__(self):
        super().__init__()

        self.module_id = None
        self.projecttype_id = None
        self.professor_id = None



        self._project_id = None
        self._project_name = None
        self._short_description = None
        self._link = ""
        self._room_desired = ""
        self._grade_average = 0
        self._num_blockdays_in_exam = 0
        self._blockdays_in_exam = True
        self._special_room = True
        self._date_blockdays_during_lecture = 0
        self._num_blockdays_prior_lecture = 0
        self._blockdays_prior_lecture = True
        self._num_blockdays_during_lecture = 0
        self._blockdays_during_lecture = True
        self._weekly = True
        self._num_spots = 0


    

    def set_project_id(self, id):
        self._project_id = id
    
    def get_project_id(self):
        return self._project_id

    def set_project_name(self, name):
        self._project_name = name 
    
    def get_project_name(self):
        return self._project_name

    def set_short_description(self, description):
        self._short_description = description 
    
    def get_short_description(self):
        return self._short_description

    def set_link(self, link):
        """Set the link."""
        self._link = link

    def get_link(self):
        """Read out of the links."""
        return self._link

    def set_room_desired(self, room):
        """Set the room desired."""
        self._room_desired = room

    def get_room_desired(self):
        """Read out the room desired."""
        return self._room_desired

    def set_grade_average(self, grade):
        """Set the average grade ."""
        self._grade_average = grade

    def get_grade_average(self):
        """Read out the average grade."""
        return self._grade_average

    def set_num_blockdays_in_exam(self, num):
        """Set the average grade ."""
        self._num_blockdays_in_exam = num

    def get_num_blockdays_in_exam(self):
        """Read out the average grade."""
        return self._num_blockdays_in_exam

    def get_blockdays_in_exam(self):
        """Read out if there will be blockdays during exams ."""
        return self._blockdays_in_exam

    def set_blockdays_in_exam(self, bdInexam):
        """Set if there will be blockdays during exams."""
        self._blockdays_in_exam = bdInexam

    def get_special_room(self):
        """Read out the special room."""
        return self._special_room

    def set_special_room(self, specialRoom):
        """Set if special room."""
        self._special_room = specialRoom

    def get_date_blockdays_during_lecture(self):
        """Read out if there will be blockdays during lecture ."""
        return self._date_blockdays_during_lecture

    def set_date_blockdays_during_lecture(self, dateBdDuringLecture):
        """Set if there will be blockdays during lecture ."""
        self._date_blockdays_during_lecture = dateBdDuringLecture

    def set_blockdays_prior_lecture(self, bdPriorLecture):
        """Set if there will be blockdays pre lecture."""
        self._blockdays_prior_lecture = bdPriorLecture

    def get_blockdays_prior_lecture(self):
        """Read out if there will be blockdays pre lecture."""
        return self._blockdays_prior_lecture

    def set_num_blockdays_prior_lecture(self, numBdPriorLecture):
        """Set the number of blockdays pre lecture."""
        self._num_blockdays_prior_lecture = numBdPriorLecture

    def get_num_blockdays_prior_lecture(self):
        """Read out the number of blickdays pre lecture."""
        return self._num_blockdays_prior_lecture

    def set_blockdays_during_lecture(self, bdDuringLecture):
        """Set if there will be blickdays during lecture."""
        self._blockdays_during_lecture = bdDuringLecture

    def get_blockdays_during_lecture(self):
        """Read out if there will be blockdays during lecture."""
        return self._blockdays_during_lecture

    def set_num_blockdays_during_lecture(self, numBdDuringLecture):
        """Set how much blockdays there will be during lecture."""
        self._num_blockdays_during_lecture = numBdDuringLecture

    def get_num_blockdays_during_lecture(self):
        """Read out how much blockdays there will during lecture."""
        return self._num_blockdays_during_lecture

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
    

    #--- foreign keys ----



    def set_projecttype_id(self, id):
        
        self._projecttype_id = id


    def get_projecttype_id(self):
        
        return self._projecttype_id


    def set_professor_id(self, id):
        
        self._professor_id = id


    def get_professor_id(self):
        
        return self._professor_id



    """def __str__(self):

        #Creats a simple textually Representation of a Project() instanz.
        

        return "Project:  {}, {}, {}, {}, {}, {}, {}, {} ".format(self.get_project_id(),self.get_project_name(),self.get_link(),self.get_short_description(),self.get_project_professor(),self.get_module(),self.get_project_type(),self.get_nom_of_spots())"""


    @staticmethod
    def to_dict(dicti=dict()):

        #Convert  a Python dict() in a Project().
        project = Project()
        project.set_project_id(dicti["project_id"])
        project.set_project_name(dicti["project_name"])
        project.set_date(dicti["creation_date"])
        project.set_short_description(dicti["short_description"])
        project.set_link(dicti["link"])
        project.set_room_desired(dicti["room_desired"])
        project.set_grade_average(dicti["grade_average"])
        project.set_num_blockdays_in_exam(dicti["num_blockdays_in_exam"])
        project.set_blockdays_in_exam(dicti["blockdays_in_exam"])
        project.set_special_room(dicti["special_room"])
        project.set_date_blockdays_during_lecture(dicti["date_blockdays_during_lecture"])
        project.set_num_blockdays_prior_lecture(dicti["num_blockdays_prior_lecture"])
        project.set_blockdays_prior_lecture(dicti["blockdays_prior_lecture"])
        project.set_num_blockdays_during_lecture(dicti["num_blockdays_during_lecture"])
        project.set_blockdays_during_lecture(dicti["blockdays_during_lecture"])
        project.set_weekly(dicti["weekly"])
        project.set_num_spots(dicti["num_spots"])
        project.set_projecttype_id(dicti["id"])
        project.set_professor_id(dicti["id"])



        return project
















