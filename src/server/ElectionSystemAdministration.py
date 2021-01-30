from server.bo.Grading import Grading
from server.bo.Module import Module
from server.bo.Participation import Participation
from server.bo.Project import Project
from server.bo.Projecttype import Projecttype
from server.bo.Semester import Semester
from server.bo.Student import Student
from server.bo.User import User
from server.State import State
from server.Role import Role

from server.db.GradingMapper import GradingMapper
from server.db.ModuleMapper import ModuleMapper
from server.db.ParticipationMapper import ParticipationMapper
from server.db.ProjectMapper import ProjectMapper
from server.db.ProjecttypeMapper import ProjecttypeMapper
from server.db.SemesterMapper import SemesterMapper
from server.db.StudentMapper import StudentMapper
from server.db.UserMapper import UserMapper
from server.db.StateMapper import StateMapper
from server.db.RoleMapper import RoleMapper


class ElectionSystemAdministration (object):
    """This class aggregates almost all application logic (Business Logic).
    It is like a spider that overlooks all the relationships in its web (in our
    case the data of the in our case, the data of the application) and ensures an
    orderly flow and permanent consistency of data and processes.
    The application logic is found in the methods of this class. Each of these
    methods can be called a transaction script. This name
    already suggests that here analogous to data base transaction per
    several partial actions are carried out for each transaction, which move
    the system from one from a consistent condition into another, also again
    consistent condition. state again. If this should fail in the meantime,
    then the respective Transaction Script is responsible for it to accomplish
    an error handling.


    This class is related to a number of other data types. These
    are:
    - the classes BusinessObject and their subclasses,
    - the mapper classes for DB access.

    ElectionSystemAdministration only represent the server-side view of the application logic.
    This is completely based on synchronous function calls.

    *Important note:*

    This class makes use of so-called
    mapper classes. They belong to the database layer and form the
    object-oriented view of the application logic on the relationally
    organized database. Occasionally "creative" contemporaries come up with the
    idea to implement application logic in these mappers as well. See also
    also the notes in the method for deleting project objects.
    The only understandable argument for such an approach is the increase of the
    the performance of extensive database operations. But even this argument
    is only valid if really large amounts of data are to be handled. In such a
    In such a case, however, a correspondingly extended architecture would have to
     be implemented, which in turn would isolate all application logic in the application layer.
    would be isolated. So: do not "put" application logic into the mapper classes,
     but concentrate concentrate this on the application layer!

    There is certainly much more to write about this class. More
    Info you will get in the course.


"""

    def __init__(self):
        pass

    # --- STUDENT SPECIFIC OPERATIONS ---

    def get_all_students(self):
        with StudentMapper() as mapper:
            return mapper.find_all()


    def get_student_by_id(self, id):
        """Read out a student object by ID."""

        with StudentMapper() as mapper:
            return mapper.find_by_id(id)


    def get_student_by_name(self, name):
        """Read out a student object by name."""

        with StudentMapper() as mapper:
            return mapper.find_by_name(name)


    def get_student_by_mail(self, mail):
        """Read out a student object by e-mail."""

        with StudentMapper() as mapper:
            return mapper.find_by_mail(mail)

    def get_student_by_google_id(self, id):
        """Read out a student object by google id."""

        with StudentMapper() as mapper:
            return mapper.find_by_google_id(id)


    def get_student_by_matrikel_nr(self, matrikel_nr):
        """Read out a student object by martriculation number."""

        with StudentMapper() as mapper:
            return mapper.find_by_matrikel_nr(matrikel_nr)


    def get_student_by_study(self, study):
        """Read out a student object by study."""

        with StudentMapper() as mapper:
            return mapper.find_by_study(study)


    def update_student(self, student):
        """Update a user student if there are changes."""

        with StudentMapper() as mapper:
            return mapper.update(student)


    def delete_student(self, student):
        """Delete a student object."""

        with StudentMapper() as mapper:
            return mapper.delete(student)


    def create_student(self, name, creation_date, google_user_id, firstname, mail, role, matrikel_nr, study):
        """Create a new Student Object:"""

        student = Student()
        student.set_name(name)
        student.set_date(creation_date)
        student.set_google_user_id(google_user_id)
        student.set_firstname(firstname)
        student.set_mail(mail)
        student.set_role_id(role)
        student.set_matrikel_nr(matrikel_nr)
        student.set_study(study)
        student.set_id(1)

        with StudentMapper() as mapper:
            return mapper.insert(student)

    def get_all_students_of_participation(self,project_id):
        """Read out a student object by project."""

        print('methoden Aufruf')
        participations=self.get_all_by_project_id(project_id)
        students = []
        print(participations)

        for element in participations:
            student_i= element.get_student_id()
            students.append(self.get_student_by_id(student_i))

        print(students)
        return students

    # --- USER SPECIFIC OPERATIONS ---

    def get_all_users(self):
        """Read out all user object."""

        with UserMapper() as mapper:
            return mapper.find_all()


    def get_user_by_id(self, id):
        """Read out a user object by id."""

        with UserMapper() as mapper:
            return mapper.find_by_id(id)

    def get_user_by_google_id(self, id):
        """Read out a user object by google id."""

        with UserMapper() as mapper:
            return mapper.find_by_google_id(id)

    def get_user_by_name(self, name):
        """Read out a user object by name."""

        with UserMapper() as mapper:
            return mapper.find_by_name(name)


    def get_user_by_mail(self, mail):
        """Read out a user object by mail."""

        with UserMapper() as mapper:
            return mapper.find_by_mail(mail)


    def get_user_by_role(self, role):
        """Read out a user object by role."""

        with UserMapper() as mapper:
            return mapper.find_by_role(role)


    def update_user(self, user):
        """Update a user object if there are changes."""

        with UserMapper() as mapper:
            return mapper.update(user)


    def delete_user(self, user):
        """Delets a user object."""

        with UserMapper() as mapper:
            return mapper.delete(user)


    def create_user(self, name, creation_date, google_user_id, firstname, mail, role):
        """Creates a new user object."""

        user = User()
        user.set_name(name)
        user.set_date(creation_date)
        user.set_google_user_id(google_user_id)
        user.set_firstname(firstname)
        user.set_mail(mail)
        user.set_role_id(role)
        user.set_id(1)

        with UserMapper() as mapper:
            return mapper.insert(user)


        #---SEMESTER SPECIFIC OPERATIONS-----


    def create_semester(self, creation_date, name, submit_projects, grading, election):
        """Creats a new semester:"""

        semester = Semester()
        semester.set_date(creation_date)
        semester.set_name(name)
        semester.set_submit_projects(submit_projects)
        semester.set_grading(grading)
        semester.set_election(election)
        semester.set_id(1)


        with SemesterMapper() as mapper:
            return mapper.insert(semester)

    def get_semester_by_id(self, id):
        """Reads out the semester by ID."""

        with SemesterMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_semester(self):
        """Reads out all semesters"""

        with SemesterMapper() as mapper:
            return mapper.find_all()

    def save_semester(self, semester):
        """Updates a semester."""

        with SemesterMapper() as mapper:
            mapper.update(semester)

    def delete_semester(self, semester):
        """Deletes a semester"""

        with SemesterMapper() as mapper:
            mapper.delete(semester)

    #-----Participation--------

    def create_participation(self, creation_date, priority, grading_id, student_id, project_id):
        """Creates a participation object if there are changes."""

        #create participation
        pp = Participation()
        pp.set_date(creation_date)
        pp.set_priority(priority)
        pp.set_grading_id(grading_id)
        pp.set_student_id(student_id)
        pp.set_project_id(project_id)
        pp.set_id(1)

        with ParticipationMapper() as mapper:
            return mapper.insert(pp)

    def save_participation(self, participation):
        """Saves the partcipation object if there are changes."""

        with ParticipationMapper() as mapper:
            mapper.update(participation)

    def delete_participation(self, participation):
        """Delets a participation object."""

        with ParticipationMapper() as mapper:
            mapper.delete(participation)

    def get_by_participation_id(self, id):
        """Reads out a participation object by ID."""

        with ParticipationMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_by_project_id(self, project_id):
        """Reads out all participation objects by ID."""

        with ParticipationMapper() as mapper:
            return mapper.find_all_by_project_id(project_id)

    def get_all_by_student_id(self, student_id):
        """Reads out a participation object by student ID."""

        with ParticipationMapper() as mapper:
            return mapper.find_all_by_student_id(student_id)

    def get_all_by_grading_id(self, grading_id):
        """Reads out  participation objects by grading ID."""

        with ParticipationMapper() as mapper:
            return mapper.find_all_by_grading_id(grading_id)

    def get_by_project(self, project_id):
        """Reads out  participation objects by project ID."""

        with ParticipationMapper() as mapper:
            return mapper.find_by_project(project_id)


    def delete_grading_id(self, participation):
        """Delets a participation object by ID."""

        with ParticipationMapper() as mapper:
            mapper.delete_grading_id(participation)

    def get_participation_by_student_and_project(self,project_id, student_id):
        """Reads out participation objects by student ID and project ID."""
        print('methoden Aufruf')
        participations = self.get_all_by_project_id(project_id)
        participation = None
        print(participations)

        i=0

        for element in participations:
            if element.get_student_id() == student_id:
                participation = participations[i]
            else:

                print(participation)
        return participation

    #-----Grading-------

    def create_grading(self, creation_date, grade):
        """Creates a  grading object."""

        allgrades = self.get_all_grades()

        glist=[]

        for g in allgrades:
            glist.append(g.get_grade())

        if grade in glist:
            print('grade exists')
            return None
        else:
            g = Grading()
            g.set_date(creation_date)
            g.set_grade(grade)
            g.set_id(1)

            with GradingMapper() as mapper:
                return mapper.insert(g)



    def save_grading(self, grading):
        """Saves a  grading objects."""

        with GradingMapper() as mapper:
            mapper.update(grading)

    def delete_grading(self, grading):
        """Delets a grading object by ID."""

        with GradingMapper() as mapper:

            participations = self.get_all_by_grading_id(grading.get_id())

            if not(participations is None):
                for p in participations:
                    self.delete_grading_id(p)

            mapper.delete(grading)


    def get_all_grades(self):
        """Reads out  all grading objects."""

        with GradingMapper() as mapper:
            return mapper.find_all()

    def get_by_grading_id(self, id):
        """Reads out a grading object by ID."""

        with GradingMapper() as mapper:
            return mapper.find_by_id(id)

