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

        crs.execute("SELECT * FROM Students")
        tupsrc = crs.fetchall()

        for (student_id, creation_date, student_lastname,student_firstname, student_mail, student_role, matrikel_nr,
             student_study) in tupsrc:
            student = Student()
            student.set_id(student_id)
            student.set_creation_date(creation_date)
            student.set_lastname(student_lastname)
            student.set_firstname(student_firstname)
            student.set_email(student_mail)
            student.set_role(student_role)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(student_study)
            res.append(student)

        self._connection.commit()
        crs.close()

        return res

    def find_by_id(self, student_id):
        """Read out the student based on their id.
        : param student_id of the associated student.
        : return a student object with the id number."""

        result = None
        cursor = self._connection.cursor()
        command = "SELECT student_id, creation_date, student_lastname, student_firstname, student_mail," \
                  "student_role, matrikel_nr, student_study FROM Students WHERE student_id={}" \
                  .format(student_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (student_id, creation_date, student_lastname,student_firstname, student_mail, student_role, matrikel_nr,
             student_study) = tuples[0]
            student = Student()
            student.set_id(student_id)
            student.set_creation_date(creation_date)
            student.set_lastname(student_lastname)
            student.set_firstname(student_firstname)
            student.set_email(student_mail)
            student.set_role(student_role)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(student_study)
            result = student

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_name(self, student_lastname):
        """Read out all students based on their last name.
        : param name Last name of the associated student.
        : return A collection of student objects that are all students
            with the desired last name."""

        result = []
        crs = self._connection.cursor()
        crs.execute("SELECT student_id, creation_date, student_lastname, student_fristname, student_mail,"\
                    " student_role, matrikel_nr, student_study FROM Students WHERE student_lastname LIKE '{}'"\
                    " ORDER BY student_lastname"
                    .format(student_lastname))
        tuples = crs.fetchall()

        for (student_id, creation_date, student_lastname,student_firstname,
             student_mail, student_role, matrikel_nr,student_study) in tuples:
            student = Student()
            student.set_id(student_id)
            student.set_creation_date(creation_date)
            student.set_lastname(student_lastname)
            student.set_firstname(student_firstname)
            student.set_email(student_mail)
            student.set_role(student_role)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(student_study)
            result.append(student)

        self._connection.commit()
        crs.close()

        return result

    def find_by_email(self, student_mail):
        """Read out all students based on the assigned e-mail address.
        : param (student_mail) E-mail address of the associated student.
        : return the student object that contain
            the desired email address."""
        result = None
        cursor = self._connection.cursor()
        command = "student_id, creation_date, student_lastname, student_firstname, student_mail," \
                  "student_role, matrikel_nr, student_study FROM Students WHERE mail={}".format(student_mail)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (student_id, creation_date, student_lastname, student_firstname, student_mail,
                student_role, matrikel_nr, student_study ) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_lastname(student_lastname)
            student.set_firstname(student_firstname)
            student.set_email(student_mail)
            student.set_role(student_role)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(student_study)
            result = student
        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
            does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_matrikel_nr(self, matrikel_nr):
        """Read out of the student based on the assigned matricle number.
        : param (matricle_nr) matricle number of the associated student.
        : return the student object that contain the student
            with the desired matricle number."""
        result = None

        cursor = self._connection.cursor()
        command = "SELECT student_id, creation_date, student_lastname, student_firstname, student_mail," \
                  "student_role,matrikel_nr,student_study FROM student WHERE matrikel_nr='{}'".format(matrikel_nr)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (student_id, creation_date, student_lastname,student_firstname, student_mail, student_role, matrikel_nr,
             student_study) = tuples[0]
            student = Student()
            student.set_id(student_id)
            student.set_creation_date(creation_date)
            student.set_lastname(student_lastname)
            student.set_firstname(student_firstname)
            student.set_email(student_mail)
            student.set_role(student_role)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(student_study)
            result = student

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_student_study(self, student_study):
        """Read out all students based on their study field.
            : param (study_field) study field of the associated students.
            : return A collection of student objects that are all students
             with the desired study field."""
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT student_id, creation_date, student_lastname, student_firstname, student_mail,"
                     "student_role, matrikel_nr, student_study FROM student WHERE student_study='{}'".format(student_study))
        tuples = cursor.fetchall()

        for (student_id, creation_date, student_lastname, student_firstname, student_mail, student_role, matrikel_nr,
             student_study) in tuples:
            student = Student()
            student.set_id(student_id)
            student.set_creation_date(creation_date)
            student.set_lastname(student_lastname)
            student.set_firstname(student_firstname)
            student.set_email(student_mail)
            student.set_role(student_role)
            student.set_matrikel_nr(matrikel_nr)
            student.set_study(student_study)
            result.append(student)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, student):
        """Insertion of a student object into the database.

        The primary key of the transferred object is also checked and if necessary
        corrected.

        : param student the object to be saved
        : return the object that has already been transferred, but with a possibly corrected ID.
        """
        crs = self._connection.cursor()
        crs.execute("SELECT MAX(id) AS maxid FROM Students")
        tuples = crs.fetchall()

        for (maxid) in tuples:
            student.set_id(maxid[0]+1)

            crs.execute("INSERT INTO Students(student_id, creation_date,student_lastname,"
                        "student_firstname,student_mail, student_role, matrikel_nr, student_study)"
                        "VALUES ('{}', '{}','{}', '{}', '{}', '{}', '{}', '{}')"
                        .format(student.get_id(), student.get_creation_date(), student.get_lastname(),
                                student.get_firstname(), student.get_email(),
                                student.get_role(), student.get_matrikel_nr(), student.get_study()))
        
        self._connection.commit()
        crs.close()

        return student

    def delete(self, student):

        """Deleting the data of a student object from the database.
        : param student the "object" to be deleted from the DB"""

        crs = self._connection.cursor()
        crs.execute("DELETE FROM Students WHERE student_id={}".format(student.get_id()))

        self._connection.commit()
        crs.close()

    def update(self, student):

        """Repeated writing of an object to the database.
            : param student the object to be written into the DB"""
        cursor = self._connection.cursor()

        command = "UPDATE students " + "SET creation_date=%s, student_lastname=%s, " \
                                       "student_firstname," \
                                       "student_mail=%s, student_role=%s, matrikel_nr=%s" \
                                       "student_study WHERE student_id=%s"
        data = (student.get_creation_date(), student.get_lastname(),student.get_firstname(), student.get_email(),
                student.get_role(), student.get_matrikel_nr(), student.get_study(),student.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()


""" Only For Testing / Not Professional AND DOES NOT WORK CURRENTLY"""
""" if (__name__ == "__main__"):
    with StudentMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p) """