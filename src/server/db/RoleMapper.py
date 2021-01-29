import mysql.connector
from server.Role import Role
from server.db.Mapper import Mapper


class RoleMapper (Mapper):
    """This is a mapper-class, which represents role objects into
    a relational database. For this reason you can find some methods,
    which help to find, insert, modify, and delete objects. The mapping is 
    bidirectional, which means objects can be transformed into database structures
    and the other way around"""

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Reads out all roles.
        :return A collection of role objects that repesent all roles.
        """

        result = []
        cursor = self._connection.cursor()

        cursor.execute("SELECT * FROM Role")
        tuples = cursor.fetchall()

        for (id, name) in tuples:
            role = Role()
            role.set_id(id)
            role.set_name(name)
            result.append(role)

        self._connection.commit()
        cursor.close()
        return result

    def find_by_id(self, id):
        """Reads out one role by id.
        :param id Unique id of the role
        :return A role object, which has the required id.
        """

        result = None
        cursor = self._connection.cursor()

        command = "SELECT * FROM Role WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name) in tuples:
            role = Role()
            role.set_id(id)
            role.set_name(name)
            result = role

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, role):
        """Adds a role object into the database.
        The primary key of the object gets checked and if neccessary adjusted.
        :param role object which will be saved
        :return role object with the changed id
        """

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Role")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                role.set_id(maxid[0] + 1)
            else:
                role.set_id(1)
            
        command = "INSERT INTO Role (id, name) VALUES (%s,%s)"
        data = (role.get_id(), role.get_name())
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()
        
        return role
    
    def update(self, role):
        """Updates a role object in the database.
        :param role object which will be updated
        """

        cursor = self._connection.cursor()

        command = "UPDATE Role " + "SET name=%s WHERE id=%s"
        data = (role.get_name(), role.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, role):
        """Deletes a role object from the database.
        :param role object which will be deleted
        """

        cursor = self._connection.cursor()
        command = "DELETE FROM Role WHERE id={}".format(role.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()