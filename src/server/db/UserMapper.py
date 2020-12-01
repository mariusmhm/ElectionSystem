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
        """Read out all users
              :return A collection of student objects that all users represent."""

        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * from users")
        tuples = cursor.fetchall()

        for (id, creation_date, google_user_id, name, email,role) in tuples:
            user = User()
            user.set_id(id)
            user.set_creation_date(creation_date)
            user.set_google_user(google_user_id)
            user.set_name(name)
            user.set_email(email)
            user.set_role(role)
            result.append(user)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Read out the user based on their id.
                : param id of the associated user.
                : return a user object with the id number."""

        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, creation_date, google_user_id, name, email, role FROM users WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, google_user_id, name, email, role) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_creation_date(creation_date)
            user.set_google_user(google_user_id)
            user.set_name(name)
            user.set_email(email)
            user.set_role(role)
            result = user

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_google_user_id(self, google_user_id):
        """Read out the user based on their google id.
                : param google_user_id of the associated user.
                : return a user object with the google id number."""
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id,creation_date, name, email, google_user_id FROM users WHERE google_user_id='{}'".format(google_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, name, email, google_user_id) = tuples[0]
            u = User()
            u.set_id(id)
            u.set_creation_date(creation_date)
            u.set_name(name)
            u.set_email(email)
            u.set_google_user(google_user_id)
            result = u

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Read out all user based on their name.
                : param name Last name of the user.
                : return A collection of user objects that are all users
                    with the desired last name."""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, google_user_id, name, email, role FROM users WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, google_user_id, name, email,role) in tuples:
            user = User()
            user.set_id(id)
            user.set_creation_date(creation_date)
            user.set_google_user(google_user_id)
            user.set_name(name)
            user.set_email(email)
            user.set_role(role)
            result.append(user)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_email(self, mail_address):
        """Read out user based on the assigned e-mail address.
                : param (mail_adress) E-mail address of the associated user.
                : return the user object that contain
                    the desired email address."""
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, creation_date, google_user_id, name, email, role FROM users WHERE email={}".format(mail_address)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, google_user_id, name, email,role) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_creation_date(creation_date)
            user.set_google_user(google_user_id)
            user.set_name(name)
            user.set_email(email)
            user.set_role(role)
            result = user
        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                        does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, user):
        """Insertion of a student object into the database.

                The primary key of the transferred object is also checked and if necessary
                corrected.

                : param student the object to be saved
                : return the object that has already been transferred, but with a possibly corrected ID.
                """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM users ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """
                If we determine a central ID we use this
                by 1 and assign this value as the ID to the user object. """
                user.set_id(maxid[0] + 1)
            else:
                """If we CAN'T find a maximum ID, let's
                assume that the table is empty and that we can start with ID 1. """
                user.set_id(1)

        command = "INSERT INTO users (id, creation_date, goole_user_id, name, email, role VALUES (%s,%s,%s,%s,%s,%s)"
        data = (user.get_id(), user.creation_date(), user.get_google_user_id(),user.get_name(), user.get_email(),
                user.get_role())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return user

    def update(self, user):
        """Repeated writing of an object to the database.
        : param user the object that is to be written to the DB"""
        cursor = self._connection.cursor()

        command = "UPDATE users " + "SET name=%s, email=%s WHERE google_user_id=%s"
        data = (user.get_name(), user.get_email(), user.get_google_user_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, user):
        """Deleting the data of a user object from the database.

        : param user the "object" to be deleted from the DB
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM users WHERE id={}".format(user.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
