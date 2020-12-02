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

        for (semester_id, creation_date, wintersemester,submit_projects_end_date, grading_end_date) in tupsrc:
            semester = Semester()
            semester.set_id(semester_id)
            semester.set_creation_date(creation_date)
            semester.set_wintersemester(wintersemester)
            semester.set_submit_projects_end_date(submit_projects_end_date)
            semester.set_grading_end_date(grading_end_date)
            res.append(semester)

        self._connection.commit()
        crs.close()

        return res


    def find_by_id(self, student_id):
        """Read out the semester based on their id.
        : param student_id of the associated student.
        : return a student object with the id number."""

        result = None
        cursor = self._connection.cursor()
        command = "SELECT semester_id, creation_date, wintersemester, grading_end_date, submit_projects_end_date FROM semester WHERE student_id={}".format(semester_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, wintersemester, grading_end_date, submit_projects_end_date) = tuples[0]
            semester = Semester()
            semester.set_id(id)
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

    def find_by_grading_end_date(self,grading_end_date):
        """Read out the semester based on their grading end date.
                : param grading_end_Date of the associated semester.
                : return a semester object with the grading end date."""

        result = None

        cursor = self._connection.cursor()
        command = "SELECT semester_id, creation_date, wintersemester, grading_end_date, submit_projects_end_date FROM semester WHERE student_id={}".format(grading_end_date)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, wintersemester, grading_end_date, submit_projects_end_date) = tuples[0]
            semester = Semester()
            semester.set_id(id)
            semester.set_creation_date(creation_date)
            semester.set_wintersemester(wintersemester)
            semester.set_submit_projects_end_date(submit_projects_end_date)
            semester.set_grading_end_date(grading_end_date)
            result.append(semester)

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_submit_projects_end_date(self,submit_projects_end_date):
        """Read out all semesters based on their submit_projects_end_date.
                : param submit_projects_end_date of the semester.
                : return A collection of user objects that are all semester
                    with the desired submit_projects_end_date."""



#to be continued 





