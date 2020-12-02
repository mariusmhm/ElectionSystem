# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS

# Hier wird auf die Applikationslogik inkl. Business-Ojekt Klassen zugegriffen
from server.ElectionSystemAdministration import ElectionSystemAdministration
from server.bo.Grading import Grading
from server.bo.Module import Module
from server.bo.Praticipation import Participation
from server.bo.Project import Project
from server.bo.Projecttype import Projectype
from server.bo.Semester import Semester
from server.bo.Student import Student

#Der Decorator übernimmt die Authentifikation
from SecurityDecorator import secured

#Instanzieren von Flask
app = Flask(__name__)



CORS(app, resources=r'/Electionsystem/*')



"""Hier wird eine API angelegt, 
auf deren Basis Clients und Server Daten austauschen. Grundlage hierfür ist das Package flask-restx."""

api = Api(app, version='1.0', title='Electionsystem API',
          description='Ein Wahlsystem für Studenten')



"""Namespaces erlauben uns die Strukturierung von APIs. In diesem Fall fasst dieser Namespace alle
ElectionSystem-relevanten Operationen unter dem Präfix /bank zusammen."""

ElectionSystem = api.namespace('Electionsystem', description='function of Electionsystems')


"""Nachfolgend werden analog zu unseren BusinessObject-Klassen und NamedBusinessObject-Klassen
 die transferierbare Strukturen angelegt:

BusinessObject dient als Basisklasse, auf der die weiteren Strukturen Teilnahme und Bewertung aufsetzen.
 ab und """

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
})

"""NamedBusinessObject leitet von Business Object ab"""
nbo = api.model('NamedBusinessObject',bo, {
    'name': fields.Integer(attribute='_name', description='Der Name eines NamedBusiness Object'),
})

"""NamedBusinessObject setzt weiter Strukturen auf, wie User, Student, Grading, Module,
Participation, Project, Projecttype und Semester."""

user = api.inherit('User', nbo, {
    'google_user_id': fields.String(attribute='_user_id', description='ID eines User'),
    'name': fields.String(attribute='_name', description='Name eines Users'),
    'email': fields.String(attribute='_email', description='E-Mail-Adresse eines User'),
    'role': fields.String(attribute='_role', description='Role eines User'),
})

student = api.inherit('Student', nbo, {
    'student_lastname': fields.String(attribute='_student_lastname', description='lastname from student'),
    'student_firstname': fields.String(attribute='_student_lastname', description='firstname student'),
    'mail': fields.String(attribute='_mail', description='E-Mail adress from student'),
    'role': fields.String(attribute='_role', description='role'),
    'matrikel_nr': fields.String(attribute='_matrikel_nr', description='Matrikel number from student'),
    'study':fields.String(attribute='_study', description='study from student'),
})

#transferierbare Strukturen die noch eingefügt werden müssen

grading= api.inherit('Grading',nbo,{
    'grading': fields.String(attribute='_grading', descritpion='Grade from student'),
})

module=api.inherit('Module',nbo, {
    'module': fields.String(attribute='_module', description='Modul from studenten')
})

#participation=

#project=

#projecttype=

#semester=

#bewertung=

#teilnahme=






