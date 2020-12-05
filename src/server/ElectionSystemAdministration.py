from server.bo.Grading import Grading
from server.bo.Module import Module
from server.bo.Praticipation import Participation
from server.bo.Project import Project
from server.bo.Projecttype import Projekctype
from server.bo.Semeser import Semester
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

    def get_student_users(self):
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

    """Project specific methods"""
     def create_project(self,project_id, project_name, link, room_desired, grade_average, num_blockdays_in_Exam, blockdays_in_exam, special_room, date_blockdays_during_lecture,
                        num_blockdays_prior_lecture, blockdays_prior_lecturetrue, num_blockdays_during_lecutre, blockdays_during_lecture, weekly, short_description,
                        num_spots, project_type, module, project_professor, participation):

         """Create a ne Project:"""
         project = Project()
         project.set_project_id(1)
         project.set_project_name(project_name)
         project.set_link(link)
         project.set_room_desired(room_desired)
         project.set_grade_average(grade_average)
         project.set_num_blockdays_in_exam(num_blockdays_in_Exam)
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

         with ProjectMapper() as mapper:
            return mapper.insert(project)

     def get_project_by_name(self,project_name):
         """Read out all projects by name."""
         with ProjectMapper() as mapper:
            return mapper.find_by_project_name(project_name)

     def get_project_by_id(self, project_id):
        """Read out the project by ID."""
        with ProjectMapper() as mapper:
            return mapper.find_by_id(project_id)

     def get_project_by_link(self, link):
        """Read out project by link."""
        with ProjectMapper() as mapper:
            return mapper.find_by_link(link)

     def get_project_by_room_desired(self, room_desired):
        """Read out project by room_desired."""
        with ProjectMapper() as mapper:
            return mapper.find_by_room_desired(room_desired)

     def get_project_by_grade_average(self, grade_average):
        """Read out project by grade average."""
        with ProjectMapper() as mapper:
            return mapper.find_by_grade_average(grade_average)

     def get_project_by_num_blockdays_in_Exam(self, num_blockdays_in_Exam):
        """Read out project by number of blockdays in Exam."""
        with ProjectMapper() as mapper:
            return mapper.find_by_num_blockdays_in_Exam(num_blockdays_in_Exam)

     def get_project_by_special_room(self, special_room):
        """Read out project by the special room."""
        with ProjectMapper() as mapper:
            return mapper.find_by_special_room(special_room)

     def get_project_by_date_blockdays_during_lecture(self, date_blockdays_during_lecture):
        """Read out project by the date of blockdays during_lecture."""
        with ProjectMapper() as mapper:
            return mapper.find_by_room_desired(date_blockdays_during_lecture)

     def get_project_by_num_blockdays_prior_lecture(self, num_blockdays_prior_lecture):
        """Read out project by the number of blockdays prior lecture."""
        with ProjectMapper() as mapper:
            return mapper.find_by_num_blockdays_prior_lecture(num_blockdays_prior_lecture)

     def get_project_by_blockdays_prior_lecturetrue(self, blockdays_prior_lecturetrue):
        """Read out project by blockdays prior lecture."""
        with ProjectMapper() as mapper:
            return mapper.find_by_blockdays_prior_lecturetrue(blockdays_prior_lecturetrue)

     def get_project_by_num_blockdays_during_lecutre(self, num_blockdays_during_lecutre):
        """Read out project by the number of blockdays_during_lecutre."""
        with ProjectMapper() as mapper:
            return mapper.find_by_num_blockdays_during_lecutre(num_blockdays_during_lecutre)

     def get_project_by_blockdays_during_lecture(self, blockdays_during_lecture):
        """Read out project by blockdays during lecture."""
        with ProjectMapper() as mapper:
            return mapper.find_by_blockdays_during_lecture(blockdays_during_lecture)

     def get_project_by_weekly(self, weekly):
        """Read out project if they are weekly."""
        with ProjectMapper() as mapper:
            return mapper.find_by_weekly(weekly)

     def get_project_by_short_description(self, short_description):
        """Read out project by the short description."""
        with ProjectMapper() as mapper:
            return mapper.find_by_short_description(short_description)

     def get_project_by_num_of_spots(self, num_spots):
        """Read out project by the number of spots."""
        with ProjectMapper() as mapper:
            return mapper.find_by_num_of_spots(num_spots)

     def get_project_by_project_type(self, project_type):
        """Read out project by the project type."""
        with ProjectMapper() as mapper:
            return mapper.find_by_project_type(project_type)

     def get_project_by_module(self, module):
        """Read out project by the module."""
        with ProjectMapper() as mapper:
            return mapper.find_by_module(module)

     def get_project_by_project_professor(self, project_professor):
        """Read out project by the project professor."""
        with ProjectMapper() as mapper:
            return mapper.find_by_project_professor(project_professor)

     def get_project_by_participation(self, participation):
        """Read out project by participation."""
        with ProjectMapper() as mapper:
            return mapper.find_by_participation(participation)

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

      """Project specific methods"""
     def create_module(self, edv_number):
         """Create a ne Project:"""
         module=Module()
         module.set_edv_number(edv_number)

         with ModuleMapper() as mapper:
            return mapper.insert(module)


