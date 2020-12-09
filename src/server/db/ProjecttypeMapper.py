from server.bo.Projecttype import Projecttype
from server.db.Mapper import Mapper


class ProjecttypeMapper(Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):
        """Reads out all project types.
              :return A collection of module objects that represent all project types."""

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Projecttype")
        tupsrc = crs.fetchall()

        for (projecttype_id, creation_date, projecttype_name, sws, ects) in tupsrc:
            projecttype = Projecttype()
            projecttype.set_id(projecttype_id)
            projecttype.set_creation_date(creation_date)
            projecttype.set_name(projecttype_name)
            projecttype.set_sws(sws)
            projecttype.set_ects(ects)
            res.append(projecttype)

            self._connection.commit()
            crs.close()

            return res

    def find_by_id(self, projecttype_id):
        """Read out the project type based on their id.
        : param projecttype_id of the associated projecttype.
        : return a projecttype object with the id number."""

        res = None
        crs = self._connection.cursor()
        command = "SELECT projecttype_id, creation_date, projecttype_name, sws, ects={}".format(projecttype_id)

        crs.execute(command)
        tuples = crs.fetchall()

        try:
            (projecttype_id, creation_date, projecttype_name, sws, ects)= tuples[0]
            projecttype = Projecttype()
            projecttype.set_id(projecttype_id)
            projecttype.set_creation_date(creation_date)
            projecttype.set_name(projecttype_name)
            projecttype.set_sws(sws)
            projecttype.set_ects(ects)
            res = projecttype

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
            does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            res = None

        self._connection.commit()
        crs.close()
        return res

    def find_by_name(self, projecttype_name):
        """Read out all projecttype based on their name.
        : param projecttype_name of the associated projecttype.
        : return A collection of projecttypes objects
        with the desired name."""

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
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
            does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            res = None

        self._connection.commit()
        crs.close()

        return res

    def insert(self, projecttype):
        """Insertion of a p object into the database.
        The primary key of the transferred object is also checked and if necessary
        corrected.
        : param projecttype the object to be saved
        : return the object that has already been transferred, but with a possibly corrected ID.
        """
        crs = self._connection.cursor()
        crs.execute("SELECT MAX(id) AS maxid FROM Projecttype")
        tuples = crs.fetchall()

        for (maxid) in tuples:
            projecttype.set_id(maxid[0]+1)

            crs.execute("INSERT INTO Projecttype(projecttype_id, creation_date,projecttype_name,"
                        "sws, ects)"
                        "VALUES ('{}','{}','{}', '{}', '{}')"
                        .format(projecttype.get_id(), projecttype.get_creation_date(), projecttype.get_name(),
                                projecttype.get_sws(), projecttype.get_ects()))

        self._connection.commit()
        crs.close()

        return projecttype

    def delete(self, projecttype):

        """Deleting the data of a projecttype object from the database.
        : param projecttype the "object" to be deleted from the DB"""

        crs = self._connection.cursor()
        crs.execute("DELETE FROM Projecttype WHERE projecttype_id={}".format(projecttype.get_id()))

        self._connection.commit()
        crs.close()

    def update(self, projecttype):

        """Repeated writing of an project type object to the database.
            : param projectt ype the object to be written into the DB"""
        crs = self._connection.cursor()

        command = "UPDATE Projecttype " + "SET creation_date=%s, projecttype_id=%s, " \
                                        "projecttype_name=%s," \
                                        "sws=%s, ects=%s WHERE projecttype_id=%s"
        data = (projecttype.get_creation_date(), projecttype.get_id(),projecttype.get_name(), projecttype.get_sws(),
                projecttype.get_ects())
        crs.execute(command, data)

        self._connection.commit()
        crs.close()






       
