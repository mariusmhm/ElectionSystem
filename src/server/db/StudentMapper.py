from server.bo.Student import Student
from server.db.Mapper import Mapper


class StudentMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Students")
        tupsrc = crs.fetchall()

        for (StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy) in tupsrc:
            student = Student()
            student.set_id(StudentID)
            student.set_creationDate(CreationDate)
            student.set_name(StudentName)
            student.set_mail(StudentMail)
            student.set_password(StudentPW)
            student.set_role(StudentRole)
            student.set_matrikelNR(MatrikelNR)
            student.set_study(StudentStudy)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res

    def find_by_student_id(self, student_id):

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy FROM Students WHERE StudentID={} ORDER BY StudentID".format(student_id))
        tupsrc = crs.fetchall()

        for (StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy) in tupsrc:
            student = Student()
            student.set_id(StudentID)
            student.set_creationDate(CreationDate)
            student.set_name(StudentName)
            student.set_mail(StudentMail)
            student.set_password(StudentPW)
            student.set_role(StudentRole)
            student.set_matrikelNR(MatrikelNR)
            student.set_study(StudentStudy)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res

    def find_by_student_name(self, student_name):

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy FROM Students WHERE StudentID={} ORDER BY StudentName".format(student_name))
        tupsrc = crs.fetchall()

        for (StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy) in tupsrc:
            student = Student()
            student.set_id(StudentID)
            student.set_creationDate(CreationDate)
            student.set_name(StudentName)
            student.set_mail(StudentMail)
            student.set_password(StudentPW)
            student.set_role(StudentRole)
            student.set_matrikelNR(MatrikelNR)
            student.set_study(StudentStudy)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res

    def find_by_student_mail(self, student_mail):

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy FROM Students WHERE StudentID={} ORDER BY StudentMail".format(student_mail))
        tupsrc = crs.fetchall()

        for (StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy) in tupsrc:
            student = Student()
            student.set_id(StudentID)
            student.set_creationDate(CreationDate)
            student.set_name(StudentName)
            student.set_mail(StudentMail)
            student.set_password(StudentPW)
            student.set_role(StudentRole)
            student.set_matrikelNR(MatrikelNR)
            student.set_study(StudentStudy)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res

    def find_by_matrikel_nr(self, matrikel_nr):

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy FROM Students WHERE StudentID={} ORDER BY MatrikelNR".format(matrikel_nr))
        tupsrc = crs.fetchall()

        for (StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy) in tupsrc:
            student = Student()
            student.set_id(StudentID)
            student.set_creationDate(CreationDate)
            student.set_name(StudentName)
            student.set_mail(StudentMail)
            student.set_password(StudentPW)
            student.set_role(StudentRole)
            student.set_matrikelNR(MatrikelNR)
            student.set_study(StudentStudy)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res

    def find_by_student_study(self, student_study):
        
        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy FROM Students WHERE StudentID={} ORDER BY StudentStudy".format(student_study))
        tupsrc = crs.fetchall()

        for (StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy) in tupsrc:
            student = Student()
            student.set_id(StudentID)
            student.set_creationDate(CreationDate)
            student.set_name(StudentName)
            student.set_mail(StudentMail)
            student.set_password(StudentPW)
            student.set_role(StudentRole)
            student.set_matrikelNR(MatrikelNR)
            student.set_study(StudentStudy)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res

    def insert(self, student):

        crs = self._connection.cursor()
        crs.execute("SELECT MAX(id) AS MaxID FROM Students")
        tupsrc = crs.fetchall()

        for (MaxID) in tupsrc:
            student.set_id(MaxID[0]+1)

        crs.execute("INSERT INTO Students (StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy VALUES ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}')".format(student.get_id(), student.get_creationDate(), student.get_name(), student.get_mail(), student.get_password(), student.get_role(), student.get_matrikelNR(), student.get_study()))
        
        self._connection.commit()
        crs.close()

        return student

    def delete(self, student):

        crs = self._connection.cursor()
        crs.execute("DELETE FROM Students WHERE StudentID={}".format(student.get_id()))

        self._connection.commit()
        crs.close()

    def update(self, student):

        crs = self._connection.cursor()
        crs.execute("SELECT Students " + "SET CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy VALUES ('{}', '{}', '{}', '{}', '{}', '{}', '{}') WHERE StudentID={}".format(student.get_creationDate(), student.get_name(), student.get_mail(), student.get_password(), student.get_role(), student.get_matrikelNR(), student.get_study(), student.get_id()))

        self._connection.commit()
        crs.close()


""" Only For Testing / Not Professional AND DOES NOT WORK CURRENTLY"""
if (__name__ == "__main__"):
    with StudentMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)