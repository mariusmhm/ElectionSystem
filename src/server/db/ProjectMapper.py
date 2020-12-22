import mysql.connector
from server.bo.Project import Project
from server.db.Mapper import Mapper

class ProjectMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT project_id, project_name, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots FROM projects")
        tuples = cursor.fetchall()

        for (project_id, project_name, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots ) in tuples:
            project = Project()
            project.set_project_id(project_id)
            project.set_project_name(project_name)
            project.set_short_description(short_description)
            project.set_link(link)
            project.set_room_desired(room_desired)
            project.set_grade_average(grade_average)
            project.set_num_blockdays_in_exam(num_blockdays_in_exam)
            project.set_blockdays_in_exam(blockdays_in_exam)
            project.set_special_room(special_room)
            project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
            project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
            project.set_blockdays_prior_lecture(blockdays_prior_lecture)
            project.set_num_blockdays_during_lecture(num_blockdays_during_lecture)
            project.set_blockdays_during_lecture(blockdays_during_lecture)
            project.set_weekly(weekly)
            project.set_num_spots(num_spots)
            result.append(project)

        self._connection.commit()
        cursor.close()

        return result

    def find_project_by_id(self,project_id):

        result = None
        cursor = self._connection.cursor()
        command = "SELECT project_id, project_name, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots  FROM projects WHERE project_id={}" \
                    .format(project_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (project_id, project_name, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots ) = tuples[0]
            project = Project()
            project.set_project_id(project_id)
            project.set_project_name(project_name)
            project.set_short_description(short_description)
            project.set_link(link)
            project.set_room_desired(room_desired)
            project.set_grade_average(grade_average)
            project.set_num_blockdays_in_exam(num_blockdays_in_exam)
            project.set_blockdays_in_exam(blockdays_in_exam)
            project.set_special_room(special_room)
            project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
            project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
            project.set_blockdays_prior_lecture(blockdays_prior_lecture)
            project.set_num_blockdays_during_lecture(num_blockdays_during_lecture)
            project.set_blockdays_during_lecture(blockdays_during_lecture)
            project.set_weekly(weekly)
            project.set_num_spots(num_spots)
            result = project

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

        #---project specific---

    #def find_by_status(self, status):
    #def find_by_professorID(self, professorID):
    #def find_by_projecttypeID(self, projecttypeID):
    #def find_by_project_name(self, name):
    #def find_by_moduleID(self, moduleID):

"""    def insert(self, participation):

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Participation")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                participation.set_id(maxid[0] + 1)
            else:
                participation.set_id(1)
            
        command = "INSERT INTO Participation (id, creation_date, priority, grading_id, student_id, project_id) VALUES (%s,%s,%s,NULL,%s,%s)"
        data = (participation.get_id(), participation.get_creation_date(), participation.get_priority(), participation.get_student_id(), participation.get_project_id())
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
        cursor.close()"""

