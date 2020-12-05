from server.bo.Participation import Participation
from server.db.Mapper import Mapper

class ParticipationMapper (Mapper):
    
    def __init__(self):
        super().__init__

    def find_all(self):
        """Read out all participations :return A collection of participation objects that all participations represent."""

        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * from participation")
        tuples = cursor.fetchall()

        for (participation_id, creation_date, priority) in tuples:
            participation = Participation()
            participation.set_id(participation_id)
            participation.set_creation_date(creation_date)
            participation.set_priority(priority)
            result.append(participation)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, participation_id):
        """Read out the participation based on their id.
        : param participation_id of the associated participation.
        : return a participation object with the id number."""

        result = None
        cursor = self._connection.cursor()
        command = "SELECT participation_id, creation_date, student_id, project_id, grading_id, priority FROM participations WHERE participation_id={}" \
                  .format(participation_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (participation_id, creation_date, priority) = tuples[0]
            participation = Participation()
            participation.set_id(participation_id)
            participation.set_creation_date(creation_date)
            participation.set_priority(priority)
            result = participation

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()
        return result
        
    def find_by_priority(self, priority):
        """Read out the participation based on their priority.
        : param priority of the associated participations.
        : return a participation object with the priority number."""

        result = None
        cursor = self._connection.cursor()
        command = "SELECT participation_id, creation_date, student_id, project_id, grading_id, priority FROM participations WHERE priority={}" \
                  .format(priority)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (participation_id, creation_date, priority) = tuples[0]
            participation = Participation()
            participation.set_id(participation_id)
            participation.set_creation_date(creation_date)
            participation.set_priority(priority)
            result = participation

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, participation):
        """Insertion of a participation object into the database.

        The primary key of the transferred object is also checked and if necessary
        corrected.

        : param participation the object to be saved
        : return the object that has already been transferred, but with a possibly corrected ID.
        """
        crs = self._connection.cursor()
        crs.execute("SELECT MAX(id) AS max_id FROM Participation")
        tuples = crs.fetchall()

        for (max_id) in tuples:
            participation.set_id(max_id[0]+1)

            crs.execute("INSERT INTO Participation(participation_id, creation_date, priority) VALUES ('{}', '{}','{}')".format(participation.get_id(), participation.get_creation_date(), participation.get_priority()))
        
        self._connection.commit()
        crs.close()

        return participation


    def delete(self, participation):

        """Deleting the data of a participation object from the database.
        : param participation the "object" to be deleted from the DB"""

        crs = self._connection.cursor()
        crs.execute("DELETE FROM Participation WHERE participation_id={}".format(participation.get_id()))

        self._connection.commit()
        crs.close()


    def update(self, participation):

        """Repeated writing of an object to the database.
            : param participation the object to be written into the DB"""
        cursor = self._connection.cursor()

        command = "UPDATE Participation " + "SET creation_date=%s, priority=%s WHERE participation_id=%s"
        data = (participation.get_creation_date(), participation.get_priority(), participation.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
        