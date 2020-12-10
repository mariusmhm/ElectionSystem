from server.bo.Projecttype import Projecttype
from server.db.Mapper import Mapper


class ProjecttypeMapper(Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):
        """Read out all projecttype.
        :return A collection of projecttypes objects that all projecttype represent."""

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Projecttype")
        tupsrc = crs.fetchall()

        for (p_id, creation_date, ects, sws) in tupsrc:
            projecttype = Projecttype()
            projecttype.set_id(p_id)
            projecttype.set_creation_date(creation_date)
            projecttype.set_ects(ects)
            projecttype.set_sws(sws)
            res.append(projecttype)

        self._connection.commit()
        crs.close()
        return res

    def find_by_id(self, id):
        """Read out the projecttype type based on their id.
        : param projecttype_id of the associated projecttype.
        : return a projecttype object with the id number."""

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Projecttype WHERE id={}".format(id))
        tupsrc = crs.fetchall()

        for (p_id, creation_date, sws, ects) in tupsrc:
            projecttype = Projecttype()
            projecttype.set_id(p_id)
            projecttype.set_creation_date(creation_date)
            projecttype.set_sws(sws)
            projecttype.set_ects(ects)
            res.append(projecttype)

        self._connection.commit()
        crs.close()

        return res

    def insert (self, projecttype):
        """Insertion of a projecttype object into the database.
        The primary key of the transferred object is also checked and if necessary
        corrected.
        : param projecttype the object to be saved
        : return the object that has already been transferred, but with a possibly corrected ID.
        """

        crs = self._connection.cursor()

        crs.execute("SELECT MAX(id) AS maxid FROM Projecttype ")
        tupsrc = crs.fetchall()

        for (maxid) in tupsrc:
            if maxid[0] is not None:
                projecttype.set_id(maxid[0] + 1)
            else:
                projecttype.set_id(1)

        cmd = "INSERT INTO Projecttype (id, creation_date, ects, sws) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        data = (projecttype.get_id(), projecttype.get_creation_date(), projecttype.get_ects(), projecttype.get_sws())
        crs.execute(cmd, data)

        self._connection.commit()
        crs.close()

        return projecttype

    def update(self, projecttype):
        """Repeated writing of an projecttype object to the database.
            : param projecttype the object to be written into the DB"""

        crs = self._connection.cursor()

        cmd = "SET (creation_date=%s, ects=%s, sws=%s) WHERE id=%s"
        data = (projecttype.get_creation_date(), projecttype.get_ects(), projecttype.get_sws())
        crs.execute("UPDATE Projecttype ", cmd, data)

        self._connection.commit()
        crs.close()

        return projecttype

    def delete(self, projecttype):

        crs = self._connection.cursor()

        crs.execute("DELETE FROM Projecttype WHERE id={}".format(projecttype))

        self._connection.commit()
        crs.close()





"""---------------Name-------------------"""


"""def find_by_name(self, projecttype_name):
        #Read out all projecttype based on their name.
        #:param projecttype_name of the associated projecttype.
        #: return A collection of projecttypes objects
        #with the desired name.

        res = []
        crs = self._connection.cursor()
        crs.execute("SELECT projecttype_id, creation_date, projecttype_name, sws, ects"/
                    " FROM Projecttype WHERE projecttype_name LIKE '{}'"/
                    " ORDER BY projecttype_name"
                    .format(projecttype_name))

        tuples = crs.fetchall()

        try:
            (projecttype_id, creation_date, projecttype_name, sws, ects) = tuples[0]
            projecttype = Projecttype()
            projecttype.set_id(projecttype_id)
            projecttype.set_creation_date(creation_date)
            projecttype.set_name(projecttype_name)
            projecttype.set_sws(sws)
            projecttype.set_ects(ects)
            res = projecttype

        except IndexError:
            #The IndexError will occur above when accessing tuples [0] when the previous SELECT call
            #does not return tuples, but tuples = cursor.fetchall () returns an empty sequence.
            res = None

        self._connection.commit()
        crs.close()

        return res"""
