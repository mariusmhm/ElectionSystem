from server.bo.Student import Student
from server.db.Mapper import Mapper


class StudentMapper(Mapper):
    """Mapper class, that maps the student objects on relational
    Database. To do this, a number of methods are available
    with the help of which Objects can be searched, created, modified and
    deleted. The mapping is bidirectional. Objects
    can be converted into DB structures and DB structures into objects."""
    def __init__(self):
        super().__init__()


    def find_all(self):
        """Read out all students.
        :return A collection of student objects that all students represent."""

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Student")
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, student_firstname, mail, role, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_firstname(student_firstname)
            student.set_mail(mail)
            student.set_role(role)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res


    def find_by_id(self, id):
        
        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Student WHERE id={}".format(id))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, student_firstname, mail, role, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_firstname(student_firstname)
            student.set_mail(mail)
            student.set_role(role)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res


    def find_by_name(self, name):
        
        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Student WHERE name LIKE '{}' ORDER BY name".format(name))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, student_firstname, mail, role, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_firstname(student_firstname)
            student.set_mail(mail)
            student.set_role(role)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res


    def find_by_mail(self, mail):
        
        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Student WHERE mail LIKE '{}' ORDER BY mail".format(mail))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, student_firstname, mail, role, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_firstname(student_firstname)
            student.set_mail(mail)
            student.set_role(role)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res


    def find_by_matrikel_nr(self, matrikel_nr):
        
        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Student WHERE matrikel_nr={}".format(matrikel_nr))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, student_firstname, mail, role, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_firstname(student_firstname)
            student.set_mail(mail)
            student.set_role(role)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res


    def find_by_study(self, study):
        
        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Student WHERE study LIKE '{}' ORDER BY study".format(study))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, student_firstname, mail, role, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_firstname(student_firstname)
            student.set_mail(mail)
            student.set_role(role)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res


    def insert (self, student):

        crs = self._connection.cursor()

        crs.execute("SELECT MAX(id) AS maxid FROM Student ")
        tupsrc = crs.fetchall()

        for (maxid) in tupsrc:
            if maxid[0] is not None:
                student.set_id(maxid[0] + 1)
            else:
                student.set_id(1)

        cmd = "INSERT INTO Student (id, name, creation_date, student_firstname, mail, matrikel_nr, role, study) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        data = (student.get_id(), student.get_name(), student.get_date(), student.get_firstname(), student.get_mail(), student.get_matrikel_nr(), student.get_role(), student.get_study())
        crs.execute(cmd, data)

        self._connection.commit()
        crs.close()

        return student


    def update(self, student):

        crs = self._connection.cursor()

        cmd = "SET (name=%s, creation_date=%s, student_firstname=%s, mail=%s, matrikel_nr=%s, role=%s, study=%s) WHERE id=%s"
        data = (student.get_name(), student.get_date(), student.get_firstname(), student.get_mail(), student.get_matrikel_nr(), student.get_role(), student.get_study(), student.get_id())
        crs.execute("UPDATE Student ", cmd, data)

        self._connection.commit()
        crs.close()

        return student      


    def delete(self, student):

        crs = self._connection.cursor()

        crs.execute("DELETE FROM Student WHERE id={}".format(student))

        self._connection.commit()
        crs.close()
