import mysql.connector
from server.bo.Project import Project
from server.db.Mapper import Mapper

class ProjectMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT project_id, project_name, short_description, link, room_desired, grade_average, num_blockday_in_Exam, blockday_in_exam, special_room, date_blockday_during_lecture,num_blockdays_prior_lecture, blockdays_prior_lecturetrue, num_blockdays_during_lecture, blockday_during_lecture, weekly, num_spots, project_type, module, project_professor, participation FROM projects)
        tuples = cursor.fetchall()

        for (project_id, project_name, short_description) in tuples:
            project = Project()
            project.set_project_id(project_id)
            project.set_project_name(project_name)
            project.set_short_description(short_description)
            result.append(project)

        self._connection.commit()
        cursor.close()

        return result

    def find_project_by_id(self,project_id):

        result = None
        cursor = self._connection.cursor()
        command = "SELECT project_id, project_name, short_description FROM projects WHERE project_id={}" \
                    .format(project_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (project_id, project_name, short_description) = tuples[0]
            project = Project()
            project.set_project_id(project_id)
            project.set_project_name(project_name)
            project.set_short_description(short_description)
            result = project

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()
        return result


