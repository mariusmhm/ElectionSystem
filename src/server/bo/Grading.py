from server.bo.BusinessObject import BusinessObject


class Grading(NamedBusinessObject):
    def __init__(self):

        self.__grading = 0


    def get_grading(self):
        """Reads out the grading"""
        return self.__grading

    def set_grading(self, grade):
        """Sets the grading"""
        self.__grading = grade

    def __str__(self):

        """Creats a simple textually Representation of a Grading() instanz.
        """

        return "Project:  {} ".format(self.get_grading())

    @staticmethod
    def to_dict(dicti=dict()):

        """"Convert  a Python dict() in a Grading()."""
        grading = Grading()
        grading.set_grading(dicti["Grading"])
        return grading


