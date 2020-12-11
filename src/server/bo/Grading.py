from server.bo import BusinessObject as bo


class Grading(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._grade = 0.0

    def get_grade(self):
        """Reads out the grading"""
        return self._grade

    def set_grade(self, grade):
        """Sets the grading"""
        self._grade = grade


    @staticmethod
    def from_dict(dicti=dict()):

        """"Convert  a Python dict() in a Grading()."""
        grading = Grading()
        grading.set_grade(dicti["grade"])
        return grading