#------------Projecttype-----------

    def get_all_projecttypes (self):
        """Reads out all projecttype objects ."""

        with ProjecttypeMapper() as mapper:
            return mapper.find_all()

    def get_projecttype_by_id (self, p_id):
        """Reads out  a projecttype object by  ID."""

        with ProjecttypeMapper() as mapper:
            return mapper.find_by_id(p_id)

    def get_projecttype_by_name(self, name):
        """Reads out a projecttype object by name."""

        with ProjecttypeMapper() as mapper:
            return mapper.find_by_name(name)

    def update_projecttype(self, pt):
        """Updates a projecttype object."""

        with ProjecttypeMapper() as mapper:
            return mapper.update(pt)

    def delete_projecttype(self, pt):
        """Delets a projecttype object by ID."""

        with ProjecttypeMapper() as mapper:
            return mapper.delete(pt)

    def create_projecttype(self, name, creation_date, sws, ect):
        """Creates a new projecttype object."""

        projecttype = Projecttype()
        projecttype.set_name(name)
        projecttype.set_id(creation_date)
        projecttype.set_ect(ect)
        projecttype.set_sws(sws)
        projecttype.set_date(1)

        with ProjecttypeMapper() as mapper:
            return mapper.insert(projecttype)

     #---project related----

    def get_all_projects(self):
        """Reads out  all project objects."""

        with ProjectMapper() as mapper:
            return mapper.find_all()

    def get_project_by_id(self, number):
        """Reads out  a project object by  ID."""

        with ProjectMapper() as mapper:
            return mapper.find_by_id(number)

    def get_project_by_name(self, name):
        """Reads out  a project object by name."""

        with ProjectMapper() as mapper:
            return mapper.find_project_by_name(name)

    def get_project_by_professorID(self, number):
        """Reads out  a project object by professor."""

        with ProjectMapper() as mapper:
            return mapper.find_project_by_professor_id(number)

    def get_project_by_projecttypeID(self, number):
        """Reads out project objects by  projecttype."""

        with ProjectMapper() as mapper:
            return mapper.find_project_by_projecttype_id(number)

    def get_project_by_state(self, state):
        """Reads out projects objects by state."""

        with ProjectMapper() as mapper:
            return mapper.find_project_by_state(state)

    
    def get_project_by_module(self, module_id):
        """Reads out a projects object by module."""

        with ProjectMapper() as mapper:
            return mapper.get_project_by_module(module_id)

    # --- Project SPECIFIC OPERATIONS ---

    def create_project(self, creation_date, name, short_description, special_room, room_desired, num_blockdays_prior_lecture, date_blockdays_during_lecture, num_blockdays_during_lecture, num_blockdays_in_exam, weekly, num_spots, language, external_partner, edv_number, projecttype_id, module_id, professor_id, add_professor_id, current_state_id):
        """Creates a new project object."""

        project = Project()
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
        if add_professor_id is not 0:
            project.set_add_professor_id(add_professor_id)
        project.set_state(current_state_id)
        project.set_id(1)

        with ProjectMapper() as mapper:
            return mapper.insert(project)

    def delete_project(self, project):
        """Delets a project object by ID."""

        with ProjectMapper() as mapper:
           return mapper.delete(project)


    def update_project(self, project):
        """Saves a project object."""

        with ProjectMapper() as mapper:
            mapper.update(project)
    


    #------Module specific operations----

    def create_module(self, creation_date, edv_number, name):
        """Create a new Module:"""
        module = Module()
        module.set_date(creation_date)
        module.set_edv_number(edv_number)
        module.set_name(name)
        module.set_id(1)

        with ModuleMapper() as mapper:
            return mapper.insert(module)

    def get_module_by_id(self, id):
        """Read out the module by ID."""

        with ModuleMapper() as mapper:
            return mapper.find_by_id(id)

    def get_module_by_edv(self,edv_number):
        """Read out the module by edv number."""

        with ModuleMapper() as mapper:
            return mapper.find_by_edv_number(edv_number)

    def get_module_by_name(self,name):
        """Read out the module by name."""

        with ModuleMapper() as mapper:
            return mapper.find_by_name(name)

    def get_all_modules(self):
        """Read out all module objects."""

        with ModuleMapper() as mapper:
            return mapper.find_all()

    def save_module(self, module):
        """Update a module object."""
        with ModuleMapper() as mapper:
            mapper.update(module)

    def delete_module(self, module):
        """delete a module object."""
        with ModuleMapper() as mapper:
            mapper.delete(module)

    #------State specific operations----
    def create_state(self, name):
        """"creates a new state."""

        state = State()
        state.set_name(name)
        state.set_id(1)

        with StateMapper() as mapper:
            return mapper.insert(state)

    def save_state(self, state):
        """Save a state object."""
        with StateMapper() as mapper:
            mapper.update(state)

    def delete_state(self, state):
        """Delete  a state object by ID."""
        with StateMapper() as mapper:
            mapper.delete(state)

    def get_all_states(self):
        """Get all state objects."""
        with StateMapper() as mapper:
            return mapper.find_all()

    def get_by_state_id(self, id):
        """Reads out  a state object by  ID."""
        with StateMapper() as mapper:
            return mapper.find_by_id(id)

    #------Role specific operations----
    def create_role(self, name):
        """"creates a new role"""

        role = Role()
        role.set_name(name)
        role.set_id(1)

        with RoleMapper() as mapper:
            return mapper.insert(role)

    def save_role(self, role):
        """Save  a role object."""
        with RoleMapper() as mapper:
            mapper.update(role)

    def delete_role(self, role):
        """Delete a role object by  ID."""
        with RoleMapper() as mapper:
            mapper.delete(role)

    def get_all_roles(self):
        """Reads out  all role objects."""
        with RoleMapper() as mapper:
            return mapper.find_all()

    def get_by_role_id(self, id):
        """Reads out  a role object by  ID."""
        with RoleMapper() as mapper:
            return mapper.find_by_id(id)


    # --- Election Priority Logic ---

    def finish_election(self, project_id):
        """
         This method determines the
         participation in the projects
         chosen by the students on the basis
         of the priorities set.

        """
        adm = ElectionSystemAdministration()
        project_by_id = adm.get_project_by_id(project_id)
        old_pp = adm.get_by_project(project_id)
        new_pp = []
        highest_prio = 4
        min_pp = 5
        participation_num = project_by_id.get_num_spots()

        if len(old_pp) > participation_num:
            for pp in old_pp:
                if pp.get_priority() == highest_prio and len(new_pp) < participation_num:
                    new_pp.append(pp)
                    print("first row", pp.get_priority())
                elif 0 < highest_prio and len(new_pp) < participation_num:
                    new_pp.append(pp)
                    highest_prio = highest_prio - 1
                    print("sec row", pp.get_priority())
            
        elif len(old_pp) >= min_pp:
            new_pp = old_pp
            print("third row")
        else:
            print("There are not enough Participations for this Project")

        for new in new_pp:
            old_pp.remove(new)
            adm.save_participation(new)
            print("add row", new.get_priority())

        for old in old_pp:
            adm.delete_participation(old)
            print("del row", old.get_priority())
