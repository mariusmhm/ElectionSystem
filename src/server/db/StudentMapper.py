from server.bo.Student import Student
from server.db.Mapper import Mapper


class StudentMapper(Mapper):
    """Mapper class, that maps the student objects on relational
    Database. To do this, a number of methods are available, which
    help to search, create, modify and delete obejcts. 
    The mapping is bidirectional. Objects
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
        
        for (id, name, creation_date, google_user_id, firstname, mail, role_id, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_google_user_id(google_user_id)
            student.set_firstname(firstname)
            student.set_mail(mail)
            student.set_role_id(role_id)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res


    def find_by_id(self, id):
        """Reads out one student by id.
        :param id Unique id of the student
        :return A student object, which has the required id.
        """
        
        res = None
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Student WHERE id={}".format(id))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, google_user_id, firstname, mail, role_id, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_google_user_id(google_user_id)
            student.set_firstname(firstname)
            student.set_mail(mail)
            student.set_role_id(role_id)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res = student

        self._connection.commit()
        crs.close()

        return res

    def find_by_google_id(self, id):
        """Reads out the student by google id.
        :param google id Unique google id of the student
        :return A student object, which has the required google id.
        """
        
        res = None
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Student WHERE google_user_id LIKE '{}'".format(id))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, google_user_id, firstname, mail, role_id, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_google_user_id(google_user_id)
            student.set_firstname(firstname)
            student.set_mail(mail)
            student.set_role_id(role_id)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res = student

        self._connection.commit()
        crs.close()

        return res


    def find_by_name(self, name):
        """Reads out students by name.
        :param name of the student
        :return All student objects, which has the required name.
        """
        
        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Student WHERE name LIKE '{}' ORDER BY name".format(name))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, google_user_id, firstname, mail, role_id, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_google_user_id(google_user_id)
            student.set_firstname(firstname)
            student.set_mail(mail)
            student.set_role_id(role_id)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res


    def find_by_mail(self, mail):
        """Reads out the student by e-mail.
        :param mail of the student
        :return A student object, which has the required mail.
        """
        
        res = None
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Student WHERE mail LIKE '{}' ORDER BY mail".format(mail))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, google_user_id, firstname, mail, role_id, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_google_user_id(google_user_id)
            student.set_firstname(firstname)
            student.set_mail(mail)
            student.set_role_id(role_id)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res = student

        self._connection.commit()
        crs.close()

        return res


    def find_by_matrikel_nr(self, matrikel_nr):
        """Reads out student by matrikel number.
        :param matrikel number of the student
        :return Student object, which has the required matrikel number.
        """
        
        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Student WHERE matrikel_nr={}".format(matrikel_nr))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, google_user_id, firstname, mail, role_id, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_google_user_id(google_user_id)
            student.set_firstname(firstname)
            student.set_mail(mail)
            student.set_role_id(role_id)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res


    def find_by_study(self, study):
        """Reads out all students by study.
        :param study of the student
        :return All student objects, which has the required study.
        """
        
        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Student WHERE study LIKE '{}' ORDER BY study".format(study))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, google_user_id, firstname, mail, role_id, matrikel_nr, study) in tupsrc:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_date(creation_date)
            student.set_google_user_id(google_user_id)
            student.set_firstname(firstname)
            student.set_mail(mail)
            student.set_role_id(role_id)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(study)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res


    def insert (self, student):
        """Adds a student object into the database.
        The primary key of the object gets checked and if neccessary adjusted.
        :param student object which will be saved
        :return student object with the changed id
        """

        crs = self._connection.cursor()

        crs.execute("SELECT MAX(id) AS maxid FROM Student ")
        tupsrc = crs.fetchall()

        for (maxid) in tupsrc:
            if maxid[0] is not None:
                student.set_id(maxid[0] + 1)
            else:
                student.set_id(1)

        cmd = "INSERT INTO Student (id, name, creation_date, google_user_id, firstname, mail, role_id, matrikel_nr,  study) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        data = (student.get_id(), student.get_name(), student.get_date(), student.get_google_user_id(), student.get_firstname(), student.get_mail(), student.get_role_id(), student.get_matrikel_nr(), student.get_study())
        crs.execute(cmd, data)

        self._connection.commit()
        crs.close()

        return student


    def update(self, student):
        """Updates a student object in the database.
        :param student object which will be updated
        """

        crs = self._connection.cursor()

        cmd = "UPDATE Student " + "SET name=%s, creation_date=%s, google_user_id=%s, firstname=%s, mail=%s, matrikel_nr=%s, role_id=%s, study=%s WHERE id=%s"
        data = (student.get_name(), student.get_date(), student.get_google_user_id(), student.get_firstname(), student.get_mail(), student.get_matrikel_nr(), student.get_role_id(), student.get_study(), student.get_id())
        crs.execute(cmd, data)

        self._connection.commit()
        crs.close()

        return student      


    def delete(self, student):
        """Deletes a student object from the database.
        :param student object which will be deleted
        """

        crs = self._connection.cursor()

        crs.execute("DELETE FROM Student WHERE id={}".format(student.get_id()))

        self._connection.commit()
        crs.close()
        
