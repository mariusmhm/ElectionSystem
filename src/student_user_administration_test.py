from server.bo.Student import Student
from server.bo.User import User

from server.db.StudentMapper import StudentMapper
from server.db.UserMapper import UserMapper


class StudentUserAdministration (object):

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


    def create_student(self, name, student_firstname, mail, role, matrikel_nr, study):
        student = Student()
        student.set_name(name)
        student.set_firstname(student_firstname)
        student.set_mail(mail)
        student.set_role(role)
        student.set_matrikel_nr(matrikel_nr)
        student.set_study(study)
        student.set_id(1)
        student.set_date(1)

        with StudentMapper() as mapper:
            return mapper.insert(student)

# creating an example dataset for student
# WHY IS THERE A NEED FOR THE FIRST POSITION AS AN ARGUMENT
StudentUserAdministration.create_student(0, "Mueller", "Amna", "jdasjn@dd.de", 'student',123456, "Jura")
StudentUserAdministration.create_student(0, "hallo", "Patrick", "testing@test.de", 'professor', 274617, "Medieninformatik")


    # --- USER SPECIFIC OPERATIONS ---

