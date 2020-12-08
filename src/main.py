# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS

# Hier wird auf die Applikationslogik inkl. Business-Ojekt Klassen zugegriffen
"""from server.ElectionSystemAdministration import ElectionSystemAdministration
from server.bo.Grading import Grading
from server.bo.Module import Module
from server.bo.Participation import Participation
from server.bo.Project import Project
from server.bo.Projecttype import Projecttype
from server.bo.Semester import Semester
from server.bo.Student import Student"""

#Der Decorator übernimmt die Authentifikation
#from SecurityDecorater import secured

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

project = api.inherit('Project', nbo, {
    'num_spots': fields.Integer(attribute='_num_spots', description='Anzahl an freien Plätzen eines Projekts'),
    'short_description': fields.String(attribute='_short_description', description='Kurzbeschreibung eines Projekts'),
    'weekly': fields.Bool(attribute='_weekly', description='Wöchentliche Vorlesung eines Projekts'),
    'num_blockdays_during_lecture': fields.Integer(attribute='_num_blockdays_during_lecture', description='Anzahl der Blocktage in der Vorlesungszeit'),
    'num_blockdays_prior_lecture': fields.Integer(attribute='_num_blockdays_prior_lecture', description='Anzahl der Blocktage vor Beginn der Vorlesungszeit'),
    'num_blockdays_in_exam': fields.Integer(attribute='_num_blockdays_in_exam', description='Anzahl der Blocktage in der Prüfungsphase'),
    'special_room': fields.Bool(attribute='_special_room', description='Besonderer Raum notwendig für das Projekt'),
    'grade_average': fields.Float(attribute='_grade_average', description='Notendurchschnitt eines Projekts'),
    'room_desired': fields.String(attribute='_room_desired', description='Raumwünsche für ein Projekt')
})

#participation=

projecttype= api.inherit('Projecttype', nbo,{
    'etcs': fields.Integer(attribute='_etcs', description='Anzahl der ETCS für ein Projettyp'),
    'sws': fields.Integer(attribute='_sws', description='Anzahl der SWS für ein Projekttyp')
})

#semester=

#bewertung=

#teilnahme=



@electionSystem.route('/projecttypes')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt')
class ProjekttypeListOperations(Resource):
    @electionSystem.marshal_list_with(projecttype)
    def get(self):
        adm=ElectionSystemAdministration()
        projecttypes=adm.get_all_projecttypes()
        return projecttypes

@electionSystem.route('/modules')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt')
class ModuleListOperations(Resource):
    @electionSystem.marshal_list_with(module)
    def get(self):
        adm=ElectionSystemAdministration()
        modules=adm.get_all_modules()
        return modules







