from server.bo.Grading import Grading
from server.bo.Module import Module
from server.bo.Participation import Participation
from server.bo.Project import Project
from server.bo.Projecttype import Projecttype
from server.bo.Semester import Semester
from server.bo.Student import Student
from server.bo.User import User

from server.db.GradingMapper import GradingMapper
from server.db.ModuleMapper import ModuleMapper
from server.db.ParticipationMapper import ParticipationMapper
from server.db.ProjectMapper import ProjectMapper
from server.db.ProjecttypeMapper import ProjecttypeMapper
from server.db.SemesterMapper import SemesterMapper
from server.db.StudentMapper import StudentMapper
from server.db.UserMapper import UserMapper


class ElectionSystemAdministration (object):

    def __init__(self):
        pass

    # --- STUDENT SPECIFIC OPERATIONS ---

    def get_all_students (self):
        with StudentMapper() as mapper:
            return mapper.find_all()


    def get_student_by_id (self, id):
        with StudentMapper() as mapper:
            return mapper.find_by_id(id)


    def get_student_by_name (self, name):
        with StudentMapper() as mapper:
            return mapper.find_by_name(name)


    def get_student_by_mail (self, mail):
        with StudentMapper() as mapper:
            return mapper.find_by_mail(mail)


    def get_student_by_matrikel_nr (self, matrikel_nr):
        with StudentMapper() as mapper:
            return mapper.find_by_matrikel_nr(matrikel_nr)


    def get_student_by_study (self, study):
        with StudentMapper() as mapper:
            return mapper.find_by_study(study)


    def update_student(self, student):
        with StudentMapper() as mapper:
            return mapper.update(student)


    def delete_student(self, student):
        with StudentMapper() as mapper:
            return mapper.delete(student)


    def create_student(self, name, google_user_id, firstname, mail, role, matrikel_nr, study):
        student = Student()
        student.set_name(name)
        student.set_google_user_id(google_user_id)
        student.set_firstname(firstname)
        student.set_mail(mail)
        student.set_role(role)
        student.set_matrikel_nr(matrikel_nr)
        student.set_study(study)
        student.set_id(1)
        student.set_date(1)

        with StudentMapper() as mapper:
            return mapper.insert(student)

    def get_all_students_of_participation(self,project_id):
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

    def get_all_users (self):
        with UserMapper() as mapper:
            return mapper.find_all()


    def get_user_by_id (self, id):
        with UserMapper() as mapper:
            return mapper.find_by_id(id)


    def get_user_by_name (self, name):
        with UserMapper() as mapper:
            return mapper.find_by_name(name)


    def get_user_by_mail (self, mail):
        with UserMapper() as mapper:
            return mapper.find_by_mail(mail)


    def get_user_by_role (self, role):
        with UserMapper() as mapper:
            return mapper.find_by_role(role)


    def update_user(self, user):
        with UserMapper() as mapper:
            return mapper.update(user)


    def delete_user(self, user):
        with UserMapper() as mapper:
            return mapper.delete(user)


    def create_user(self, name, google_user_id, firstname, mail, role):
        user = User()
        user.set_name(name)
        user.set_google_user_id(google_user_id)
        user.set_firstname(firstname)
        user.set_mail(mail)
        user.set_role(role)
        user.set_id(1)
        user.set_date(1)

        with UserMapper() as mapper:
            return mapper.insert(user)


        #---SEMESTER SPECIFIC OPERATIONS-----


    def create_semester(self, winter_semester, grading_end_date, submit_projects_end_date, submit_projects_beginn_date, grading_beginn_date):
        """Create a new semester:"""
        semester = Semester()
        semester.set_wintersemester(winter_semester)
        semester.set_grading_end_date(grading_end_date)
        semester.set_submit_projects_end_date(submit_projects_end_date)
        semester.set_submit_projects_beginn_date(submit_projects_beginn_date)
        semester.set_grading_beginn_date(grading_beginn_date)
        semester.set_date(1)
        semester.set_id(1)


        with SemesterMapper() as mapper:
            return mapper.insert(semester)

    def get_semester_by_id(self, id):
        """Read out the semester by ID."""
        with SemesterMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_semester(self):
        """Read out all semesters"""
        with SemesterMapper() as mapper:
            return mapper.find_all()

    def save_semester(self, semester):
        """update a semesters."""
        with SemesterMapper() as mapper:
            mapper.update(semester)

    def delete_semester(self, semester):
        """delete a semester"""
        with SemesterMapper() as mapper:
            mapper.delete(semester)

    #-----Participation--------

    def create_participation(self, priority, grading_id, student_id, project_id):
        #create participation
        pp = Participation()
        pp.set_priority(priority)
        pp.set_grading_id(grading_id)
        pp.set_student_id(student_id)
        pp.set_project_id(project_id)
        pp.set_id(1)
        pp.set_date(1)

        with ParticipationMapper() as mapper:
            return mapper.insert(pp)

    def save_participation(self, participation):
        with ParticipationMapper() as mapper:
            mapper.update(participation)

    def delete_participation(self, participation):
        with ParticipationMapper() as mapper:
            mapper.delete(participation)

    def get_by_participation_id(self, id):
        with ParticipationMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_by_project_id(self, project_id):
        with ParticipationMapper() as mapper:
            return mapper.find_all_by_project_id(project_id)

    def get_all_by_student_id(self, student_id):
        with ParticipationMapper() as mapper:
            return mapper.find_all_by_student_id(student_id)

    def get_all_by_grading_id(self, grading_id):
        with ParticipationMapper() as mapper:
            return mapper.find_all_by_grading_id(grading_id)

    def get_by_project(self, project_id):
        with ParticipationMapper() as mapper:
            return mapper.find_by_project(project_id)


    def delete_grading_id(self, participation):
        with ParticipationMapper() as mapper:
            mapper.delete_grading_id(participation)

    #-----Grading-------

    def create_grading(self, grade):

        allgrades = self.get_all_grades()

        glist=[]

        for g in allgrades:
            glist.append(g.get_grade())

        if grade in glist:
            print('grade exists')
            return None
        else:
            g = Grading()
            g.set_grade(grade)
            g.set_id(1)
            g.set_date(1)

            with GradingMapper() as mapper:
                return mapper.insert(g)



    def save_grading(self, grading):
        with GradingMapper() as mapper:
            mapper.update(grading)

    def delete_grading(self, grading):
        with GradingMapper() as mapper:

            participations = self.get_all_by_grading_id(grading.get_id())

            if not(participations is None):
                for p in participations:
                    self.delete_grading_id(p)

            mapper.delete(grading)


    def get_all_grades(self):
        with GradingMapper() as mapper:
            return mapper.find_all()

    def get_by_grading_id(self, id):
        with GradingMapper() as mapper:
            return mapper.find_by_id(id)

