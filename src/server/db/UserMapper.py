from server.bo.User import User
from server.db.Mapper import Mapper


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()
        """Mapper class, that maps the user objects on relational
        Database. To do this, a number of methods are available
        with the help of which Objects can be searched, created, modified and
        deleted. The mapping is bidirectional. Objects
        can be converted into DB structures and DB structures into objects."""


    def find_all(self):
        """Read out all users.
        :return A collection of user objects that all users represent."""

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM User")
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, user_firstname, mail, role) in tupsrc:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_date(creation_date)
            user.set_firstname(user_firstname)
            user.set_mail(mail)
            user.set_role(role)
            res.append(user)

        self._connection.commit()
        crs.close()

        return res


    def find_by_id(self, id):
        """Read out all users.
        :return A collection of user objects that all users represent."""

        res = None
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM User WHERE id={}".format(id))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, user_firstname, mail, role) in tupsrc:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_date(creation_date)
            user.set_firstname(user_firstname)
            user.set_mail(mail)
            user.set_role(role)
            res = user

        self._connection.commit()
        crs.close()

        return res


    def find_by_name(self, name):
        """Read out all users.
        :return A collection of user objects that all users represent."""

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM User WHERE name LIKE '{}' ORDER BY name".format(name))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, user_firstname, mail, role) in tupsrc:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_date(creation_date)
            user.set_firstname(user_firstname)
            user.set_mail(mail)
            user.set_role(role)
            res.append(user)

        self._connection.commit()
        crs.close()

        return res


    def find_by_mail(self, mail):
        """Read out all users.
        :return A collection of user objects that all users represent."""

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM User WHERE mail LIKE '{}' ORDER BY mail".format(mail))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, user_firstname, mail, role) in tupsrc:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_date(creation_date)
            user.set_firstname(user_firstname)
            user.set_mail(mail)
            user.set_role(role)
            res.append(user)

        self._connection.commit()
        crs.close()

        return res


    def find_by_role(self, role):
        """Read out all users.
        :return A collection of user objects that all users represent."""

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM User WHERE role LIKE '{}' ORDER BY role".format(role))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, user_firstname, mail, role) in tupsrc:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_date(creation_date)
            user.set_firstname(user_firstname)
            user.set_mail(mail)
            user.set_role(role)
            res.append(user)

        self._connection.commit()
        crs.close()

        return res


    def insert (self, user):

        crs = self._connection.cursor()

        crs.execute("SELECT MAX(id) AS maxid FROM User ")
        tupsrc = crs.fetchall()

        for (maxid) in tupsrc:
            if maxid[0] is not None:
                user.set_id(maxid[0] + 1)
            else:
                user.set_id(1)

        cmd = "INSERT INTO User (id, name, creation_date, firstname, mail, role) VALUES (%s, %s, %s, %s, %s, %s)"
        data = (user.get_id(), user.get_name(), user.get_date(), user.get_firstname(), user.get_mail(), user.get_role())
        crs.execute(cmd, data)

        self._connection.commit()
        crs.close()

        return user


    def update(self, user):

        crs = self._connection.cursor()

        cmd = "SET (name=%s, creation_date=%s, firstname=%s, mail=%s, role=%s) WHERE id=%s"
        data = (user.get_name(), user.get_date(), user.get_firstname(), user.get_mail(), user.get_role(), user.get_id())
        crs.execute("UPDATE User ", cmd, data)

        self._connection.commit()
        crs.close()

        return user      


    def delete(self, user):

        crs = self._connection.cursor()

        crs.execute("DELETE FROM User WHERE id={}".format(user.get_id()))

        self._connection.commit()
        crs.close()

    