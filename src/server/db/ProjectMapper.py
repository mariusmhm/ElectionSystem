from server.bo.Project import Project
from server.db.Mapper import Mapper

class ProjectMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT project_id, project_name, creation_date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots FROM projects")
        tuples = cursor.fetchall()

        for (project_id, project_name, creation_date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots ) in tuples:
            project = Project()
            project.set_project_id(project_id)
            project.set_project_name(project_name)
            project.set_date(creation_date)
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

    def find_by_id(self,project_id):

        result = None
        cursor = self._connection.cursor()
        command = "SELECT project_id, project_name, creation_date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots  FROM projects WHERE project_id={}" \
                    .format(project_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (project_id, project_name, creation_date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots ) = tuples[0]
            project = Project()
            project.set_project_id(project_id)
            project.set_project_name(project_name)
            project.set_date(creation_date)
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


    def find_project_by_name(self, project_name):
       
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT project_id, project_name, creation_date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots  FROM projects WHERE project_name LIKE '{}' ORDER BY project_name" .format(project_name))

        tuples = cursor.fetchall()

        try:
            (project_id, project_name, creation_date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots ) = tuples[0]
            project = Project()
            project.set_project_id(project_id)
            project.set_project_name(project_name)
            project.set_date(creation_date)
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

    

    def insert(self, project):

        cursor = self._connection.cursor()
        cursor.execute("SELECT project_id, project_name, creation_date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots, projecttype_id, professor_id  FROM projects")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                project.set_project_id(maxid[0] + 1)
            else:
                project.set_project_id(1)
            
        command = "INSERT INTO projects (project_id, project_name, creation_date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots, projecttype_id, professor_id) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (project.get_project_id(), project.get_project_name(), project.get_date(), project.get_short_description(), project.get_link(), project.get_room_desired(), project.get_grade_average(), project.get_num_blockdays_in_exam(), project.get_blockdays_in_exam(), project.get_special_room(), project.get_date_blockdays_during_lecture(), project.get_num_blockdays_prior_lecture(), project.get_blockdays_prior_lecture(), project.get_num_blockdays_during_lecture(), project.get_blockdays_during_lecture(), project.get_weekly(), project.get_num_spots(), project.get_projecttype_id(), project.get_professor_id())
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()
        

        return project


    def delete(self, project):

        cursor = self._connection.cursor()
        command = "DELETE FROM projects WHERE project_id={}".format(project.get_project_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def update(self, project):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param transaction das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._connection.cursor()

        command = "UPDATE projects " + "SET project_name=%s, creation_date=%s, short_description=%s, link=%s, room_desired=%s, grade_average=%s, num_blockdays_in_exam=%s, blockdays_in_exam=%s, special_room=%s, date_blockdays_during_lecture=%s, num_blockdays_prior_lecture=%s, blockdays_prior_lecture=%s, num_blockdays_during_lecture=%s, blockdays_during_lecture=%s, weekly=%s, num_spots=%s, projecttype_id=%s, professor_id=%s WHERE project_id=%s"
        data = (project.get_project_name(),
            project.get_date(),
            project.get_short_description(),
            project.get_link(),
            project.get_room_desired(),
            project.get_grade_average(),
            project.get_num_blockdays_in_exam(),
            project.get_blockdays_in_exam(),
            project.get_special_room(),
            project.get_date_blockdays_during_lecture(),
            project.get_num_blockdays_prior_lecture(),
            project.get_blockdays_prior_lecture(),
            project.get_num_blockdays_during_lecture(),
            project.get_blockdays_during_lecture(),
            project.get_weekly(),
            project.get_num_spots(),
            project.get_projecttype_id(),
            project.get_professor_id(),
            project.get_project_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()


# --- find project by professorID ---

    def find_project_by_professor_id(self,project_id):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT project_id, project_name, creation_date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots,  projecttype_id, professor_id  FROM projects WHERE professor_id={}" \
                    .format(project_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (project_id, project_name, creation_date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots,  projecttype_id, professor_id ) = tuples[0]
            project = Project()
            project.set_project_id(project_id)
            project.set_project_name(project_name)
            project.set_date(creation_date)
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
            project.set_projecttype_id(projecttype_id)
            project.set_professor_id(professor_id)
            result = project

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()
        return result


# --- find project by Projecttype ID ---

    def find_project_by_projecttype_id(self,project_id):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT project_id, project_name, creation_date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots,  projecttype_id, professor_id  FROM projects WHERE projecttype_id={}" \
                    .format(project_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (project_id, project_name, creation_date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots,  projecttype_id, professor_id ) = tuples[0]
            project = Project()
            project.set_project_id(project_id)
            project.set_project_name(project_name)
            project.set_date(creation_date)
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
            project.set_projecttype_id(projecttype_id)
            project.set_professor_id(professor_id)
            result = project

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()
        return result
