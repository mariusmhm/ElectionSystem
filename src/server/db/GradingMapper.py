import mysql.connector
from server.bo.Grading import Grading
from server.db.Mapper import Mapper


class GradingMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._connection.cursor()

        cursor.execute("SELECT id, grade FROM Grading")
        tuples = cursor.fetchall()

        for (id, grade) in tuples:
            grading = Grading()
            grading.set_id(id)
            grading.set_grade(grade)
            result.append(grading)

        self._connection.commit()
        cursor.close()
        return result

    def find_by_grading_id(self, id):

        result = None
        cursor = self._connection.cursor()

        command = "SELECT id, grade FROM Grading WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        print(tuples)

        for (id, grade) in tuples:
            grading = Grading()
            grading.set_id(id)
            grading.set_grade(grade)
            result = grading

        self._connection.commit()
        cursor.close()
        return result