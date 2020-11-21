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
from server.bo.Projekt import Projekt
from server.bo.Projecttype import Projekctype
from server.bo.Semeser import Semester
from server.bo.Student import Student

#Der Decorator übernimmt die Authentifikation
from SecurityDecorator import secured

#Instanzieren von Flask
app = Flask(__name__)


CORS(app, resources=r'/Electionsystem/*')



"""Modell auf, das die Datenstruktur beschreibt, 
auf deren Basis Clients und Server Daten austauschen. Grundlage hierfür ist das Package flask-restx."""

api = Api(app, version='1.0', title='Electionsystem API',
          description='Ein Wahlsystem für Studenten')



"""Namespaces erlauben uns die Strukturierung von APIs. In diesem Fall fasst dieser Namespace alle
ElectionSystem-relevanten Operationen unter dem Präfix /bank zusammen."""

ElectionSystem = api.namespace('Electionsystem', description='Funktionen des Electionsystems')


"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.
BusinessObject dient als Basisklasse, auf der die weiteren Strukturen User, Student aufsetzen."""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='__id', description='Der Unique Identifier eines Business Object'),
})

nbo = api.model('NamedBusinessObject', {
    'name': fields.Integer(attribute='__name', description='Der Name eines NamedBusiness Object'),
})

user = api.inherit('User', nbo, {
    'user_id': fields.String(attribute='__user_id', description='ID eines User'),
    'email': fields.String(attribute='__email', description='E-Mail-Adresse eines User'),
    'role': fields.String(attribute='__role', description='Role eines User'),
    'password': fields.String(attribute='__password ', description='Password eines User'),
})

student = api.inherit('Student', nbo, {
    'student_id': fields.String(attribute='__student_id', description='Id eines Studenten'),
    'student_name': fields.String(attribute='__student_name', description='Name eines Studenten'),
    'mail': fields.String(attribute='__mail', description='E-Mail-Adresse eines Studenten'),
    'role': fields.String(attribute='__role', description='Google User ID eines User'),
    'password': fields.String(attribute='__password ', description='Password eines Studenten'),
    'MatrikelNR': fields.String(attribute='__MatrikelNR', description='MatrikelNR eines Studenten'),
    'study':fields.String(attribute='__study', description='Studiengang eines Studenten'),
})

#transferierbare Strukturen die noch eingefügt werden müssen
#grading=

#module=

#participation=

#project=

#projecttype=

#semester=

#bewertung=

#teilnahme=

@ElectionSystem.route('/login', methods=['POST','GET'])
@ElectionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
def login():
    error=None
    if request.method=='POST':
        if valid_login(request.form['E-Mail'],
                       request.form['Passwort']):
            return log_the_user_in(request.form['E-Mail'])
        else:
            error='Invalid E-Mail/Passwort'
    #return render_template('',error=error)





