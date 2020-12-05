from server.bo import BusinessObject as bo




class Project(bo.BusinessObject):

    """Realization of an examplary Project.
    """

    def __init__(self):
        super().__init__()
        self._project_id = None
        self._project_name = None
        self._project_description = None

    def set_project_id(self, id):
        return self._project_id == id
    
    def get_project_id(self):
        return self._project_id

    def set_project_name(self, name):
        return self._project_name == name 
    
    def get_project_name(self):
        return self._project_name

    def set_project_description(self, description):
        return self._project_description == description 
    
    def get_project_description(self):
        return self._project_description
    


    @staticmethod
    def to_dict(dicti=dict()):

        #Convert  a Python dict() in a Project().
        project = Project()
        project.set_project_id(dicti["Project_ID"])
        project.set_name(dicti["ProjectName"])
        project.set_link(dicti["ProjectLink"])
        project.set_room_desired(dicti["ProjectRoomDesired"])
        return project