#------------Projecttype-----------

    def get_all_projecttypes (self):
        with ProjecttypeMapper() as mapper:
            return mapper.find_all()

    def get_projecttype_by_id (self, p_id):
        with ProjecttypeMapper() as mapper:
            return mapper.find_by_id(p_id)

    def get_projecttype_by_name(self, name):
        with ProjecttypeMapper() as mapper:
            return mapper.find_by_name(name)

    def update_projecttype(self, pt):
        with ProjecttypeMapper() as mapper:
            return mapper.update(pt)

    def delete_projecttype(self, pt):
        with ProjecttypeMapper() as mapper:
            return mapper.delete(pt)

    def create_projecttype(self,name, sws, ect):
        projecttype = Projecttype()
        projecttype.set_name(name)
        projecttype.set_ect(ect)
        projecttype.set_sws(sws)
        projecttype.set_id(1)
        projecttype.set_date(1)

        with ProjecttypeMapper() as mapper:
            return mapper.insert(projecttype)

     #---project related----

    def get_all_projects(self):
        with ProjectMapper() as mapper:
            return mapper.find_all()

    def get_project_by_id(self, number):
        with ProjectMapper() as mapper:
            return mapper.find_by_id(number)

    def get_project_by_name(self, name):
        with ProjectMapper() as mapper:
            return mapper.find_project_by_name(name)

    def get_project_by_professorID(self, number):
        with ProjectMapper() as mapper:
            return mapper.find_project_by_professor_id(number)

    def get_project_by_projecttypeID(self, number):
        with ProjectMapper() as mapper:
            return mapper.find_project_by_projecttype_id(number)

    def get_project_by_state(self, state):
        with ProjectMapper() as mapper:
            return mapper.find_project_by_state(state)

    # --- Project SPECIFIC OPERATIONS ---

    def create_project(self, name, short_description, special_room, room_desired, num_blockdays_prior_lecture, date_blockdays_during_lecture, num_blockdays_during_lecture, num_blockdays_in_exam, weekly, num_spots, language, external_partner, projecttype_id, module_id, professor_id, add_professor_id, state):
        #create project
        project = Project()
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
        project.set_projecttype_id(projecttype_id)
        project.set_module_id(module_id)
        project.set_professor_id(professor_id)
        project.set_add_professor_id(add_professor_id)
        project.set_state(state)
        project.set_id(1)
        project.set_date(1)
        

        with ProjectMapper() as mapper:
            return mapper.insert(project)

    def delete_project(self, project):
        """Delete the project."""
        with ProjectMapper() as mapper:
           return mapper.delete(project)


    def update_project(self, project):
        """Save the project."""

        with ProjectMapper() as mapper:
            mapper.update(project)

    #------Module specific operations----

    def create_module(self, edv_number, name):
        """Create a new Module:"""
        module = Module()
        module.set_edv_number(edv_number)
        module.set_name(name)
        module.set_date(1)
        module.set_id(1)

        with ModuleMapper() as mapper:
            return mapper.insert(module)

    def get_module_by_id(self, id):
        """Read out the module by ID."""
        with ModuleMapper() as mapper:
            return mapper.find_by_id(id)

    def get_module_by_edv(self,edv_number):
        """Read out the module by edv."""
        with ModuleMapper() as mapper:
            return mapper.find_by_edv_number(edv_number)

    def get_module_by_name(self,name):
        """Read out the module by name."""
        with ModuleMapper() as mapper:
            return mapper.find_by_name(name)

    def get_all_modules(self):
        """Read out all module"""
        with ModuleMapper() as mapper:
            return mapper.find_all()

    def save_module(self, module):
        """update a module."""
        with ModuleMapper() as mapper:
            mapper.update(module)

    def delete_module(self, module):
        """delete a module"""
        with ModuleMapper() as mapper:
            mapper.delete(module)


    # --- Election Priority Logic ---

    def finish_election(self, project_id):
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
            
        else:
            if len(old_pp) >= min_pp:
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

ElectionSystemAdministration.finish_election(1, 1)