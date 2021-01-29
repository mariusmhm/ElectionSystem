from server.bo.User import User
from server.db.Mapper import Mapper


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()
        """Mapper class, that maps the user objects on relational
        Database. To do this, a number of methods are available, which
        help to search, create, modify and
        delete objects. The mapping is bidirectional. Objects
        can be converted into DB structures and DB structures into objects."""


    def find_all(self):
        """Read out all users.
        :return A collection of user objects that all users represent."""

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM User")
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, google_user_id, user_firstname, mail, role_id) in tupsrc:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_date(creation_date)
            user.set_google_user_id(google_user_id)
            user.set_firstname(user_firstname)
            user.set_mail(mail)
            user.set_role_id(role_id)
            res.append(user)

        self._connection.commit()
        crs.close()

        return res


    def find_by_id(self, id):
        """Reads out one user by id.
        :param id Unique id of the user
        :return A user object, which has the required id.
        """

        res = None
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM User WHERE id={}".format(id))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, google_user_id, user_firstname, mail, role_id) in tupsrc:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_date(creation_date)
            user.set_google_user_id(google_user_id)
            user.set_firstname(user_firstname)
            user.set_mail(mail)
            user.set_role_id(role_id)
            res = user

        self._connection.commit()
        crs.close()

        return res

    def find_by_google_id(self, id):
        """Reads out the user by google id.
        :param google id Unique google id of the user
        :return A user object, which has the required google id.
        """

        res = None
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM User WHERE google_user_id LIKE '{}'".format(id))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, google_user_id, user_firstname, mail, role_id) in tupsrc:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_date(creation_date)
            user.set_google_user_id(google_user_id)
            user.set_firstname(user_firstname)
            user.set_mail(mail)
            user.set_role_id(role_id)
            res = user

        self._connection.commit()
        crs.close()

        return res


    def find_by_name(self, name):
        """Reads out users by name.
        :param name of the user
        :return All user objects, which has the required name.
        """

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM User WHERE name LIKE '{}' ORDER BY name".format(name))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, google_user_id, user_firstname, mail, role_id) in tupsrc:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_date(creation_date)
            user.set_google_user_id(google_user_id)
            user.set_firstname(user_firstname)
            user.set_mail(mail)
            user.set_role_id(role_id)
            res.append(user)

        self._connection.commit()
        crs.close()

        return res


    def find_by_mail(self, mail):
        """Reads out the user by e-mail.
        :param mail of the user
        :return A user object, which has the required mail.
        """

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM User WHERE mail LIKE '{}' ORDER BY mail".format(mail))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, google_user_id, user_firstname, mail, role_id) in tupsrc:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_date(creation_date)
            user.set_google_user_id(google_user_id)
            user.set_firstname(user_firstname)
            user.set_mail(mail)
            user.set_role_id(role_id)
            res.append(user)

        self._connection.commit()
        crs.close()

        return res


    def find_by_role(self, role):
        """Reads out users by role.
        :param role of the user
        :return All user objects, which has the required role.
        """

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM User WHERE role_id LIKE '{}' ORDER BY role_id".format(role))
        tupsrc = crs.fetchall()
        
        for (id, name, creation_date, google_user_id, user_firstname, mail, role_id) in tupsrc:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_date(creation_date)
            user.set_google_user_id(google_user_id)
            user.set_firstname(user_firstname)
            user.set_mail(mail)
            user.set_role_id(role_id)
            res.append(user)

        self._connection.commit()
        crs.close()

        return res


    def insert (self, user):
        """Adds a user object into the database.
        The primary key of the object gets checked and if neccessary adjusted.
        :param user object which will be saved
        :return user object with the changed id
        """

        crs = self._connection.cursor()

        crs.execute("SELECT MAX(id) AS maxid FROM User ")
        tupsrc = crs.fetchall()

        for (maxid) in tupsrc:
            if maxid[0] is not None:
                user.set_id(maxid[0] + 1)
            else:
                user.set_id(1)

        cmd = "INSERT INTO User (id, name, creation_date, google_user_id, firstname, mail, role_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        data = (user.get_id(), user.get_name(), user.get_date(), user.get_google_user_id(), user.get_firstname(), user.get_mail(), user.get_role_id())
        crs.execute(cmd, data)

        self._connection.commit()
        crs.close()

        return user


    def update(self, user):
        """Updates a user object in the database.
        :param user object which will be updated
        """

        crs = self._connection.cursor()

        cmd = "UPDATE User " + "SET name=%s, creation_date=%s, google_user_id=%s, firstname=%s, mail=%s, role_id=%s WHERE id=%s"
        data = (user.get_name(), user.get_date(), user.get_google_user_id(), user.get_firstname(), user.get_mail(), user.get_role_id(), user.get_id())
        crs.execute(cmd, data)

        self._connection.commit()
        crs.close()

        return user      


    def delete(self, user):
        """Deletes a user object from the database.
        :param user object which will be deleted
        """

        crs = self._connection.cursor()

        crs.execute("DELETE FROM User WHERE id={}".format(user.get_id()))

        self._connection.commit()
        crs.close()

