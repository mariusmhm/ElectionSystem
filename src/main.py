# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS

from server.ElectionSystemAdministration import ElectionSystemAdministration
from server.bo.Participation import Participation
from server.bo.Grading import Grading

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
    'id': fields.Integer(attribute='_id', description='Unique id of a business object'),
    'creation_date': fields.Date(attribute='_creation_date', description='Creation date of business object')
})

"""NamedBusinessObject leitet von Business Object ab"""
nbo = api.model('NamedBusinessObject',bo, {
    'name': fields.Integer(attribute='_name', description='Der Name eines NamedBusiness Object'),
})

grading= api.inherit('Grading', bo, {
    'grade': fields.Float (attribute='_grade', descritpion='Grade for evaluation'),
})

participation= api.inherit('Participation', bo, {
    'priority': fields.Integer(attribute='_priority', description='Priority for the project election'),
    'grading_id': fields.Integer(attribute='_grading_id', description='Grading id'),
    'student_id': fields.Integer(attribute='_student_id', description='Student id'),
    'project_id': fields.Integer(attribute='_project_id', description='Project id')
})

#------Participation---------

@electionSystem.route('/participation')
@electionSystem.response(500, 'server error')
class ParticipationsListOperations(Resource):
    @electionSystem.marshal_with(participation, code=200)
    @electionSystem.expect(participation)
    def post(self):
        adm = ElectionSystemAdministration()

        proposal = Participation.from_dict(api.payload)

        if proposal is not None:
            p = adm.create_participation(proposal.get_priority(), proposal.get_grading_id(), proposal.get_student_id(), proposal.get_project_id())
            return p, 200
        else:
            #server error
            return '', 500


@electionSystem.route('/participation/<int:id>')
@electionSystem.response(500, 'server error')
class ParticipationsListOperations(Resource):
    @electionSystem.marshal_with(participation)
    def get(self, id):
        adm = ElectionSystemAdministration()
        pp = adm.get_by_participation_id(id)
        return pp
    
    @electionSystem.marshal_with(participation)
    @electionSystem.expect(participation, validate=True)
    def put(self, id):
        adm = ElectionSystemAdministration()
        pp = Participation.from_dict(api.payload)

        if pp is not None:
            pp.set_id(id)
            adm.save_participation(pp)
            return '', 200
        else: 
            return '', 500

    def delete(self, id):
        adm = ElectionSystemAdministration()
        pp = adm.get_by_participation_id(id)
        adm.delete_participation(pp)
        return '', 200

@electionSystem.route('/participation-by-project/<int:project_id>')
@electionSystem.response(500, 'server error')
class ParticipationsListOperations(Resource):
    @electionSystem.marshal_with(participation)
    def get(self, project_id):
        adm = ElectionSystemAdministration()
        pp = adm.get_all_by_project_id(project_id)
        return pp

@electionSystem.route('/participation-by-student/<int:student_id>')
@electionSystem.response(500, 'server error')
class ParticipationsListOperations(Resource):
    @electionSystem.marshal_with(participation)
    def get(self, student_id):
        adm = ElectionSystemAdministration()
        pp = adm.get_all_by_student_id(student_id)
        return pp

@electionSystem.route('/participation-by-grading/<int:grading_id>')
@electionSystem.response(500, 'server error')
class ParticipationsListOperations(Resource):
    @electionSystem.marshal_with(participation)
    def get(self, grading_id):
        adm = ElectionSystemAdministration()
        pp = adm.get_all_by_grading_id(grading_id)
        return pp

#------Grading---------

@electionSystem.route('/grading')
@electionSystem.response(500, 'server error')
class GradingListOperations(Resource):
    @electionSystem.marshal_list_with(grading)
    def get(self):
        adm = ElectionSystemAdministration()
        grades = adm.get_all_grades()
        return grades

    @electionSystem.marshal_with(grading, code=200)
    @electionSystem.expect(grading)
    def post(self):
        adm = ElectionSystemAdministration()

        proposal = Grading.from_dict(api.payload)

        if proposal is not None:
            p = adm.create_grading(proposal.get_grade())
            return p, 200
        else:
            #server error
            return '', 500

@electionSystem.route('/grading/<int:id>')
@electionSystem.response(500, 'server error')
class GradingListOperations(Resource):
    @electionSystem.marshal_with(grading)
    def get(self, id):
        adm = ElectionSystemAdministration()
        g = adm.get_by_grading_id(id)
        return g

    @electionSystem.marshal_with(grading)
    @electionSystem.expect(grading, validate=True)
    def put(self, id):
        adm = ElectionSystemAdministration()
        g = Grading.from_dict(api.payload)

        if g is not None:
            g.set_id(id)
            adm.save_grading(g)
            return '', 200
        else: 
            return '', 500

    def delete(self, id):
        adm = ElectionSystemAdministration()
        g = adm.get_by_grading_id(id)
        adm.delete_grading(g)
        return '', 200

if __name__ == '__main__':
    app.run(debug=True)





