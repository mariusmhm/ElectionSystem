from server.bo import BusinessObject as bo

class Participation(bo.BusinessObject):
    """The implementation of a exemplary participation class.
    """

    def __init__(self):
        super().__init__()
        self._priority = None
        self._grading_id = None
        self._student_id = None
        self._project_id = None


    def get_priority(self):
        """Reads out the priority."""
        return self._priority

    def set_priority(self, priority):
        """Sets the priority."""
        self._priority = priority

    def get_grading_id(self):
        """Reads out the grading id."""
        return self._grading_id

    def set_grading_id(self, grading_id):
        """Sets the grading id."""
        self._grading_id = grading_id

    def get_student_id(self):
        """Reads out the student id."""
        return self._student_id

    def set_student_id(self, student_id):
        """Sets the student id."""
        self._student_id = student_id 

    def get_project_id(self):
        """Reads out the project id."""
        return self._project_id

    def set_project_id(self, project_id):
        """Sets the project id."""
        self._project_id = project_id 



    @staticmethod
    def from_dict(dicti=dict()):

        """"Converts a Python dict() into a Participation()."""
        participation = Participation()
        participation.set_date(dicti["creation_date"])
        participation.set_priority(dicti["priority"])
        participation.set_grading_id(dicti["grading_id"])
        participation.set_student_id(dicti["student_id"])
        participation.set_project_id(dicti["project_id"])
        return participation



