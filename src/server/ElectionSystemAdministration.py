from server.bo.Student import Student
from server.bo.User import User
from server.bo.Semester import Semester
from server.bo.Participation import Participation
from server.bo.Grading import Grading

from server.db.StudentMapper import StudentMapper
from server.db.UserMapper import UserMapper
from server.db.SemesterMapper import SemesterMapper
from server.db.ParticipationMapper import ParticipationMapper
from server.db.GradingMapper import GradingMapper
from server.bo.Projecttype import Projecttype
from server.db.ProjecttypeMapper import ProjecttypeMapper


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



    # --- Election Priority Logic ---

    def finish_election(self, project_id):
        adm = ElectionSystemAdministration()
        old_pp = adm.get_by_project(project_id)
        new_pp = []
        highest_prio = 4
        min_pp = 1
        participation_num = 3
        
        if len(old_pp) > participation_num:
            for pp in old_pp:
                if pp.get_priority() == highest_prio and len(new_pp) < participation_num:
                    new_pp.append(pp)
                elif 0 < highest_prio:
                    highest_prio = highest_prio - 1
                else:
                    break
            return new_pp
        else:
            if len(old_pp) >= min_pp:
                new_pp = old_pp
            else:
                print("There are not enough Participations for this Project")
            return new_pp
                
        """ for old in old_pp:
            adm.delete_participation(old) """

        for new in new_pp:

            print(new.get_id())
            adm.save_participation(new)

        return new_pp

lilalu = ElectionSystemAdministration.finish_election(1, 5)
print(lilalu)