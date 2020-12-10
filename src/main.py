# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS
#SecurityDecorater


#Hier wird auf die Applikationslogik inkl. Business-Ojekt Klassen zugegriffen
from ProjecttypeAdministration import ProjecttypeAdministration


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
"""nbo = api.model('NamedBusinessObject',bo, {
    'name': fields.Integer(attribute='_name', description='Der Name eines NamedBusiness Object'),
})"""

projecttype= api.inherit('Projecttype', bo,{
    'ects': fields.Integer(attribute='_etcs', description='Anzahl der ETCS für ein Projettyp'),
    'sws': fields.Integer(attribute='_sws', description='Anzahl der SWS für ein Projekttyp')
})


"""----------------------------Projecttype specific operations---------------------------"""

@electionSystem.route('/projecttype')
@electionSystem.response(500, 'when server has problems')
class ProjecttypeOperations(Resource):
    @electionSystem.marshal_list_with(projecttype)
    def get(self):
        """Readout of all Projecttype-Objects that exist in database.
        If there are no Projecttype-Objects, you will get an empty sequenz."""
        adm = ProjecttypeAdministration()
        projecttype = adm.get_all_projecttypes()
        return projecttype

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

        adm =ProjecttypeAdministration()
        prpl = projecttype.to_dict(api.payload)

        if prpl is not None:
            s = adm.create_projecttype( prpl.get_ects(), prpl.get_sws(), prpl.get_id(), prpl.get_creation_date())

            return s, 200
        else:
            return '', 500

@electionSystem.route('/projecttype/<int:id>')
@electionSystem.response(500, 'when server has problems')
class ProjecttypeOperations(Resource):
    @electionSystem.marshal_with(projecttype)
    def get(self, id):

        """Reads out the a specific Projecttype-Object by id.
        The realization of reading out the object is by ```id``` in dem URI.
        """
        adm = ProjecttypeAdministration()
        single_projecttype = adm.get_projecttype_by_id(id)
        return single_projecttype

    @electionSystem.marshal_with(projecttype)
    @electionSystem.expect(projecttype, validate=True)
    def put(self, id):
        adm = ProjecttypeAdministration()
        s = projecttype.to_dict(api.payload)

        if s is not None:
            s.set_id(id)
            adm.update_projecttype(s)
            return '', 200
        else:
            return '', 500


@electionSystem.route('/student/<int:id>')
@electionSystem.response(500, 'when server has problems')
class ProjecttypeOperations(Resource):
    @electionSystem.marshal_with(projecttype)
    def get(self, id):
        adm = ProjecttypeAdministration()
        single_projecttype = adm.get_projecttype_by_id(id)
        return single_projecttype

    @electionSystem.marshal_with(projecttype)
    @electionSystem.expect(projecttype, validate=True)
    def put(self, id):
        """Creats a new Projecttype-Object."""
        adm = ProjecttypeAdministration()
        p = projecttype.to_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.update_projecttype(p)
            return '', 200
        else:
            return '', 500

    def delete(self, id):
        """Delets a single and specific Projecttype-Objects by Id. """
        adm = ProjecttypeAdministration()
        single_projecttype = adm.get_projecttype_by_id(id)
        adm.delete_projecttype(single_projecttype[0])
        return '', 200


    if __name__ == '__main__':
        app.run(debug=True)


    """@electionSystem.route('/projecttype/<string:name>')
    @electionSystem.response(500, 'when server has problems')
    class ProjecttypeOperations(Resource):
    @electionSystem.marshal_with(projecttype)
    def get(self, name):
       #Reads out a specific projecttype-Object by the name. The specific projecttype object will be genarated through th attribute ```name``` in the URI.
        
        adm = ProjecttypeAdministration()
        projecttype = adm.get_projecttype_by_name(name)
        return projecttype"""

