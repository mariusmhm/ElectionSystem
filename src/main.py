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






