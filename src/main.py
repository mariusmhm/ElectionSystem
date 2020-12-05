# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS


"""The application logic including the business object classes is accessed here"""
from server.ElectionSystemAdministration import ElectionSystemAdministration
from server.bo.Grading import Grading
from server.bo.Module import Module
from server.bo.Participation import Participation
from server.bo.Project import Project
from server.bo.Projecttype import Projecttype
from server.bo.Semester import Semester
from server.bo.Student import Student
from server.bo.User import User

#Der Decorator übernimmt die Authentifikation
from SecurityDecorater import secured

#Instanzieren von Flask
app = Flask(__name__)



CORS(app, resources=r'/electionsystem/*')



"""Hier wird eine API angelegt, 
auf deren Basis Clients und Server Daten austauschen. Grundlage hierfür ist das Package flask-restx."""

api = Api(app, version='1.0', title='Electionsystem API',
          description='Ein Wahlsystem für Studenten')



"""Namespaces erlauben uns die Strukturierung von APIs. In diesem Fall fasst dieser Namespace alle
ElectionSystem-relevanten Operationen unter dem Präfix /bank zusammen."""
electionSystem = api.namespace('electionsystem', description='Funktionen des Electionsystems')


"""Nachfolgend werden analog zu unseren BusinessObject-Klassen und NamedBusinessObject-Klassen
 die transferierbare Strukturen angelegt:

BusinessObject dient als Basisklasse, auf der die weiteren Strukturen Teilnahme und Bewertung aufsetzen.
 ab und """

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
    'creation_date': fields.Date(attribute='_creation_date', description='Erstellungszeitpunkt des Business Objekts')
})

"""NamedBusinessObject leitet von Business Object ab"""
nbo = api.model('NamedBusinessObject',bo, {
    'name': fields.Integer(attribute='_name', description='Der Name eines NamedBusiness Object'),
})

"""NamedBusinessObject is
 the super class of user, student, module, project, project type and semester."""
user = api.inherit('User', nbo, {
    'name': fields.String(attribute='_name', description='Name eines Benutzers'),
    'email': fields.String(attribute='_email', description='E-Mail-Adresse eines User'),
    'role': fields.String(attribute='_role', description='Role eines User'),
    'google_user_id': fields.String(attribute='_google_user_id', description='Google id eines Users')
})

student = api.inherit('Student', nbo, {
    'first_name': fields.String(attribute='_first_name', description='First name of student'),
    'last_name': fields.String(attribute='last_name', description='Last nameof student'),
    'matrikel_nr': fields.Integer(attribute='_matrikel_nr', description='Matriculation number of a student'),
    'student_study': fields.String(attribute='_student_study', description='Student field of student'),
    'email':fields.String(attribute='_email', description='E-Mail of a Student'),
})


module=api.inherit('Module',nbo, {
    'edvNR': fields.Integer(attribute='_edvNR', description='EDV Nummer eines Moduls')
})

project = api.inherit('Project', nbo, {
    'num_spots': fields.Integer(attribute='_num_spots', description='Anzahl an freien Plätzen eines Projekts'),
    'short_description': fields.String(attribute='_short_description', description='Kurzbeschreibung eines Projekts'),
    'weekly': fields.Boolean(attribute='_weekly', description='Wöchentliche Vorlesung eines Projekts'),
    'num_blockdays_during_lecture': fields.Integer(attribute='_num_blockdays_during_lecture', description='Anzahl der Blocktage in der Vorlesungszeit'),
    'num_blockdays_prior_lecture': fields.Integer(attribute='_num_blockdays_prior_lecture', description='Anzahl der Blocktage vor Beginn der Vorlesungszeit'),
    'num_blockdays_in_exam': fields.Integer(attribute='_num_blockdays_in_exam', description='Anzahl der Blocktage in der Prüfungsphase'),
    'special_room': fields.Boolean(attribute='_special_room', description='Besonderer Raum notwendig für das Projekt'),
    'grade_average': fields.Float(attribute='_grade_average', description='Notendurchschnitt eines Projekts'),
    'room_desired': fields.String(attribute='_room_desired', description='Raumwünsche für ein Projekt'),

})


projecttype= api.inherit('Projecttype', nbo,{
    'etcs': fields.Integer(attribute='_etcs', description='ects of a projecttype'),
    'sws': fields.Integer(attribute='_sws', description=' SWS of a projecttype')
})

"""Participation and Grading are BusinessObjects"""

participation=api.inherit('Participation',bo,{
    'priority': fields.Integer(attribute='_priority', description='priority of a project')
})

