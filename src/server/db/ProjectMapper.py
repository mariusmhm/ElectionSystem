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

        for (id, creation_date, name, short_description, special_room, room_desired, num_blockdays_prior_lecture,
             date_blockdays_during_lecture, num_blockdays_during_lecture, num_blockdays_in_exam, 
             weekly, num_spots, language, external_partner, edv_number, projecttype_id, module_id, professor_id,
             add_professor_id, current_state_id) in tuples:

            project = Project()
            project.set_id(id)
            project.set_date(creation_date)
            project.set_name(name)
            project.set_short_description(short_description)
            project.set_special_room(special_room)
            project.set_room_desired(room_desired)
            project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
            project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
            project.set_num_blockdays_during_lecture(num_blockdays_during_lecture)
            project.set_num_blockdays_in_exam(num_blockdays_in_exam)
            project.set_weekly(weekly)
            project.set_num_spots(num_spots)
            project.set_language(language)
            project.set_external_partner(external_partner)
            project.set_edv_number(edv_number)
            project.set_projecttype_id(projecttype_id)
            project.set_module_id(module_id)
            project.set_professor_id(professor_id)
            project.set_add_professor_id(add_professor_id)
            project.set_state(current_state_id)
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
        command = "SELECT * FROM Project WHERE id={}".format(id)

        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, creation_date, name, short_description, special_room, room_desired, num_blockdays_prior_lecture,
             date_blockdays_during_lecture, num_blockdays_during_lecture, num_blockdays_in_exam, 
             weekly, num_spots, language, external_partner, edv_number, projecttype_id, module_id, professor_id,
             add_professor_id, current_state_id) in tuples:

            project = Project()
            project.set_id(id)
            project.set_date(creation_date)
            project.set_name(name)
            project.set_short_description(short_description)
            project.set_special_room(special_room)
            project.set_room_desired(room_desired)
            project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
            project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
            project.set_num_blockdays_during_lecture(num_blockdays_during_lecture)
            project.set_num_blockdays_in_exam(num_blockdays_in_exam)
            project.set_weekly(weekly)
            project.set_num_spots(num_spots)
            project.set_language(language)
            project.set_external_partner(external_partner)
            project.set_edv_number(edv_number)
            project.set_projecttype_id(projecttype_id)
            project.set_module_id(module_id)
            project.set_professor_id(professor_id)
            project.set_add_professor_id(add_professor_id)
            project.set_state(current_state_id)
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

        for (id, creation_date, name, short_description, special_room, room_desired, num_blockdays_prior_lecture,
             date_blockdays_during_lecture, num_blockdays_during_lecture, num_blockdays_in_exam, 
             weekly, num_spots, language, external_partner, edv_number, projecttype_id, module_id, professor_id,
             add_professor_id, current_state_id) in tuples:

            project = Project()
            project.set_id(id)
            project.set_date(creation_date)
            project.set_name(name)
            project.set_short_description(short_description)
            project.set_special_room(special_room)
            project.set_room_desired(room_desired)
            project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
            project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
            project.set_num_blockdays_during_lecture(num_blockdays_during_lecture)
            project.set_num_blockdays_in_exam(num_blockdays_in_exam)
            project.set_weekly(weekly)
            project.set_num_spots(num_spots)
            project.set_language(language)
            project.set_external_partner(external_partner)
            project.set_edv_number(edv_number)
            project.set_projecttype_id(projecttype_id)
            project.set_module_id(module_id)
            project.set_professor_id(professor_id)
            project.set_add_professor_id(add_professor_id)
            project.set_state(current_state_id)
            result.append(project)

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
            
        command =   "INSERT INTO Project (id, creation_date, name, short_description, special_room, room_desired, num_blockdays_prior_lecture,  \
                    date_blockdays_during_lecture, num_blockdays_during_lecture, num_blockdays_in_exam, weekly, num_spots, language, external_partner, edv_number,  \
                    projecttype_id, module_id, professor_id, add_professor_id, current_state_id) \
                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

        data = (project.get_id(),
                project.get_date(),
                project.get_name(),
                project.get_short_description(),
                project.get_special_room(),
                project.get_room_desired(),
                project.get_num_blockdays_prior_lecture(),
                project.get_date_blockdays_during_lecture(),
                project.get_num_blockdays_during_lecture(),
                project.get_num_blockdays_in_exam(),
                project.get_weekly(),
                project.get_num_spots(),
                project.get_language(),
                project.get_external_partner(),
                project.get_edv_number(),
                project.get_projecttype_id(),
                project.get_module_id(),
                project.get_professor_id(),
                project.get_add_professor_id(),
                project.get_state())
        
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()

        return project


    def delete(self, project):
        """Deleting the data of a project object from the database.
        : param project the "object" to be deleted from the DB
        """

        cursor = self._connection.cursor()
        command = "DELETE FROM Project WHERE id={}".format(project.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

        return project

    def update(self, project):
        """Repeated writing of an project object to the database.
            : param project the object to be written into the DB
        """
        cursor = self._connection.cursor()

        command = "UPDATE Project " + "SET name=%s, short_description=%s, special_room=%s, room_desired=%s, num_blockdays_prior_lecture=%s,  \
                    date_blockdays_during_lecture=%s, num_blockdays_during_lecture=%s, num_blockdays_in_exam=%s, weekly=%s, num_spots=%s, \
                    language=%s, external_partner=%s, edv_number=%s, projecttype_id=%s, module_id=%s, professor_id=%s, add_professor_id=%s, current_state_id=%s WHERE id=%s"
        
        data = (project.get_name(),
                project.get_short_description(),
                project.get_special_room(),
                project.get_room_desired(),
                project.get_num_blockdays_prior_lecture(),
                project.get_date_blockdays_during_lecture(),
                project.get_num_blockdays_during_lecture(),
                project.get_num_blockdays_in_exam(),
                project.get_weekly(),
                project.get_num_spots(),
                project.get_language(),
                project.get_external_partner(),
                project.get_edv_number(),
                project.get_projecttype_id(),
                project.get_module_id(),
                project.get_professor_id(),
                project.get_add_professor_id(),
                project.get_state(),
                project.get_id())
                
                
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()


    def find_project_by_professor_id(self, professor_id):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT * FROM Project WHERE professor_id={}".format(professor_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, short_description, special_room, room_desired, num_blockdays_prior_lecture,
             date_blockdays_during_lecture, num_blockdays_during_lecture, num_blockdays_in_exam, 
             weekly, num_spots, language, external_partner, edv_number, projecttype_id, module_id, professor_id,
             add_professor_id, current_state_id) in tuples:

            project = Project()
            project.set_id(id)
            project.set_date(creation_date)
            project.set_name(name)
            project.set_short_description(short_description)
            project.set_special_room(special_room)
            project.set_room_desired(room_desired)
            project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
            project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
            project.set_num_blockdays_during_lecture(num_blockdays_during_lecture)
            project.set_num_blockdays_in_exam(num_blockdays_in_exam)
            project.set_weekly(weekly)
            project.set_num_spots(num_spots)
            project.set_language(language)
            project.set_external_partner(external_partner)
            project.set_edv_number(edv_number)
            project.set_projecttype_id(projecttype_id)
            project.set_module_id(module_id)
            project.set_professor_id(professor_id)
            project.set_add_professor_id(add_professor_id)
            project.set_state(current_state_id)
            result.append(project)

        self._connection.commit()
        cursor.close()
        return result


    def find_project_by_projecttype_id(self, projecttype_id):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT * FROM Project WHERE projecttype_id={}".format(projecttype_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, short_description, special_room, room_desired, num_blockdays_prior_lecture,
             date_blockdays_during_lecture, num_blockdays_during_lecture, num_blockdays_in_exam, 
             weekly, num_spots, language, external_partner, edv_number, projecttype_id, module_id, professor_id,
             add_professor_id, current_state_id) in tuples:

            project = Project()
            project.set_id(id)
            project.set_date(creation_date)
            project.set_name(name)
            project.set_short_description(short_description)
            project.set_special_room(special_room)
            project.set_room_desired(room_desired)
            project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
            project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
            project.set_num_blockdays_during_lecture(num_blockdays_during_lecture)
            project.set_num_blockdays_in_exam(num_blockdays_in_exam)
            project.set_weekly(weekly)
            project.set_num_spots(num_spots)
            project.set_language(language)
            project.set_external_partner(external_partner)
            project.set_edv_number(edv_number)
            project.set_projecttype_id(projecttype_id)
            project.set_module_id(module_id)
            project.set_professor_id(professor_id)
            project.set_add_professor_id(add_professor_id)
            project.set_state(current_state_id)
            result.append(project)

        

        self._connection.commit()
        cursor.close()
        return result

    def find_project_by_state(self, state):
        """Read out all projects based on their state.
        :return A collection of projects objects that all represent all projects by state."""
       
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM Project WHERE current_state_id={}".format(state))
        tuples = cursor.fetchall()

        for (id, creation_date, name, short_description, special_room, room_desired, num_blockdays_prior_lecture,
             date_blockdays_during_lecture, num_blockdays_during_lecture, num_blockdays_in_exam, 
             weekly, num_spots, language, external_partner, edv_number, projecttype_id, module_id, professor_id,
             add_professor_id, current_state_id) in tuples:

            project = Project()
            project.set_id(id)
            project.set_date(creation_date)
            project.set_name(name)
            project.set_short_description(short_description)
            project.set_special_room(special_room)
            project.set_room_desired(room_desired)
            project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
            project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
            project.set_num_blockdays_during_lecture(num_blockdays_during_lecture)
            project.set_num_blockdays_in_exam(num_blockdays_in_exam)
            project.set_weekly(weekly)
            project.set_num_spots(num_spots)
            project.set_language(language)
            project.set_external_partner(external_partner)
            project.set_edv_number(edv_number)
            project.set_projecttype_id(projecttype_id)
            project.set_module_id(module_id)
            project.set_professor_id(professor_id)
            project.set_add_professor_id(add_professor_id)
            project.set_state(current_state_id)
            result.append(project)

        self._connection.commit()
        cursor.close()

        return result