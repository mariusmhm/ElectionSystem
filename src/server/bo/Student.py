from server.bo.User import User


class Student(User):
    
    #Realization of a student class
    def __init__(self):
        super().__init__()
        self._matrikel_nr = ""
        self._study = ""


    def set_matrikel_nr(self, matrikel_nr):
        #Set the matrikel number of a Student
        self._matrikel_nr = matrikel_nr


    def get_matrikel_nr(self):
        #Get the matrikel number of a Student
        return self._matrikel_nr


    def set_study(self, study):
        #Set the study of a Student
        self._study = study


    def get_study(self):
        #Get the study of a Student
        return self._study


    def __str__(self):
        return "Student: {}, {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_date(), self.get_name(), self._firstname, self._mail, self._role, self._matrikel_nr, self._study)


    @staticmethod
    def to_dict(dicti=dict()):

        """Transform a Python dict() into a Student()."""
        student = Student()
        student.set_id(dicti["id"])
        student.set_date(dicti["creation_date"])
        student.set_name(dicti["name"])
        student.set_firstname(dicti["firstname"])
        student.set_mail(dicti["mail"])
        student.set_role(dicti["role"])
        student.set_matrikel_nr(dicti["matrikel_nr"])
        student.set_study(dicti["study"])
        return student
