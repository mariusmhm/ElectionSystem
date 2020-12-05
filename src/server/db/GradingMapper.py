from server.bo.Grading import Grading
from server.db.Mapper import Mapper


class GradingMapper (Mapper):

    def __init__(self):
        super().__init__()

    """Mapper class, that maps the grading objects on relational
        Database. To do this, a number of methods are available
        with the help of which Objects can be searched, created, modified and
        deleted. The mapping is bidirectional. Objects
        can be converted into DB structures and DB structures into objects."""

    def find_all(self):
         """Reads out all gradings.
              :return A collection of grading objects that represent all grading."""

         res = []
         crs = self._connection.cursor()

         crs.execute("SELECT * FROM Grading")
         tupsrc = crs.fetchall()

         for (grading, grading_id, creation_date, grading) in tupsrc:
            grading = Grading()
            grading.set_id(grading_id)
            grading.set_creation_date(creation_date)
            grading.set_grading(grading)
            res.append(grading)

         self._connection.commit()
         crs.close()

         return res

    def find_by_id(self, grading_id):
        """Read out the grading based on their id.
        : param grading_id of the associated grading.
        : return a grading object with the id number."""

        res = None
        cursor = self._connection.cursor()
        command = "SELECT grading_id, creation_date, grading FROM Grading WHERE grading_id={}".format(grading_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (grading_id, creation_date, grading)= tuples[0]
            grading = Grading()
            grading.set_id(grading_id)
            grading.set_creation_date(creation_date)
            grading.set_grading(grading)
            res = grading

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
            does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            res = None

        self._connection.commit()
        cursor.close()
        return res

    def insert(self, grading):
        """Insertion of a grading object into the database.

        The primary key of the transferred object is also checked and if necessary
        corrected.

        : param grading, the object to be saved
        : return the object that has already been transferred, but with a possibly corrected ID.
        """

        crs = self._connection.cursor()
        crs.execute("SELECT MAX(id) AS maxid FROM Grading")
        tuples = crs.fetchall()

        for (maxid) in tuples:
            grading.set_id(maxid[0]+1)

            crs.execute("INSERT INTO Grading(grading_id, creation_date,grading)"
                        "VALUES ('{}', '{}','{}')"
                        .format(grading.get_id(), grading.get_creation_date(), grading.get_grading()))

        self._connection.commit()
        crs.close()

        return grading

    def delete(self, grading):
        """Deleting the data of a grading object from the database.
        : param module the "object" to be deleted from the DB"""

        crs = self._connection.cursor()
        crs.execute("DELETE FROM Grading WHERE grading_id={}".format(grading.get_id()))

        self._connection.commit()
        crs.close()


    def update(self, grading):
         """Repeated writing of an grading object to the database.
            : param grading the object to be written into the DB"""

         cursor = self._connection.cursor()

         command = "UPDATE grading " + "SET creation_date=%s, grading_id=%s,  grading=%s"
         data = (grading.get_creation_date(), grading.get_id(), grading.get_grading())
         cursor.execute(command, data)




