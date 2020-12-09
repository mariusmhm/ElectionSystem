# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS
#SecurityDecorater


#Hier wird auf die Applikationslogik inkl. Business-Ojekt Klassen zugegriffen
from server.ProjecttypeAdministration import ProjecttypeAdministration
from server.bo.Projecttype import Projecttype


#Der Decorator übernimmt die Authentifikation
#from SecurityDecorater import secured

#Instanzieren von Flask
from src.SecurityDecorater import secured

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

"""NamedBusinessObject setzt weiter Strukturen auf, wie User, Student, Grading, Module,
Participation, Project, Projecttype und Semester."""

user = api.inherit('User', nbo, {
    'email': fields.String(attribute='_email', description='E-Mail-Adresse eines User'),
    'role': fields.String(attribute='_role', description='Role eines User'),
    'password': fields.String(attribute='_password ', description='Password eines User'),
})

student = api.inherit('Student', nbo, {
    'matrikelNR': fields.Integer(attribute='_matrikelNR', description='MatrikelNR eines Studenten'),
    'study':fields.String(attribute='_study', description='Studiengang eines Studenten'),
})

#transferierbare Strukturen die noch eingefügt werden müssen

grading= api.inherit('Grading',nbo,{
    'grading': fields.String (attribute='_grading', descritpion='Note eines Studenten'),
})

module=api.inherit('Module',nbo, {
    'edvNR': fields.Integer(attribute='_edvNR', description='EDV Nummer eines Moduls')
})

"""project = api.inherit('Project', nbo, {
    'num_spots': fields.Integer(attribute='_num_spots', description='Anzahl an freien Plätzen eines Projekts'),
    'short_description': fields.String(attribute='_short_description', description='Kurzbeschreibung eines Projekts'),
    'weekly': fields.Bool(attribute='_weekly', description='Wöchentliche Vorlesung eines Projekts'),
    'num_blockdays_during_lecture': fields.Integer(attribute='_num_blockdays_during_lecture', description='Anzahl der Blocktage in der Vorlesungszeit'),
    'num_blockdays_prior_lecture': fields.Integer(attribute='_num_blockdays_prior_lecture', description='Anzahl der Blocktage vor Beginn der Vorlesungszeit'),
    'num_blockdays_in_exam': fields.Integer(attribute='_num_blockdays_in_exam', description='Anzahl der Blocktage in der Prüfungsphase'),
    'special_room': fields.Bool(attribute='_special_room', description='Besonderer Raum notwendig für das Projekt'),
    'grade_average': fields.Float(attribute='_grade_average', description='Notendurchschnitt eines Projekts'),
    'room_desired': fields.String(attribute='_room_desired', description='Raumwünsche für ein Projekt')
})"""



projecttype= api.inherit('Projecttype', nbo,{
    'etcs': fields.Integer(attribute='_etcs', description='Anzahl der ETCS für ein Projettyp'),
    'sws': fields.Integer(attribute='_sws', description='Anzahl der SWS für ein Projekttyp')
})

#semester=

#bewertung=

#teilnahme=



"""----------------------------Projecttype---------------------------"""


@electionSystem.route('/projecttypes')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectTypeListOperations(Resource):
    @electionSystem.marshal_list_with(projecttype)
    @secured
    def get(self):
        """Auslesen aller Projecttypes-Objekte.
        Sollten keine Projecttype-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjecttypeAdministration()
        projecttype = adm.get_all_projecttypes()
        return projecttype

@electionSystem.route('/projecttype')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectTypeListOperation(Resource):
    @electionSystem.marshal_with(projecttype, code=200)
    @electionSystem.expect(projecttype)  # Wir erwarten ein Projecttype-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Project-Objekts.
        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ElectionSystemAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjecttypeAdministration()

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
        """Auslesen eines bestimmten Projecttype-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjecttypeAdministration()
        pt = adm.get_projecttype_by_id(id)
        return pt

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Project-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjecttypeAdministration()
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
        adm = ProjecttypeAdministration()
        pt = projecttype.to_dict(api.payload)

        if pt is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            pt.set_id(id)
            adm.save_projecttype(pt)
            return '', 200
        else:
            return '', 500
