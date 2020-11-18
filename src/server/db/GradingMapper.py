from server.bo.Grading import Grading
from server.db.Mapper import Mapper


class GradingMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT id, createDate, grade FROM grading")
        tupsrc = crs.fetchall()

        for (id, createDate, grade) in tupsrc:
            grading = Grading()
            grading.set_id(id)
            grading.set_createDate(createDate)
            grading.set_grade(grade)
            res.append(grading)

        self._connection.commit()
        crs.close()

        return res

    def find_by_grading_id(self, grading_id):

        res = []
        crs = self._connection.cursor()

        crs.execute("SELECT id, createDate, grade FROM grading WHERE id={} ORDER BY id".format(grading_id))
        tupsrc = crs.fetchall()

        for (id, createDate, grade) in tupsrc:
            grading = Grading()
            grading.set_id(id)
            grading.set_createDate(createDate)
            grading.set_grade(grade)
            res.append(grading)

        self._connection.commit()
        crs.close()

        return res