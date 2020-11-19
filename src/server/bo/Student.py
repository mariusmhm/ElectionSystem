from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject


class Student(NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self.__student_id = 0
        self.__student_name = ""
        self.__mail = ""
        self.__password = ""
        self.__role = ""
        self.__matrikelNR = ""
        self.__study = ""

    def set_id(self, StudentID):
        self.__student_id = StudentID

    def get_id(self):
        return self.__student_id

    def set_creationDate(self, CreationDate):
        self.__creationdate = CreationDate

    def get_creationDate(self):
        return self.__creationdate

    def set_name(self, StudentName):
        self.__student_name = StudentName

    def get_name(self):
        return self.__student_name

    def set_mail(self, StudentMail):
        self.__mail = StudentMail

    def get_mail(self):
        return self.__mail

    def set_password(self, StudentPW):
        self.__password = StudentPW

    def get_password(self):
        return self.__password

    def set_role(self, StudentRole):
        self.__role = StudentRole

    def get_role(self):
        return self.__role

    def set_matrikelNR(self, MatrikelNR):
        self.__matrikelNR = MatrikelNR

    def get_matrikelNR(self):
        return self.__matrikelNR

    def set_study(self, StudentStudy):
        self.__study = StudentStudy

    def get_study(self):
        return self.__study

    def __str__(self):
        return "Student: {}, {}, {}, {}, {}, {}, {}, {}".format(self.get_id, self.get_creationDate, self.get_name, self.get_mail, self.get_password, self.get_role, self.get_matrikelNR, self.get_study)

    @staticmethod
    def to_dict(dicti=dict()):
        student = Student()
        student.set_id(dicti["StudentID"])
        student.set_creationDate(dicti["CreationDate"])
        student.set_name(dicti["StudentName"])
        student.set_mail(dicti["StudentMail"])
        student.set_password(dicti["StudentPW"])
        student.set_role(dicti["StudentRole"])
        student.set_matrikelNR(dicti["MatrkelNR"])
        student.set_study(dicti["StudentStudy"])
        return student