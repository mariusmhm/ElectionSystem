from server.bo.NamedBusinessObject import NamedBusinessObject
from server.bo.User import User
from server.Role import Role
from datetime import date


class Student(User):
    """Realization of an student class."""
    def __init__(self):
        super().__init__()
        self.__student_lastname = ""
        self.__student_firstname=""
        self.__mail = ""
        self.__role = Role()
        self.__matrikel_nr = 0
        self.__creation_date = date
        self.__study = ""

    def set_lastname(self, student_lastname):
        """Set the last name of a Student"""
        self.__student_lastname = student_lastname

    def get_lastname(self):
        """Get the last name of a Student"""
        return self.__student_lastname

    def set_firstname(self, student_firstname):
        """Set the first name of a Student"""
        self.__student_lastname = student_firstname

    def get_firstname(self):
        """Get the first name of a Student"""
        return self.__student_firstname

    def set_email(self, student_mail):
        """Set the email name of a Student"""
        self.__mail = student_mail

    def get_email(self):
        """Get the email of a Student"""
        return self.__mail

    def set_role(self, student_role):
        """Set the role of a Student"""
        self.__role = student_role

    def get_role(self):
        """Get the role of a Student"""
        return self.__role

    def set_matrikel_nr(self, matrikel_nr):
        """Set the matricle number of a Student"""
        self.__matrikel_nr = matrikel_nr

    def get_matrikel_nr(self):
        """Get the matricle number of a Student"""
        return self.__matrikel_nr

    def get_creation_date(self):
        """Get the creation date of a Student"""
        return self.__creation_date

    def set_creation_date(self, creation_date):
        """Set the creation date of a Student"""
        self.__creation_date = creation_date

    def set_study(self, student_study):
        """Set the study of a Student"""
        self.__study = student_study

    def get_study(self):
        """Get the study of a Student"""
        return self.__study

    def __str__(self):
        """Create a correct textual representation of the guideline instance.
        This consists of the ID of the super class, the first and last names
        of the student, matricle number, creation date, role and study"""
        return "Student: {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_creation_date(), self.get_lastname(),
                                                            self.get_firstname(),
                                                            self.get_email(),
                                                            self.get_role(), self.get_matrikel_nr(), self.get_study())

    @staticmethod
    def to_dict(dicti=dict()):

        """Transform a Python dict() into a Student()."""
        student = Student()
        student.set_id(dicti["student_id"])
        student.set_creation_date(dicti["creation_date"])
        student.set_lastname(dicti["student_lastname"])
        student.set_firstname(dicti["student_firstname"])
        student.set_email(dicti["student_mail"])
        student.set_role(dicti["student_role"])
        student.set_matrikel_nr(dicti["matrikel_nr"])
        student.set_study(dicti["student_study"])
        return student



