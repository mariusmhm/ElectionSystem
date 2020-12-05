from server.bo.BusinessObject import BusinessObject

class Grading(BusinessObject):
    def __init__(self):
        super().__init__()
        self._grading = 0


    def get_grading(self):
        """Reads out the grading"""
        return self._grading

    def set_grading(self, grade):
        """Sets the grading"""
        self._grading = grade

    def __str__(self):

        """Creats a simple textually Representation of a Grading() instanz.
        """

        return "Project:  {} ".format(self.get_grading(),self.get_id(),self.get_creation_date() )

    @staticmethod
    def to_dict(dicti=dict()):

        """"Convert  a Python dict() in a Grading()."""
        grading = Grading()
        grading.set_grading(dicti["Grading"])
        grading.set_id(dicti["id"])
        grading.set_creation_date(dicti["creation_date"])
        return grading


