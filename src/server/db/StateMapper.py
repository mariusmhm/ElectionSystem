import mysql.connector
from server.State import State
from server.db.Mapper import Mapper


class StateMapper (Mapper):
    """This is a mapper-class, which represents state objects into
    a relational database. For this reason you can find some methods,
    which help to find, insert, modify, and delete objects. The mapping is 
    bidirectional, which means objects can be transformed into database structures
    and the other way around"""

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Reads out all states.
        :return A collection of state objects that repesent all states.
        """

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
        """Reads out one state by id.
        :param id Unique id of the state
        :return A state object, which has the required id.
        """

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
        """Adds a state object into the database.
        The primary key of the object gets checked and if neccessary adjusted.
        :param state object which will be saved
        :return state object with the changed id
        """

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
        """Updates a state object in the database.
        :param state object which will be updated
        """

        cursor = self._connection.cursor()

        command = "UPDATE State " + "SET name=%s WHERE id=%s"
        data = (state.get_name(), state.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, state):
        """Deletes a state object from the database.
        :param state object which will be deleted
        """

        cursor = self._connection.cursor()
        command = "DELETE FROM State WHERE id={}".format(state.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()