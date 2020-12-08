from server.bo import BusinessObject as bo




class Project(bo.BusinessObject):

    """Realization of an examplary Project.
    """

    def __init__(self):
        super().__init__()
        self._project_id = None
        self._project_name = None
        self._short_description = None

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
    


    @staticmethod
    def to_dict(dicti=dict()):

        #Convert  a Python dict() in a Project().
        project = Project()
        project.set_project_id(dicti["ProjectID"])
        project.set_project_name(dicti["ProjectName"])
        project.set_short_description(dicti["ShortDescription"])
        return project