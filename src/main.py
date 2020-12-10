# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS

# Hier wird auf die Applikationslogik inkl. Business-Ojekt Klassen zugegriffen
"""from server.bo.Grading import Grading
from server.bo.Module import Module
from server.bo.Participation import Participation
from server.bo.Project import Project
from server.bo.Projecttype import Projecttype"""
from server.bo.Semester import Semester
from server.ElectionSystemAdministration import ElectionSystemAdministration
"""from SecurityDecorater import secured"""

#Instanzieren von Flask
app = Flask(__name__)



CORS(app, resources=r'/electionsystem/*')



"""Hier wird eine API angelegt, 
auf deren Basis Clients und Server Daten austauschen. Grundlage hierfür ist das Package flask-restx."""

api = Api(app, version='1.0', title='Electionsystem API',
          description='Ein Wahlsystem für Studenten')



"""Namespaces erlauben uns die Strukturierung von APIs. In diesem Fall fasst dieser Namespace alle
ElectionSystem-relevanten Operationen unter dem Präfix /bank zusammen."""
electionSystem = api.namespace('electionSystem', description='Funktionen des Electionsystems')


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
    'name': fields.String(attribute='_name', description='Der Name eines NamedBusiness Object'),
})

"""NamedBusinessObject setzt weiter Strukturen auf, wie User, Student, Grading, Module,
Participation, Project, Projecttype und Semester."""


semester= api.inherit('Semester', nbo, {
    'winter_semester':fields.String(attribute='_winter_semester', description='Winter Semester is true or false'),
    'submit_projects_end_date':fields.Date(attribute='_submit_projects_end_date', description='End datum'),
    'semester_id':fields.Integer(attribute='_id', description='ID of a Semester'),
    'grading_end_date':fields.Date(attribute='_grading_end_date', description='End date of grading'),
})


@electionSystem.route('/semester')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class SemesterListOperations(Resource):
    @electionSystem.marshal_list_with(semester)
    def get(self):
        """Auslesen aller Customer-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ElectionSystemAdministration()
        semester = adm.get_all_semester()
        return semester

    @electionSystem.marshal_with(semester, code=200)
    @electionSystem.expect(semester)  # Wir erwarten ein Customer-Objekt von Client-Seite.
    def post(self):
        """Anlegen eines neuen Customer-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ElectionSystemAdministration()

        proposal = Semester.to_dict(api.payload)

        if proposal is not None:
            s = adm.create_semester(proposal.get_wintersemester(),
                                    proposal.get_submit_projects_end_date(),
                                    proposal.get_grading_end_date())
            return s, 200

        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


@electionSystem.route('/semester/<int:id>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@electionSystem.param('id', 'Die ID des Semester-Objekts')
class SemesterOperations(Resource):
    @electionSystem.marshal_with(semester)
    def get(self, id):
        """Auslesen eines bestimmten Semester-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        pt = adm.get_semester_by_id(id)
        return pt

    def delete(self, id):
        """Löschen eines bestimmten Semester-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ElectionSystemAdministration()
        semester = adm.get_semester_by_id(id)
        adm.delete_semester(semester)
        return '', 200

    @electionSystem.marshal_with(semester)
    def put(self, id):
        """Update eines bestimmten semester-Objekts.
        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ElectionSystemAdministration()
        pt = Semester.to_dict(api.payload)

        if pt is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            pt.set_id(id)
            adm.save_semester(pt)
            return '', 200
        else:
            return '', 500



if __name__ == '__main__':
    app.run(debug=True)