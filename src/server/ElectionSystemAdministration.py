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
    dies auf die Applikationsschicht konzentrieren!

       
    User-spezifische Methoden
    """

    def create_user(self, name, creation_date, email, google_user_id, role):
        """Einen Benutzer anlegen"""
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
        """Alle Benutzer mit Namen name auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_name(name)

    def get_user_by_id(self, number):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_id(number)

    def get_user_by_email(self, email):
        """Alle Benutzer mit gegebener E-Mail-Adresse auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_email(email)

    def get_user_by_google_user_id(self, id):
        """Den Benutzer mit der gegebenen Google ID auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def get_all_users(self):
        """Alle Benutzer auslesen."""
        with UserMapper() as mapper:
            return mapper.find_all()

    def save_user(self, user):
        """Den gegebenen Benutzer speichern."""
        with UserMapper() as mapper:
            mapper.update(user)

    def delete_user(self, user):
        """Den gegebenen Benutzer aus unserem System löschen."""
        with UserMapper() as mapper:
            mapper.delete(user)

    def create_student(self, student_lastname,student_firstname,student_role ,student_mail, matrikel_nr, student_study):
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

    def delete_student(self, student):
        """Den gegebenen Student aus unserem System löschen."""
        with StudentMapper() as mapper:
            mapper.delete(student)

    def get_student_by_name(self, name):
        """Alle Benutzer mit Namen name auslesen."""
        with StudentMapper() as mapper:
            return mapper.find_by_name(name)

    def get_find_by_matrikel_nr(self, matrikel_nr):
        with StudentMapper() as mapper:
            return StudentMapper.find_by_matrikel_nr(matrikel_nr)

    def get_student_by_email(self, email):
        """Alle Benutzer mit gegebener E-Mail-Adresse auslesen."""
        with StudentMapper() as mapper:
            return mapper.find_by_email(email)

    def get_student_by_id(self, number):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with StudentMapper() as mapper:
            return mapper.find_by_id(number)

    def get_student_users(self):
        """Alle Benutzer auslesen."""
        with StudentMapper() as mapper:
            return mapper.find_all()

    def save_student(self, user):
        """Den gegebenen Benutzer speichern."""
        with StudentMapper() as mapper:
            mapper.update(user)


