grading= api.inherit('Grading',bo,{
    'grading': fields.Float(attribute='_grading', descritpion='Note eines Studenten'),

})






"""-------------------------Student--------------------"""


@electionSystem.route('/student')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentListOperations(Resource):
    @electionSystem.marshal_list_with(student)
    @secured
    def get(self):
        """Auslesen aller Studente-Objekte.
        Sollten keine Studenten-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ElectionSystemAdministration()
        customers = adm.get_all_students()
        return customers

    @electionSystem.marshal_with(student, code=200)
    @electionSystem.expect(student)  # We expect a Student-Object from the Client Site
    @secured
    def post(self):
        """Anlegen eines neuen Student-Objekts.
        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ElectionSystemAdministration()

        proposal = Student.to_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            c = adm.create_student(proposal.get_first_name(), proposal.get_last_name())
            return c, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


@electionSystem.route('/student/<int:id>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@electionSystem.param('id', 'Die ID von Student')
class StudentOperations(Resource):
    @electionSystem.marshal_with(student)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Student-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        student = adm.get_student_by_id(id)
        return student

    @electionSystem.marshal_with(student)
    @electionSystem.expect(student, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Customer-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ElectionSystemAdministration()
        s = Student.to_dict(api.payload)

        if s is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            s.set_id(id)
            adm.save_student(s)
            return '', 200
        else:
            return '', 500

"""muss noch in ElectionSystemAPI eingefügt werden"""
@electionSystem.route('/student-by-name/<string:lastname>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@electionSystem.param('lastname', 'Der Nachname des Studenten')
class StudentsByLastnameOperations(Resource):
    @electionSystem.marshal_with(student)
    @secured
    def get(self, lastname):
        """ Auslesen von Customer-Objekten, die durch den Nachnamen bestimmt werden.

        Die auszulesenden Objekte werden durch ```lastname``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        student = adm.get_student_by_name(lastname)
        return student

"""muss noch in ElectionSystemAPI eingefügt werden"""
@electionSystem.route('/student-by-matrikel_nr/<int:matrikel_nr>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@electionSystem.param('matrikel_nr', 'Der Nachname des Studenten')
class StudentByMatrikelNrOperations(Resource):
    @electionSystem.marshal_with(student)
    @secured
    def get(self, matrikel_nr):
        """ Auslesen von Customer-Objekten, die durch den Matrikelnr bestimmt werden.

         Die auszulesenden Objekte werden durch ```Matrikelnr``` in dem URI bestimmt.
         """
        adm = ElectionSystemAdministration()
        student = adm.get_find_by_matrikel_nr(matrikel_nr)
        return student

"""muss noch in ElectionSystemAPI eingefügt werden"""
@electionSystem.route('/student-by-email/<string:email>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@electionSystem.param('email', 'Der Nachname des Studenten')
class StudentByEmailOperations(Resource):
    @electionSystem.marshal_with(student)
    @secured
    def get(self, email):
        """ Auslesen von Customer-Objekten, die durch die Email bestimmt werden.

        Die auszulesenden Objekte werden durch ```Email``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        student = adm.get_student_by_email(email)
        return student


"""------------------User----------------------"""


@electionSystem.route('/user')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserListOperations(Resource):
    @electionSystem.marshal_list_with(user)
    @secured
    def get(self):
        """Auslesen aller User-(Dozent)-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ElectionSystemAdministration()
        user = adm.get_all_users()
        return user

    @electionSystem.marshal_with(user, code=200)
    @electionSystem.expect(user)  # Wir erwarten ein Customer-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen User-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ElectionSystemAdministration()

        proposal = User.to_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            c = adm.create_user(proposal.get_name(user))
            return c, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


@electionSystem.route('/user/<int:id>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@electionSystem.param('id', 'Die ID des User-Objekts')
class UserOperations(Resource):
    @electionSystem.marshal_with(user)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten User-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        user = adm.get_user_by_id(id)
        return user

    @secured
    def delete(self, id):
        """Löschen eines bestimmten User-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        cust = adm.get_user_by_id(id)
        adm.delete_user(cust)
        return '', 200

    @electionSystem.marshal_with()
    @electionSystem.expect(user, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten User-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ElectionSystemAdministration()
        u = user.to_dict(api.payload)

        if u is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            u.set_id(id)
            adm.save_user(u)
            return '', 200
        else:
            return '', 500

"""noch in ElectionSystemAPI einfügen """
@electionSystem.route('/user-by-name/<string:lastname>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@electionSystem.param('lastname', 'Der Nachname eines User')
class UserByNameOperation(Resource):
    @electionSystem.marshal_with(user)
    @secured
    def get(self, lastname):
        """ Auslesen von Customer-Objekten, die durch den Nachnamen bestimmt werden.

        Die auszulesenden Objekte werden durch ```lastname``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        user = adm.get_user_by_name(lastname)
        return user

"""--------------Project----------------------"""

@electionSystem.route('/project')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):
    @electionSystem.marshal_list_with(project)
    @secured
    def get(self):
        """Auslesen aller Project-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ElectionSystemAdministration()
        project = adm.get_all_projects()
        return project

    @electionSystem.marshal_with(project, code=200)
    @electionSystem.expect(project)  # Wir erwarten ein Customer-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Project-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ElectionSystemAdministration()

        proposal = project.to_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            c = adm.create_project(proposal.get_name(project))
            return c, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


@electionSystem.route('/project/<int:id>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@electionSystem.param('id', 'Die ID des Account-Objekts')
class ProjectOperations(Resource):
    @electionSystem.marshal_with(project)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Project-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        acc = adm.get_project_by_id(id)
        return acc

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Project-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        project = adm.get_project_by_id(id)
        adm.delete_project(project)
        return '', 200

    @electionSystem.marshal_with(project)
    @secured
    def put(self, id):
        """Update eines bestimmten Project-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ElectionSystemAdministration()
        p = Project.to_dict(api.payload)

        if p is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            p.set_id(id)
            adm.save_project(p)
            return '', 200
        else:
            return '', 500


"""----------------------------Projecttype---------------------------"""


@electionSystem.route('/projecttypes')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectTypeListOperations(Resource):
    @electionSystem.marshal_list_with(projecttype)
    @secured
    def get(self):
        """Auslesen aller Projecttypes-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ElectionSystemAdministration()
        projecttypes = adm.get_all_projecttypes()
        return projecttypes

@electionSystem.route('/projecttype')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
 class ProjectTypeListOperation(Resource):
    @electionSystem.marshal_with(projecttype, code=200)
    @electionSystem.expect(projecttype)  # Wir erwarten ein Customer-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Project-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ElectionSystemAdministration()

        proposal = projecttype.to_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            c = adm.create_projecttype(proposal.get_name(projecttype))
            return c, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


@electionSystem.route('/projecttype/<int:id>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@electionSystem.param('id', 'Die ID des Account-Objekts')
class ProjectTypeOperations(Resource):
    @electionSystem.marshal_with(projecttype)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Project-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        pt = adm.get_projecttype_by_id(id)
        return pt

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Project-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        projecttype = adm.get_projecttype_by_id(id)
        adm.delete_projecttype(projecttype)
        return '', 200

    @electionSystem.marshal_with(projecttype)
    @secured
    def put(self, id):
        """Update eines bestimmten Project-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ElectionSystemAdministration()
        pt = Projecttype.to_dict(api.payload)

        if pt is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            pt.set_id(id)
            adm.save_projecttype(pt)
            return '', 200
        else:
            return '', 500

"""-----------------Semester--------------------"""


@electionSystem.route('/semester')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class SemesterListOperations(Resource):
    @electionSystem.marshal_list_with(semester)
    @secured
    def get(self):
        """Auslesen aller Semester-Objekte.

        Sollten keine Semester-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ElectionSystemAdministration()
        semester = adm.get_all_semester()
        return semester

    @electionSystem.marshal_with(semester, code=200)
    @electionSystem.expect(semester)  # Wir erwarten ein Customer-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Semester-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ElectionSystemAdministration()

        proposal = semester.to_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            c = adm.create_semester(proposal.get_name(semester))
            return c, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500



@electionSystem.route('/semester/<int:id>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@electionSystem.param('id', 'Die ID des Semester-Objekts')
class SemesterOperations(Resource):
    @electionSystem.marshal_with(semester)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Project-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        pt = adm.get_semester_by_id(id)
        return pt

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Project-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        semester = adm.get_semester_by_id(id)
        adm.delete_semester(semester)
        return '', 200

    @electionSystem.marshal_with(semester)
    @secured
    def put(self, id):
        """Update eines bestimmten semester-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ElectionSystemAdministration()
        pt = Semester.to_dict(api.payload)

        if pt is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            pt.set_id(id)
            adm.save_semester(pt)
            return '', 200
        else:
            return '', 500


"grading, participation, module)"""


"""---------------Module-----------------------"""
@electionSystem.route('/modules')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt')
class ModuleListOperations(Resource):
    @electionSystem.marshal_list_with(module)
    def get(self):
        adm=ElectionSystemAdministration()
        modules=adm.get_all_modules() #noch nicht definiert in Admin
        return modules
























