import mysql.connector
from server.State import State
from server.db.Mapper import Mapper


class StateMapper (Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._connection.cursor()

        cursor.execute("SELECT * FROM State")
        tuples = cursor.fetchall()

        for (id, name) in tuples:
            state = State()
            state.set_id(id)
            state.set_name(name)
            result.append(state)

        self._connection.commit()
        cursor.close()
        return result

    def find_by_id(self, id):

        result = None
        cursor = self._connection.cursor()

        command = "SELECT * FROM State WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name) in tuples:
            state = State()
            state.set_id(id)
            state.set_name(name)
            result = state

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, state):

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM State")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                state.set_id(maxid[0] + 1)
            else:
                state.set_id(1)
            
        command = "INSERT INTO State (id, name) VALUES (%s,%s)"
        data = (state.get_id(), state.get_name())
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()
        
        return state
    
    def update(self, state):

        cursor = self._connection.cursor()

        command = "UPDATE State " + "SET name=%s WHERE id=%s"
        data = (state.get_name(), state.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, state):

        cursor = self._connection.cursor()
        command = "DELETE FROM State WHERE id={}".format(state.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()