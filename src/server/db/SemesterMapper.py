from server.bo.Semester import Semester
from server.db.Mapper import Mapper

class SemesterMapper(Mapper):
    """Mapper class, that maps the semester objects on relational
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

        crs.execute("SELECT * FROM Semester")
        tupsrc = crs.fetchall()

        for (semester_id, creation_date, semester_name, wintersemester,submit_projects_end_date, grading_end_date) in tupsrc:
            semester = Semester()
            semester.set_id(semester_id)
            semester.set_name(semester_name)
            semester.set_creation_date(creation_date)
            semester.set_wintersemester(wintersemester)
            semester.set_submit_projects_end_date(submit_projects_end_date)
            semester.set_grading_end_date(grading_end_date)
            res.append(semester)

        self._connection.commit()
        crs.close()

        return res


    def find_by_id(self, semester_id):
        """Read out the semester based on their id.
        : param student_id of the associated student.
        : return a student object with the id number."""

        result = None
        cursor = self._connection.cursor()
        command = "SELECT semester_id, semester_name, creation_date, wintersemester, grading_end_date, submit_projects_end_date FROM semester WHERE student_id={}".format(semester_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, semester_name, wintersemester, grading_end_date, submit_projects_end_date) = tuples[0]
            semester = Semester()
            semester.set_id(id)
            semester.set_name(semester_name)
            semester.set_creation_date(creation_date)
            semester.set_wintersemester(wintersemester)
            semester.set_submit_projects_end_date(submit_projects_end_date)
            semester.set_grading_end_date(grading_end_date)
            result = semester

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_grading_end_date(self, grading_end_date):
        """Read out the semester based on their grading end date.
                : param grading_end_Date of the associated semester.
                : return a semester object with the grading end date."""

        result = None

        cursor = self._connection.cursor()
        command = "SELECT semester_id, creation_date, semester_name, wintersemester, grading_end_date, submit_projects_end_date FROM semester WHERE student_id={}".format(grading_end_date)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, wintersemester, semester_name, grading_end_date, submit_projects_end_date) = tuples[0]
            semester = Semester()
            semester.set_id(id)
            semester.set_creation_date(creation_date)
            semester.set_name(semester_name)
            semester.set_wintersemester(wintersemester)
            semester.set_submit_projects_end_date(submit_projects_end_date)
            semester.set_grading_end_date(grading_end_date)
            result = semester

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()

        return result
         
    def insert(self, semester):
        """Insertion of a semester object into the database.

                The primary key of the transferred object is also checked and if necessary
                corrected.

                : param semester the object to be saved
                : return the object that has already been transferred, but with a possibly corrected ID.
                """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM semester_id ")
        tuples = cursor.fetchall()
        
        for (maxid) in tuples:
            if maxid[0] is not None:
                """
                If we determine a central ID we use this
                by 1 and assign this value as the ID to the semester object. """
                semester.set_id(maxid[0] + 1)
            else:
                """If we CAN'T find a maximum ID, let's
                assume that the table is empty and that we can start with ID 1. """
                semester.set_id(1)
                
            command = "INSERT INTO semester (semester_id, creation_date, semester_name wintersemester, submit_projects_end_date, email, role VALUES (%s,%s,%s,%s,%s,%s)"
            data = (semester.get_id(), semester.creation_date(), semester.get_submit_projects_end_date(),semester.get_grading_end_date(),semester.get_wintersemester(),)
            cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return semester
    
    def update(self, semester):
        
        """Repeated writing of an object to the database.
        : param semester the object that is to be written to the DB"""
        
        cursor = self._connection.cursor()

        command = "UPDATE semester " + "SET wintersemester=%s, semester_name=%s, semester_id=%s, creation_date=%s, submit_projects_end_date=%s, grading_end_date=%s  WHERE semester_id=%s"
        data = (semester.get_wintersemester(), semester.get_name(), semester.get_id(), semester.get_grading_end_date(), semester.get_submit_projects_end_date())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
        
        
    def delete(self, semester):
        """Deleting the data of a semester object from the database.

        : param semester the "object" to be deleted from the DB
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM semester WHERE id={}".format(semester.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()







