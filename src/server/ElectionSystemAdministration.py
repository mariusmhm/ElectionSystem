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


class ElectionSystemAdministration(object):
    def __init__(self):
        pass

    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).
    Sie ist wie eine Spinne, die sämtliche Zusammenhänge in ihrem Netz (in unserem
    Fall die Daten der Applikation) überblickt und für einen geordneten Ablauf und
    dauerhafte Konsistenz der Daten und Abläufe sorgt.
    Die Applikationslogik findet sich in den Methoden dieser Klasse. Jede dieser
    Methoden kann als *Transaction Script* bezeichnet werden. Dieser Name
    lässt schon vermuten, dass hier analog zu Datenbanktransaktion pro
    Transaktion gleiche mehrere Teilaktionen durchgeführt werden, die das System
    von einem konsistenten Zustand in einen anderen, auch wieder konsistenten
    Zustand überführen. Wenn dies zwischenzeitig scheitern sollte, dann ist das
    jeweilige Transaction Script dafür verwantwortlich, eine Fehlerbehandlung
    durchzuführen.
    Diese Klasse steht mit einer Reihe weiterer Datentypen in Verbindung. Dies
    sind:
    - die Klassen BusinessObject und deren Subklassen,
    - die Mapper-Klassen für den DB-Zugriff.
    BankAdministration bilden nur die Server-seitige Sicht der
    Applikationslogik ab. Diese basiert vollständig auf synchronen
    Funktionsaufrufen.
    **Wichtiger Hinweis:** Diese Klasse bedient sich sogenannter
    Mapper-Klassen. Sie gehören der Datenbank-Schicht an und bilden die
    objektorientierte Sicht der Applikationslogik auf die relationale
    organisierte Datenbank ab. Zuweilen kommen "kreative" Zeitgenossen auf die
    Idee, in diesen Mappern auch Applikationslogik zu realisieren. Siehe dazu
    auch die Hinweise in der Methode zum Löschen von Customer-Objekten.
    Einzig nachvollziehbares Argument für einen solchen Ansatz ist die Steigerung
    der Performance umfangreicher Datenbankoperationen. Doch auch dieses Argument
    zieht nur dann, wenn wirklich große Datenmengen zu handhaben sind. In einem
    solchen Fall würde man jedoch eine entsprechend erweiterte Architektur realisieren,
    die wiederum sämtliche Applikationslogik in der Applikationsschicht isolieren
    würde. Also: keine Applikationslogik in die Mapper-Klassen "stecken" sondern
    dies auf die Applikationsschicht konzentrieren!"""


    """User specific methods"""

    def create_user(self, name, creation_date, email, google_user_id, role):
        """Create a User"""
        user = User()
        user.set_name(name)
        user.set_creation_date(creation_date)
        user.set_email(email)
        user.set_google_user(google_user_id)
        user.set_role(role)
        user.set_id(1)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_name(self, name):
        """Read out all users by name."""
        with UserMapper() as mapper:
            return mapper.find_by_name(name)

    def get_user_by_id(self, number):
        """Read out user by ID."""
        with UserMapper() as mapper:
            return mapper.find_by_id(number)

    def get_user_by_email(self, email):
        """Read out user by E-Mail."""
        with UserMapper() as mapper:
            return mapper.find_by_email(email)

    def get_user_by_google_user_id(self, id):
        """Read out user by Google ID."""
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def get_all_users(self):
        """Read out all users"""
        with UserMapper() as mapper:
            return mapper.find_all()

    def save_user(self, user):
        """update a user."""
        with UserMapper() as mapper:
            mapper.update(user)

    def delete_user(self, user):
        """delete a user."""
        with UserMapper() as mapper:
            mapper.delete(user)

        """Student specific methods"""
    def create_student(self, student_lastname, student_firstname, student_role, student_mail, matrikel_nr,
                       student_study):
        student = Student()
        student.set_lastname(student_lastname)
        student.set_firstname(student_firstname)
        student.set_role(student_role)
        student.set_email(student_mail)
        student.set_matrikel_nr(matrikel_nr)
        student.set_study(student_study)
        student.set_id(1)

        with StudentMapper() as mapper:
            return mapper.insert(student)

    def get_student_by_name(self, name):
        """read out student by name."""
        with StudentMapper() as mapper:
            return mapper.find_by_name(name)

    def get_find_by_matrikel_nr(self, matrikel_nr):
        """read out student by matriculation number"""
        with StudentMapper() as mapper:
            return mapper.find_by_matrikel_nr(matrikel_nr)

    def get_student_by_email(self, email):
        """read out student by E-Mail."""
        with StudentMapper() as mapper:
            return mapper.find_by_email(email)

    def get_student_by_id(self, number):
        """read out student by ID ."""
        with StudentMapper() as mapper:
            return mapper.find_by_id(number)

    def get_all_students(self):
        """read out all students"""
        with StudentMapper() as mapper:
            return mapper.find_all()

    def save_student(self, user):
        """update a student."""
        with StudentMapper() as mapper:
            mapper.update(user)

    def find_by_student_study(self, student_study):
        """read out all students by study field"""
        with StudentMapper() as mapper:
            mapper.find_by_student_study(student_study)

    def delete_student(self, student):
        """delete a student"""
        with StudentMapper() as mapper:
            mapper.delete(student)

    """Projecttype specific methods"""

    def create_projecttype(self, creation_date, projecttype_name, sws, ects):
        """Create a ne Projecttype:"""
        projecttype = Projecttype()
        projecttype.set_id(1)
        projecttype.set_creation_date(creation_date)
        projecttype.set_name(projecttype_name)
        projecttype.set_sws(sws)
        projecttype.set_etcs(ects)

        with ProjecttypeMapper() as mapper:
            return mapper.insert(projecttype)

    def get_projecttype_by_id(self, projecttype_id):
        """Read out the projecttype by ID."""
        with ProjecttypeMapper() as mapper:
            return mapper.find_by_id(projecttype_id)

    def get_projecttype_by_name(self, projecttype_name):
        """Read out the projecttype by name."""
        with ProjecttypeMapper() as mapper:
            return mapper.find_by_name(projecttype_name)

    def get_all_projecttypes(self):
        """Read out all projecttypes"""
        with ProjecttypeMapper() as mapper:
            return mapper.find_all()

    def delete_projecttype(self, projecttype):
        """delete a projecttype"""
        with ProjecttypeMapper() as mapper:
            mapper.delete(projecttype)

    def save_projecttype(self, projecttype):
        """update a projecttype."""
        with ProjecttypeMapper() as mapper:
            mapper.update(projecttype)



    """Semester specific methods"""

    def create_semester(self, creation_date, semester_name, wintersemester, submit_projects_end_date, grading_end_date):
        """Create a ne Semester:"""
        semester = Semester()
        semester.set_id(1)
        semester.set_creation_date(creation_date)
        semester.set_name(semester_name)
        semester.set_wintersemester(wintersemester)
        semester.set_grading_end_date(grading_end_date)
        semester.set_submit_projects_end_date(submit_projects_end_date)

        with SemesterMapper() as mapper:
            return mapper.insert(semester)

    def get_semester_by_id(self, semester_id):
        """Read out the semester by ID."""
        with SemesterMapper() as mapper:
            return mapper.find_projecttype_by_id(semester_id)

    def get_semester_by_name(self, semester_name):
        with SemesterMapper() as mapper:
            return mapper.find_semester_by_name(semester_name)

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



    """Project specific methods"""
     def create_project(self,project_id, project_name, link, room_desired, grade_average, num_blockdays_in_exam,
                        blockdays_in_exam, special_room, date_blockdays_during_lecture,
                        num_blockdays_prior_lecture, blockdays_prior_lecturetrue,
                        num_blockdays_during_lecutre, blockdays_during_lecture, weekly, short_description,
                        num_spots, project_type, module, project_professor, participation,creation_date):

         """Create a ne Project:"""
         project = Project()
         project.set_project_id(project_id)
         project.set_project_name(project_name)
         project.set_link(link)
         project.set_room_desired(room_desired)
         project.set_grade_average(grade_average)
         project.set_num_blockdays_in_exam(num_blockdays_in_exam)
         project.set_blockdays_in_exam(blockdays_in_exam)
         project.set_special_room(special_room)
         project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
         project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
         project.set_blockdays_prior_lecture(blockdays_prior_lecturetrue)
         project.set_num_blockdays_during_lecture(num_blockdays_during_lecutre)
         project.set_blockdays_during_lecture(blockdays_during_lecture)
         project.set_weekly(weekly)
         project.set_short_description(short_description)
         project.set_num_of_spots(num_spots)
         project.set_project_type(project_type)
         project.set_module(module)
         project.set_project_professor(project_professor)
         project.set_participation(participation)
         project.set_creation_date(creation_date)

         with ProjectMapper() as mapper:
            return mapper.insert(project)

    def get_project_by_name(self,project_name):
         """Read out all projects by name."""
         with ProjectMapper() as mapper:
            return mapper.find_by_project_name(project_name)

    def get_project_by_id(self, project_id):
        """Read out the project by ID."""
        with ProjectMapper() as mapper:
            return mapper.find_project_by_id(project_id)

    def get_project_by_project_type(self, project_type):
        """Read out project by the project type."""
        with ProjectMapper() as mapper:
            return mapper.find_by_project_type(project_type)

    def get_project_by_project_professor(self, project_professor):
        """Read out project by the project professor."""
        with ProjectMapper() as mapper:
            return mapper.find_by_project_professor(project_professor)

    def get_all_projects(self):
        """Read out all projects"""
        with ProjectMapper() as mapper:
            return mapper.find_all()

    def delete_project(self, project):
        """delete a proejct"""
        with ProjectMapper() as mapper:
            mapper.delete(project)

    def save_project(self, project):
        """update a project."""
        with ProjectMapper() as mapper:
            mapper.update(project)
