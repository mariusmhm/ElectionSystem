from server.bo.Projecttype import Projecttype
from server.db.Mapper import Mapper


class ProjecttypeMapper(Mapper):
    """Mapper class that maps projecttype objects to a relational database.
    database. For this a set of methods is made available, with
    methods, which can be used to search for, create, modify and delete objects.
    can be deleted. The mapping is bidirectional. I.e., objects can be
    be converted into DB structures and DB structures into objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Read out all projecttype.
        :return A collection of projecttypes objects that all projecttype represent."""

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Projecttype")
        tupsrc = crs.fetchall()

        for (p_id, creation_date, name, ect, sws) in tupsrc:
            projecttype = Projecttype()
            projecttype.set_id(p_id)
            projecttype.set_creation_date(creation_date)
            projecttype.set_name(name)
            projecttype.set_ect(ect)
            projecttype.set_sws(sws)
            res.append(projecttype)

        self._connection.commit()
        crs.close()

        return res

    def find_by_id(self, id):
        """Read out the projecttype type based on their id.
        : param projecttype_id of the associated projecttype.
        : return a projecttype object with the id number."""

        res = None
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Projecttype WHERE id={}".format(id))
        tupsrc = crs.fetchall()

        for (p_id, creation_date, name, sws, ect) in tupsrc:
            projecttype = Projecttype()
            projecttype.set_id(p_id)
            projecttype.set_creation_date(creation_date)
            projecttype.set_name(name)
            projecttype.set_sws(sws)
            projecttype.set_ect(ect)
            res = projecttype

        self._connection.commit()
        crs.close()

        return res

    def find_by_name(self, name):
        """Read out all projecttypes based on their name.
        :return A collection of projecttypes objects that all projecttypes represent."""

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Projecttype WHERE name LIKE '{}' ORDER BY name".format(name))
        tupsrc = crs.fetchall()

        for (p_id, name, creation_date, ect, sws) in tupsrc:
            projecttype = Projecttype()
            projecttype.set_id(p_id)
            projecttype.set_name(name)
            projecttype.set_creation_date(creation_date)
            projecttype.set_ect(ect)
            projecttype.set_sws(sws)
            res.append(projecttype)

        self._connection.commit()
        crs.close()

        return res

    def insert(self, projecttype):
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

        cmd = "INSERT INTO Projecttype (id, name, creation_date, ect, sws) VALUES (%s, %s, %s, %s, %s)"
        data = (projecttype.get_id(), projecttype.get_name(), projecttype.get_creation_date(), projecttype.get_ect(), projecttype.get_sws())
        crs.execute(cmd, data)

        self._connection.commit()
        crs.close()

        return projecttype

    def update(self, projecttype):
        """Repeated writing of an projecttype object to the database.
            : param projecttype the object to be written into the DB"""

        crs = self._connection.cursor()

        cmd = "UPDATE Projecttype + SET name=%s, creation_date=%s, ect=%s, sws=%s WHERE id=%s"
        data = (projecttype.get_name(), projecttype.get_creation_date(), projecttype.get_ect(), projecttype.get_sws())
        crs.execute(cmd, data)

        self._connection.commit()
        crs.close()

        return projecttype

    def delete(self, projecttype):

        crs = self._connection.cursor()

        crs.execute("DELETE FROM Projecttype WHERE id={}".format(projecttype.get_id()))

        self._connection.commit()
        crs.close()
