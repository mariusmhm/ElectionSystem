import mysql.connector
from server.bo.Grading import Grading
from server.db.Mapper import Mapper


class GradingMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._connection.cursor()

        cursor.execute("SELECT id, creation_date, grade FROM Grading ORDER BY grade")
        tuples = cursor.fetchall()

        for (id, creation_date, grade) in tuples:
            grading = Grading()
            grading.set_date(creation_date)
            grading.set_id(id)
            grading.set_grade(grade)
            result.append(grading)

        self._connection.commit()
        cursor.close()
        return result

    def find_by_id(self, id):

        result = None
        cursor = self._connection.cursor()

        command = "SELECT id, creation_date, grade FROM Grading WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, grade) in tuples:
            grading = Grading()
            grading.set_id(id)
            grading.set_date(creation_date)
            grading.set_grade(grade)
            result = grading

        self._connection.commit()
        cursor.close()
        return result


    def insert(self, grading):

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Grading")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                grading.set_id(maxid[0] + 1)
            else:
                grading.set_id(1)
            
        command = "INSERT INTO Grading (id, creation_date, grade) VALUES (%s,%s,%s)"
        data = (grading.get_id(), grading.get_date(), grading.get_grade())
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()
        

        return grading

    def update(self, grading):

        cursor = self._connection.cursor()

        command = "UPDATE Grading " + "SET grade=%s WHERE id=%s"
        data = (grading.get_grade(), grading.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, grading):

        cursor = self._connection.cursor()
        command = "DELETE FROM Grading WHERE id={}".format(grading.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()



