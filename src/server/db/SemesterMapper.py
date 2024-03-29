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
        """Read out all semesters.
        :return A collection of semester objects that all semester represent."""

        res = None
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Semester")
        tupsrc = crs.fetchall()

        for (id, creation_date, name, submit_projects, grading, election) in tupsrc:
            semester = Semester()
            semester.set_id(id)
            semester.set_date(creation_date)
            semester.set_name(name)
            semester.set_submit_projects(submit_projects)
            semester.set_grading(grading)
            semester.set_election(election)
            res = semester

        self._connection.commit()
        crs.close()

        return res

    def find_by_id(self, id):
        """Read out the semester based on their id.
        : param id of the associated semester.
        : return a semester object with the id number."""

        result = None
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM Semester WHERE id={}".format(id))
        tuples = cursor.fetchall()

        try:
            (id, creation_date, name, submit_projects, grading, election) = tuples[0]
            semester = Semester()
            semester.set_id(id)
            semester.set_date(creation_date)
            semester.set_name(name)
            semester.set_submit_projects(submit_projects)
            semester.set_grading(grading)
            semester.set_election(election)
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
        cursor.execute("SELECT MAX(id) AS maxid FROM Semester ")
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

            command = "INSERT INTO Semester (id, creation_date, name, submit_projects, grading, election) VALUES (%s,%s,%s,%s,%s,%s)"
            data = (semester.get_id(), semester.get_date(), semester.get_name(), semester.get_submit_projects(), semester.get_grading(), semester.get_election())
            cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return semester

    def update(self, semester):
        """Repeated writing of an object to the database.
        : param semester the object that is to be written to the DB"""
        cursor = self._connection.cursor()
        cmd = "UPDATE Semester" + " SET creation_date=%s, name=%s, submit_projects=%s, grading=%s, election=%s WHERE id=%s"
        data = (semester.get_date(), semester.get_name(), semester.get_submit_projects(), semester.get_grading(), semester.get_election(), semester.get_id())
        cursor.execute(cmd, data)

        self._connection.commit()
        cursor.close()

    def delete(self, semester):
        """Deleting the data of a semester object from the database.
        : param semester the "object" to be deleted from the DB
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM Semester WHERE id={}".format(semester.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
