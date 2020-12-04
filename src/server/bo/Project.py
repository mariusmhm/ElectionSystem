from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject





class Project(NamedBusinessObject):

    """Realization of an examplary Project.
    """

    def __init__(self):
        super().__init__()
        self.__project_id = []
        self.__project_name = None
        self.__project_description = None

    def __str__(self):

        """Creats a simple textually Representation of a Project() instanz.
        """

        return "Project:  {}, {}, {}, {}, {}, {}, {}, {} ".format(self.get_project_id(),self.get_project_name(),self.get_link(),self.get_short_description(),self.get_project_professor(),self.get_module(),self.get_project_type(),self.get_nom_of_spots())

    @staticmethod
    def to_dict(dicti=dict()):

        #Convert  a Python dict() in a Project().
        project = Project()
        project.set_id(dicti["Project_ID"])
        project.set_name(dicti["ProjectName"])
        project.set_link(dicti["ProjectLink"])
        project.set_room_desired(dicti["ProjectRoomDesired"])
        return project















