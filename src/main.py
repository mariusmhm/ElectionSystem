# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS
# Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt
from SecurityDecorater import secured

# Hier wird auf die Applikationslogik inkl. Business-Ojekt Klassen zugegriffen
from ProjecttypeAdministration import ProjecttypeAdministration
from server.bo.Projecttype import Projecttype

# Instanzieren von Flask

app = Flask(__name__)

CORS(app, resources=r'/electionsystem/*')

"""Hier wird eine API angelegt, 
auf deren Basis Clients und Server Daten austauschen. Grundlage hierfür ist das Package flask-restx."""

api = Api(app, version='1.0', title='Electionsystem API',
          description='A System for Students to elect Projects')

"""Namespaces erlauben uns die Strukturierung von APIs. In diesem Fall fasst dieser Namespace alle
ElectionSystem-relevanten Operationen unter dem Präfix /bank zusammen."""
electionSystem = api.namespace('electionsystem', description='Funktionen des Electionsystems')

"""In the following, analogous to our BusinessObject classes and NamedBusinessObject classes
 the transferable structures are created:
BusinessObject serves as the base class on which the further structures Participation and Valuation are based.
 from and """

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='the unique Identifier of a Business Object'),
    'creation_date': fields.Date(attribute='_creation_date', description='Erstellungszeitpunkt des Business Objekts')
})

nbo = api.model('NamedBusinessObject', {
    'name': fields.String(attribute='_name', description='name of a named business object')
})

projecttype = api.inherit('Projecttype', bo, nbo, {
    'ect': fields.Integer(attribute='_ect', description='Anzahl der ECTS für ein Projettyp'),
    'sws': fields.Integer(attribute='_sws', description='Anzahl der SWS für ein Projekttyp')
})


# ----------------------------Projecttype specific operations---------------------------

@electionSystem.route('/projecttype')
@electionSystem.response(500, 'when the server has an error')
class ProjecttypeListOperations(Resource):
    @electionSystem.marshal_list_with(projecttype)
    def get(self):
        """Readout of all Projecttype-Objects that exist in database.
        If there are no Projecttype-Objects, you will get an empty sequenz."""
        adm = ProjecttypeAdministration()
        all_pt = adm.get_all_projecttypes()
        return all_pt

    @electionSystem.marshal_with(projecttype, code=200)
    @electionSystem.expect(projecttype)
    def post(self):
        """Sets a new Projecttype-Object.
        **ATTENTION:** We take the data sent by the client as a suggestion.
        For example, the assignment of the ID is not the task of the client.
        Even if the client should assign an ID in the proposal, it is
        it is up to the ElectionSystemAdministration (business logic) to create a correct ID
        to assign. *The corrected object is finally returned.
        """
        adm = ProjecttypeAdministration()
        prpl = Projecttype.to_dict(api.payload)

        if prpl is not None:
            p = adm.create_projecttype(prpl.get_name(), prpl.get_ect(), prpl.get_sws())

            return p, 200
        else:
            return '', 500


@electionSystem.route('/projecttype/<int:id>')
@electionSystem.response(500, 'when the server has problems')
class ProjecttypeOperations(Resource):
    @electionSystem.marshal_with(projecttype)
    def get(self, id):
        """Reads out the a specific Projecttype-Object by id.
        The realization of reading out the object is by ```id``` in dem URI.
        """
        adm = ProjecttypeAdministration()
        single_pt = adm.get_projecttype_by_id(id)
        return single_pt

    def delete(self,id):
        """Delete a specific customer object.

        The object to be deleted is determined by the ``id`` in the URI.
        """
        adm = ProjecttypeAdministration()
        single_pt = adm.get_projecttype_by_id(id)
        adm.delete_projecttype(single_pt)
        return '', 200

    @electionSystem.marshal_with(projecttype)
    @electionSystem.expect(projecttype, validate=True)
    def put(self, id):
        """Update a specific Projecttype object.

        **CAUTION:** Relevant id is the id provided by URI and thus used as method parameter.
        method parameter. This parameter overrides the id attribute of the Projecttype object passed in the request payload.
        Projecttype object.
        """

        adm = ProjecttypeAdministration()
        p = Projecttype.to_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.update_projecttype(p)
            return '', 200
        else:
            return '', 500

@electionSystem.route('/projecttype/<string:name>')
@electionSystem.response(500, 'when the server has problems')
class ProjecttypeNameOperations(Resource):
    @electionSystem.marshal_with(projecttype)
    def get(self, name):
        adm = ProjecttypeAdministration()
        all_pt = adm.get_projecttype_by_name(name)
        return all_pt

    if __name__ == '__main__':
        app.run(debug=True)
