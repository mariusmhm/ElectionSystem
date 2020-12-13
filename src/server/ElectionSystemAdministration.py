from server.bo.Student import Student
from server.bo.User import User
from server.bo.Semester import Semester

from server.db.StudentMapper import StudentMapper
from server.db.UserMapper import UserMapper
from server.db.SemesterMapper import SemesterMapper


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
        
        
        def create_semester(self, winter_semester, grading_end_date, submit_projects_end_date):
        """Create a new semester:"""
        semester = Semester()
        semester.set_wintersemester(winter_semester)
        semester.set_grading_end_date(grading_end_date)
        semester.set_submit_projects_end_date(submit_projects_end_date)
        semester.set_creation_date(1)
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
