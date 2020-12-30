from server.bo.NamedBusinessObject import NamedBusinessObject





class Project(NamedBusinessObject):

    """Realization of an examplary Project. Test
    """

    def __init__(self):
        super().__init__()

        self.participation_id = None
        self.module_id = None
        self.projecttype_id = None
        self.professor_id = None
        self._additional_professor = None


        self._short_description = ""
        self._link = ""
        self._room_desired = ""
        self._room_necessary = True
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
        self._language = ""




    def set_room_necessary(self, room):
        """Sets if a room is necessary for the project."""
        self._room_necessary = room

    def get_room_necessary(self):
        """Reads out if room is necessary."""
        return self._room_necessary

    def set_language(self, language):
        """Sets  the language of the project."""
        self._language = language

    def get_language(self):
        """Read out out the language of the project."""
        return self._language

    def set_short_description(self, description):
        """Sets  the short description of the project."""
        self._short_description = description 
    
    def get_short_description(self):
        """Read out the short description of the project."""
        return self._short_description

    def set_link(self, link):
        """Sets  the link of the project."""
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

    def set_participation_id(self, id):
        """Sets  the participation of the project."""
        self._participation_id = id


    def get_participation_id(self):
        """Reads out  the participation of the project."""
        return self._participation_id


    def set_projecttype_id(self, id):
        """Sets  the project tyoe of the project."""
        self._projecttype_id = id


    def get_projecttype_id(self):
        """Reads out the project type of the project."""
        return self._projecttype_id


    def set_professor_id(self, id):
        """Sets  the professor  of the project."""
        self._professor_id = id


    def get_professor_id(self):
        """Returns  the professor of the project."""
        return self._professor_id

    def set_module_id(self, module):
        """Sets the modoule of the project"""
        self.module_id = module

    def get_module_id(self):
        return self.module_id

    def set_additional_prof(self, prof):
        """Set the additional professor of the project"""
        self._additional_professor = prof

    def get_additional_prof(self):
        """Readsout the additional professor"""
        return self._additional_professor




    def __str__(self):

        """Creats a simple textually Representation of a Project() instanc.
        """

        return "Project:  {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ".\
            format(self.get_id(),self.get_name(), self.get_date() ,self.get_link(),self.get_short_description(),
                   self.get_room_necessary(), self.get_professor_id(),self.get_module_id(),self.get_projecttype_id(),
                   self.get_num_spots())


    @staticmethod
    def to_dict(dicti=dict()):

        """"Convert  a Python dict() in a Participation()."""
        project = Project()
        project.set_id(dicti["id"])
        project.set_name(dicti["name"])
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
        project.set_participation_id(dicti["id"])
        project.set_projecttype_id(dicti["id"])
        project.set_professor_id(dicti["id"])
        project.set_room_necessary(dicti["room_necessary"])
        project.set_additional_prof(dicti["additional_professor"])
        project.set_module_id(dicti["module_id"])
        return project
















