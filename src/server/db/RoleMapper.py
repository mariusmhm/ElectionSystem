import mysql.connector
from server.Role import Role
from server.db.Mapper import Mapper


class RoleMapper (Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):

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

        cursor = self._connection.cursor()

        command = "UPDATE Role " + "SET name=%s WHERE id=%s"
        data = (role.get_name(), role.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, role):

        cursor = self._connection.cursor()
        command = "DELETE FROM Role WHERE id={}".format(role.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()