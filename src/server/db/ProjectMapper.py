from server.bo.Project import Project
from server.db.Mapper import Mapper

class ProjectMapper(Mapper):
    """Mapper class that maps project objects to a relational database.
    database. For this a set of methods is made available, with
    methods, which can be used to search for, create, modify and delete objects.
    can be deleted. The mapping is bidirectional. I.e., objects can be
    be converted into DB structures and DB structures into objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Read out all projects.
        :return A collection of projects objects that all projects represent."""

        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM Project")
        tuples = cursor.fetchall()

        for (project_id, project_name, date, short_description, additional_prof, room_nessecary,
             language, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam,
             special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture,
             num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots, projecttype,
             participation, professor, module) in tuples:

            project = Project()
            project.set_id(project_id)
            project.set_name(project_name)
            project.set_projecttype_id(projecttype)
            project.set_date(date)
            project.set_short_description(short_description)
            project.set_link(link)
            project.set_additional_prof(additional_prof)
            project.set_language(language)
            project.set_room_desired(room_desired)
            project.set_grade_average(grade_average)
            project.set_num_blockdays_in_exam(num_blockdays_in_exam)
            project.set_blockdays_in_exam(blockdays_in_exam)
            project.set_special_room(special_room)
            project.set_room_necessary(room_nessecary)
            project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
            project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
            project.set_blockdays_prior_lecture(blockdays_prior_lecture)
            project.set_num_blockdays_during_lecture(num_blockdays_during_lecture)
            project.set_blockdays_during_lecture(blockdays_during_lecture)
            project.set_weekly(weekly)
            project.set_num_spots(num_spots)
            project.set_module_id(module)
            project.set_participation_id(participation)
            project.set_professor_id(professor)
            result.append(project)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Read out the project  based on their id.
        : param project_id of the associated project.
        : return a project object with the id number."""

        result = None
        cursor = self._connection.cursor()
        command = ("SELECT * FROM Project WHERE id={}".format(id))

        cursor.execute(command)
        tuples = cursor.fetchall()


        for (project_id, project_name, date, short_description, additional_prof, room_nessecary,
             language, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam,
             special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture,
             num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots, projecttype,
             professor, participation, module) in tuples:

            project = Project()
            project.set_id(project_id)
            project.set_name(project_name)
            project.set_projecttype_id(projecttype)
            project.set_date(date)
            project.set_short_description(short_description)
            project.set_link(link)
            project.set_additional_prof(additional_prof)
            project.set_language(language)
            project.set_room_desired(room_desired)
            project.set_grade_average(grade_average)
            project.set_num_blockdays_in_exam(num_blockdays_in_exam)
            project.set_blockdays_in_exam(blockdays_in_exam)
            project.set_special_room(special_room)
            project.set_room_necessary(room_nessecary)
            project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
            project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
            project.set_blockdays_prior_lecture(blockdays_prior_lecture)
            project.set_num_blockdays_during_lecture(num_blockdays_during_lecture)
            project.set_blockdays_during_lecture(blockdays_during_lecture)
            project.set_weekly(weekly)
            project.set_num_spots(num_spots)
            project.set_module_id(module)
            project.set_participation_id(participation)
            project.set_professor_id(professor)
            result = project

            self._connection.commit()
            cursor.close()

            return result


    def find_project_by_name(self, name):
        """Read out all projects based on their name.
        :return A collection of projects objects that all represent all projects by name."""
       
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM Project WHERE name LIKE '{}' ORDER BY name".format(name))
        tuples = cursor.fetchall()

        for (project_id, project_name, date, short_description, additional_prof, room_nessecary,
             language, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam,
             special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture,
             num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots, projecttype,
             professor, participation, module) in tuples:

            project = Project()
            project.set_id(project_id)
            project.set_name(project_name)
            project.set_projecttype_id(projecttype)
            project.set_date(date)
            project.set_short_description(short_description)
            project.set_link(link)
            project.set_additional_prof(additional_prof)
            project.set_language(language)
            project.set_room_desired(room_desired)
            project.set_grade_average(grade_average)
            project.set_num_blockdays_in_exam(num_blockdays_in_exam)
            project.set_blockdays_in_exam(blockdays_in_exam)
            project.set_special_room(special_room)
            project.set_room_necessary(room_nessecary)
            project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
            project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
            project.set_blockdays_prior_lecture(blockdays_prior_lecture)
            project.set_num_blockdays_during_lecture(num_blockdays_during_lecture)
            project.set_blockdays_during_lecture(blockdays_during_lecture)
            project.set_weekly(weekly)
            project.set_num_spots(num_spots)
            project.set_module_id(module)
            project.set_participation_id(participation)
            project.set_professor_id(professor)
            result = project

        self._connection.commit()
        cursor.close()

        return result

    

    def insert(self, project):
        """Insertion of a project object into the database.
        The primary key of the transferred object is also checked and if necessary
        corrected.
        : param project the object to be saved
        : return the object that has already been transferred, but with a possibly corrected ID.
        """

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Project ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """
                If we determine a central ID we use this
                by 1 and assign this value as the ID to the project object. """
                project.set_id(maxid[0] + 1)

            else:
                """If we CAN'T find a maximum ID, let's
                assume that the table is empty and that we can start with ID 1. """
                project.set_id(1)
            
            command = "INSERT INTO Project (participation_id, module_id, projecttype_id, professor_id, additional_professor, short_description, link, room_desired, " \
                      "room_necessary, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room," \
                      " date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture," \
                      " blockdays_during_lecture, weekly, num_spots, language, id, name, creation_date) " \
                      "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

            data = (project.get_participation_id(),
                    project.get_module_id(),
                    project.get_projecttype_id(),
                    project.get_professor_id(),
                    project.get_additional_prof(),
                    project.get_short_description(),
                    project.get_link(),
                    project.get_room_desired(),
                    project.get_room_necessary(),
                    project.get_grade_average(),
                    project.get_num_blockdays_in_exam(),
                    project.get_blockdays_in_exam(),
                    project.get_special_room(),
                    project.get_blockdays_during_lecture(),
                    project.get_num_blockdays_prior_lecture(),
                    project.get_blockdays_prior_lecture(),
                    project.get_num_blockdays_during_lecture(),
                    project.get_blockdays_during_lecture(),
                    project.get_weekly(),
                    project.get_num_spots(),
                    project.get_language(),
                    project.get_id(),
                    project.get_name(),
                    project.get_date())

            cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return project


    def delete(self, project):
        """Deleting the data of a project object from the database.
        : param project the "object" to be deleted from the DB
        """

        cursor = self._connection.cursor()
        command = "DELETE FROM Project WHERE project_id={}".format(project.get_project_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

        return project

    def update(self, project):
        """Repeated writing of an project object to the database.
            : param project the object to be written into the DB
        """
        cursor = self._connection.cursor()

        command = "UPDATE Project " + "SET name=%s,creation_date=%, projecttype_id=%s, short_description=%s," \
                                       " link=%s, room_desired=%s, grade_average=%s, num_blockdays_in_exam=%s, " \
                                       "blockdays_in_exam=%s, special_room=%s, date_blockdays_during_lecture=%s," \
                                       " num_blockdays_prior_lecture=%s, blockdays_prior_lecture=%s," \
                                       " num_blockdays_during_lecture=%s, blockdays_during_lecture=%s," \
                                       " weekly=%s, num_spots=%s, language=%s, necessary_room=%s,  additional_professor=%s, professor=%s," \
                                       " participation_id=%s, room_necessary=%s, module_id=%s WHERE id=%s"

        data = (project.get_id(),
                project.get_name(),
                project.get_date(),
                project.get_short_description(),
                project.get_link(),
                project.get_room_desired(),
                project.get_professor_id(),
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
                project.get_room_necessary(),
                project.get_additional_prof(),
                project.get_module_id(),
                project.get_language(),
                project.get_professor_id(),
                project.get_participation_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()


# --- find project by professorID ---

    """def find_project_by_professor_id(self,project_id):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT project_id, project_name, short_description, link, room_desired, grade_average," \
                  " num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture," \
                  " num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture," \
                  " blockdays_during_lecture, weekly, num_spots, language, nessecary_room, additional_professor," \
                  " participation_id, projecttype_id, professor_id, participation_id, module_id" \
                  "  FROM projects WHERE professor_id={}" \
                    .format(project_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (project_id, project_name, date, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots, participation_id, projecttype_id, professor_id ) = tuples[0]
            project = Project()
            project.set_id(project_id)
            project.set_name(project_name)
            project.set_date(date)
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
            project.set_participation_id(participation_id)
            project.set_projecttype_id(projecttype_id)
            project.set_professor_id(professor_id)
            result = project

        

        self._connection.commit()
        cursor.close()
        return result

# --- find project by PARTICIPATION ID ---

    def find_project_by_projecttype_id(self,project_id):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT project_id, project_name, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots, participation_id, projecttype_id, professor_id  FROM projects WHERE projecttype_id={}" \
                    .format(project_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (project_id, project_name, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots, participation_id, projecttype_id, professor_id ) = tuples[0]
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
            project.set_participation_id(participation_id)
            project.set_projecttype_id(projecttype_id)
            project.set_professor_id(professor_id)
            result = project

        

        self._connection.commit()
        cursor.close()
        return result
"""
