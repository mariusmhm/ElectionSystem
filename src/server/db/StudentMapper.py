from server.bo.Student import Student
from server.db.Mapper import Mapper


class StudentMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT StudentID, CreationDate, StudentName, StudentMail, StudentPW, StudentRole, MatrikelNR, StudentStudy FROM Students")
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

