# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS

from ProjectAdministration import ProjectAdministration

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
 die transferierbare Strukturen angelegt:"""

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
})

project = api.inherit('Project', bo, {
    'project_id': fields.Integer(attribute='_project_id', description='Project ID'),
    'project_description': fields.String(attribute='_project_description', description='Kurzbeschreibung eines Projekts'),
    'project_name': fields.String(attribute='_project_name', description='Project Name'),
})



@electionSystem.route('/projects')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt')
class ProjectListOperations(Resource):
    @electionSystem.marshal_list_with(project)
    def get(self):
        adm=ProjectAdministration()
        projects=adm.get_all_projects()
        return projects

if __name__ == '__main__':
    app.run(debug=True)