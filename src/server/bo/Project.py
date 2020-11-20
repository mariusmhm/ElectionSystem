from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject




class Project(NamedBusinessObject):

    """Realisierung eines exemplarischen Projekts.

    Ein Projekt besitzt eine...
    Die Attribute werden für das anlegen eines Projekts benötigt .
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
        self.__project_type = Projcettype()
        self.__module = Module()
        self.__project_professor = User()
        self.__participation = Participation()

    def get_project_id(self):
        """Auslesen der ProjektID."""
        return self.__project_id

    def set_project_id(self, pid):
        """Setzen der ProjektID."""
        self.__project_id = pid

    def set_project_name(self, projectName):
        """Setzen der Projektnamens."""
        self.__project_name = projectName

    def get_project_name(self):
        """Auslesen des Projektnamens."""
        return self.__project_name

    def set_link(self, link):
        """Setzen des Links."""
        self.__link = link

    def get_link(self):
        """Auslesen des Links."""
        return self.__link

    def set_room_desired(self, room):
        """Setzen des gewünschten Raums."""
        self.__room_desired = room

    def get_room_desired(self):
        """Auslesen des gewünschten Raums."""
        return self.__room_desired

    def set_grade_average(self, grade):
        """Setzen der Durchschnittsnote ."""
        self.__grade_average = grade

    def get_grade_average(self):
        """Auslesen der Durchschnitssnote."""
        return self.__grade_average

    def set_num_of_spots(self, numSpots):
        """Setzen der Plätze."""
        self.__num_spots = numSpots

    def get_nom_of_spots(self):
        """Auslesen der Plätze."""
        return self.__num_spots

    def set_short_description(self, description):
        """Setzen der Kurzbeschreibung."""
        self.__short_decription = description

    def get_short_description(self):
        """Auslesen der Kurzbeschreibung."""
        return self.__short_decription

    def set_weekly(self, weeklyLecture):
        """Setzen ob es wöchentliche Vorlesung gibt."""
        self.__weekly = weeklyLecture

    def get_weekly(self):
        """Auslesen ob es wöchentliche Vorlesung gibt."""
        return self.__weekly

    def set_blockdays_during_lecture(self, bdDuringLecture):
        """Setzen ob es Blocktage während der Vorlesungszeit gibt ."""
        self.__blockdays_during_lecture = bdDuringLecture

    def get_blockdays_during_lecture(self):
        """Auslesen ob es Blocktage während der Vorlesungszeit gibt ."""
        return self.__blockdays_during_lecture

    def set_num_blockdays_during_lecture(self, numBdDuringLecture):
        """Setzen der Anzahl von Blocktagen während der  Vorlesungszeit ."""
        self.__num_blockdays_during_lecutre = numBdDuringLecture

    def get_num_blockdays_during_lecture(self):
        """Ausgeben der Anzahl von Blocktagen während der  Vorlesungszeit ."""
        return self.__num_blockdays_during_lecutre

    def set_blockdays_prior_lecture(self, bdPriorLecture):
        """Setzen der Anzahl von Blocktagen vor Vorlesungsbeginn ."""
        self.__blockdays_prior_lecturetrue = bdPriorLecture

    def get_blockdays_prior_lecture(self):
        """Auslesen der Anzahl von Blcktagen vor Vorlesungsbeginn ."""
        return self.__blockdays_prior_lecturetrue

    def set_num_blockdays_prior_lecture(self, numBdPriorLecture):
        """Setzen ob Blocktage vor Vorlesungsbeginn beginnt ."""
        self.__num_blockdays_prior_lecture = numBdPriorLecture

    def get_num_blockdays_prior_lecture(self):
        """Auslesen ob Blocktage vor Vorlesungsbeginn beginnt ."""
        return self.__num_blockdays_prior_lecture

    """get/set order change"""

    def get_date_blockdays_during_lecture(self):
        """Auslesen des Datums der Blocktage während Vorlesungszeit ."""
        return self.__date_blockdays_during_lecture

    def set_date_blockdays_during_lecture(self, dateBdDuringLecture):
        """Setzen des Datums der Blocktage während Vorlesungszeit ."""
        self.__date_blockdays_during_lecture = dateBdDuringLecture

    def get_special_room(self):
        """Auslesen speziellen Raums ."""
        return self.__special_room

    def set_special_room(self, specialRoom):
        """Setzen des speziellen Raums ."""
        self.__special_room = specialRoom

    def get_blockdays_in_exam(self):
        """Auslesen ob es Blocktage während der Prüfungsphase gibt ."""
        return self.__blockdays_in_exam

    def set_blockdays_in_exam(self, bdInExam):
        """Setzen ob es Blocktage während der Prüfungsphase gibt ."""
        self.__blockdays_in_exam = bdInExam

    def get_num_blockdays_in_exam(self):
        """Auslesen der Anzahl von Blocktage während der Prüfungsphase ."""
        return self.__num_blockdays_in_Exam

    def set_num_blockdays_in_exam(self, numBdInExam):
        """Setzen der Anzahl von Blocktagen während der Prüfungsphase."""
        self.__num_blockdays_in_Exam = numBdInExam

    def get_participation(self):
        """Auslesen Teilnehmerliste ."""
        return self.__participation

    def set_participation(self, participation):
        """Setzen der Teilnehmerliste."""
        self.__participation = participation

    def get_project_professor(self):
        """Auslesen des veranstaltenden Professoren ."""
        return self.__project_professor

    def set_project_professor(self, professor):
        """Setzen des veranstaltenden Professoren ."""
        self.__project_professor = professor

    def get_module(self):
        """Auslesen des zugeordneten Moduls ."""
        return self.__module

    def set_module(self, module):
        """Setzen des zugeordneten Moduls ."""
        self.__module = module

    def get_project_type(self):
        """Auslesen des  Projekttyps ."""
        return self.__project_type

    def set_project_type(self, projectType):
        """Setzen des zugeordneten Moduls ."""
        self.__project_type = projectType

    def __str__(self):

        """Erzeugen einer einfachen textuellen Darstellung der Projekt Instanz.

        Hier werden die wichtigesten Attribute wiedergegeben."""

        return "Project:  {}, {}, {}, {}, {}, {}, {}, {} ".format(self.get_project_id(),self.get_project_name(),self.get_link(),self.get_short_description(),self.get_project_professor(),self.get_module(),self.get_project_type(),self.get_nom_of_spots())

    @staticmethod
    def to_dict(dicti=dict()):

        """Umwandeln eines Python dict() in ein Projekt()."""
        project = Project()
        project.set_id(dicti["ProjectID"])
        project.set_name(dicti["ProjectName"])
        project.set_link(dicti["ProjectLink"])
        project.set_room_desired(dicti["ProjectRoomDesired"])
        return project

    """ 
    to be continued
    """

















