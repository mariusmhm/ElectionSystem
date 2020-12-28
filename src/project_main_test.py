# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS

from project_administration_test import ProjectAdministration
from server.bo.Project import Project
#from server.bo.Module import Module

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
    'short_description': fields.String(attribute='_short_description', description='Kurzbeschreibung eines Projekts'),
    'project_name': fields.String(attribute='_project_name', description='Project Name'),
    'link': fields.String(attribute='_link', description='Project Link'),
    'room_desired': fields.String(attribute='_room_desired', description='Project with desired room'),
    'grade_average': fields.Integer(attribute='_grade_average', description='grade Average'),
    'num_blockdays_in_exam': fields.Integer(attribute='_num_blockdays_in_exam', description='Number of Blockdays in Exam'),
    'blockdays_in_exam': fields.Boolean(attribute='_blockdays_in_exam', description='Blockdays in Exam'),
    'special_room': fields.Boolean(attribute='_special_room', description='Special Room'),
    'date_blockdays_during_lecture': fields.Integer(attribute='_date_blockdays_during_lecture', description='Date of Blockdays during Lecture'),
    'num_blockdays_prior_lecture': fields.Integer(attribute='_num_blockdays_prior_lecture', description='Number of Blockdays prior Lecture'),
    'blockdays_prior_lecture': fields.Boolean(attribute='_blockdays_prior_lecture', description='Blockdays prior Lecture'),
    'num_blockdays_during_lecture': fields.Integer(attribute='_num_blockdays_during_lecture', description='Number of Blockdays during Lecture'),
    'blockdays_during_lecture': fields.Boolean(attribute='_blockdays_during_lecture', description='Blockdays during Lecture'),
    'weekly': fields.Boolean(attribute='_weekly', description='Weekly'),
    'num_spots': fields.Integer(attribute='_num_spots', description='Number of Spots'),
})
"""
module = api.inherit ('Module', bo, {
    'edv_number': fields.Integer(attribute='_edv_number', description='Module number'),
    'name': fields.String(attribute='_name', description='Name of Module'),
})
"""


#--- Module |START| ---
"""
@electionSystem.route('/module')
@electionSystem.response(500, 'if server has a problem')
class ModuleListOperations(Resource):
    @electionSystem.marshal_list_with(module)
    def get(self):
        adm=ProjectAdministration()
        module=adm.get_all_modules()
        return module
"""

#--- Module |END| ---



@electionSystem.route('/projects')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt')
class ProjectListOperations(Resource):
    @electionSystem.marshal_list_with(project)
    def get(self):
        adm=ProjectAdministration()
        projects=adm.get_all_projects()
        return projects
    
    @electionSystem.marshal_with(project, code=200)
    @electionSystem.expect(project)
    def post(self):
        adm = ProjectAdministration()
        proposal = Project.to_dict(api.payload)

        if proposal is not None:
            p = adm.create_project(proposal.get_project_id(), proposal.get_project_name(), proposal.get_short_description(), proposal.get_link(), proposal.get_room_desired(), proposal.get_grade_average(), proposal.get_num_blockdays_in_exam(), proposal.get_blockdays_in_exam(), proposal.get_special_room(), proposal.get_date_blockdays_during_lecture(), proposal.get_num_blockdays_prior_lecture(), proposal.get_blockdays_prior_lecture(), proposal.get_num_blockdays_during_lecture(), proposal.get_blockdays_during_lecture(), proposal.get_weekly(), proposal.get_num_spots())
            return p, 200
        else:
            #server error
            return '', 500


@electionSystem.route('/projects/<int:id>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt')
class ProjectListOperations(Resource):
    @electionSystem.marshal_with(project)
    def get(self, id):
        """Auslesen eines bestimmten Projekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pro = adm.find_project_by_id(id)
        return pro

    def delete(self, id):
        """Löschen eines bestimmten Projekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pro = adm.find_project_by_id(id)
        adm.delete_project(pro)
        return '', 200
    
    @electionSystem.marshal_with(project)
    @electionSystem.expect(project, validate=True)
    def put(self, id):
        """Update eines bestimmten Projekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ProjectAdministration()
        p = Project.to_dict(api.payload)

        if p is not None:
            p.set_project_id(id)
            adm.update_project(p)
            return '', 200
        else:
            return '', 500

@electionSystem.route('/projects/<string:name>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt')
class ProjectListOperations(Resource):
    @electionSystem.marshal_list_with(project)
    def get(self, name):
        adm= ProjectAdministration()
        projects= adm.find_project_by_name(name)
        return projects



if __name__ == '__main__':
    app.run(debug=True)