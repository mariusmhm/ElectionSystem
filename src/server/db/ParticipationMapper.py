import mysql.connector
from server.bo.Participation import Participation
from server.db.Mapper import Mapper

class ParticipationMapper(Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):
        """Read out all participations.
        :return A collection of participation objects that all participations represent."""

        result = []
        cursor = self._connection.cursor()

        cursor.execute("SELECT * FROM Participation")
        tuples = cursor.fetchall()
        
        for (id, creation_date, priority, grading_id, student_id, project_id) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_date(creation_date)
            participation.set_priority(priority)
            participation.set_grading_id(grading_id)
            participation.set_student_id(student_id)
            participation.set_project_id(project_id)
            result.append(participation)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, creation_date, priority, grading_id, student_id, project_id FROM Participation WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, priority, grading_id, student_id, project_id) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_date(creation_date)
            participation.set_priority(priority)
            participation.set_grading_id(grading_id)
            participation.set_student_id(student_id)
            participation.set_project_id(project_id)
            result = participation

        self._connection.commit()
        cursor.close()

        return result

    def find_all_by_project_id(self, project_id):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, creation_date, priority, grading_id, student_id, project_id FROM Participation WHERE project_id={}".format(project_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, priority, grading_id, student_id, project_id) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_date(creation_date)
            participation.set_priority(priority)
            participation.set_grading_id(grading_id)
            participation.set_student_id(student_id)
            participation.set_project_id(project_id)
            result.append(participation)

        self._connection.commit()
        cursor.close()

        return result

    def find_all_by_student_id(self, student_id):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, creation_date, priority, grading_id, student_id, project_id FROM Participation WHERE student_id={}".format(student_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, priority, grading_id, student_id, project_id) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_date(creation_date)
            participation.set_priority(priority)
            participation.set_grading_id(grading_id)
            participation.set_student_id(student_id)
            participation.set_project_id(project_id)
            result.append(participation)

        self._connection.commit()
        cursor.close()

        return result

    def find_all_by_grading_id(self, grading_id):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, creation_date, priority, grading_id, student_id, project_id FROM Participation WHERE grading_id={}".format(grading_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, priority, grading_id, student_id, project_id) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_date(creation_date)
            participation.set_priority(priority)
            participation.set_grading_id(grading_id)
            participation.set_student_id(student_id)
            participation.set_project_id(project_id)
            result.append(participation)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_project(self, project_id):
        #give you the patricipations from a project and ordered by priority for the election logic

        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, creation_date, priority, grading_id, student_id, project_id FROM Participation WHERE project_id={} ORDER BY priority DESC".format(project_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, priority, grading_id, student_id, project_id) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_date(creation_date)
            participation.set_priority(priority)
            participation.set_grading_id(grading_id)
            participation.set_student_id(student_id)
            participation.set_project_id(project_id)
            result.append(participation)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, participation):

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Participation")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                participation.set_id(maxid[0] + 1)
            else:
                participation.set_id(1)
            
        command = "INSERT INTO Participation (id, creation_date, priority, grading_id, student_id, project_id) VALUES (%s,%s,%s,NULL,%s,%s)"
        data = (participation.get_id(), participation.get_date(), participation.get_priority(), participation.get_student_id(), participation.get_project_id())
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()

        return participation

    def update(self, participation): 
        
        cursor = self._connection.cursor()


        command = "UPDATE Participation " + "SET priority=%s, grading_id=%s WHERE id=%s"
        data = (participation.get_priority(), participation.get_grading_id(), participation.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
 

    def delete(self, participation):

        cursor = self._connection.cursor()
        command = "DELETE FROM Participation WHERE id={}".format(participation.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_grading_id(self, participation):

        cursor = self._connection.cursor()
        command = "UPDATE Participation SET grading_id= NULL"
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
        