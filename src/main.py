# service is based on flask
from flask import Flask
# using flask restX
from flask_restx import Api, Resource, fields
# cors as a flask expendency
from flask_cors import CORS


#We use our application logic including BusinessObject classes
from server.ElectionSystemAdministration import ElectionSystemAdministration

from server.bo.Grading import Grading
from server.bo.Module import Module
from server.bo.Participation import Participation
from server.bo.Project import Project
from server.bo.Projecttype import Projecttype
from server.bo.Semester import Semester
from server.bo.Student import Student
from server.bo.User import User
from server.State import State
from server.Role import Role

"""Usually you would have a file of this length or a Module this size subdivide into several files or modules.
You could create a separate module for each resource class.Thereby there would be considerable advantages 
in terms of ease of maintenance of this module. But there are also disadvantages! So you have
for example with a number of dependencies, between the API definition and the decorators, to do.
It also deteriorates due to the length the file the clarity of the contents and structures.
Here the decision was made the sources and comprehensibility of the source code assessed higher than
of the degree of coupling and thus the maintainability of the module.


Conversation for this module: 
             HTTP response status codes:
             200 OK           :      with successful requests.
             500 Internal Server Error: if the server detects an error, but does not know how to process it in more detail.

Name of the module:
The name of this module is main.py. This is because Google
App Engine, prefers this name and thereby the deployment
is easier. Of course, other names would also be possible. This 
would require additional configuration work in the app.yaml file."""




"""Instantiate Flask. Flask is 'started', at the end of this file """

app = Flask(__name__)

"""Release all resources with the prefix / bank for ** Cross-Origin Resource Sharing ** (CORS).
This one line requires the installation of the flask-cors package.
If the frontend and backend were deployed on separate domains / computers, that would even be a formulation
such as this required:
CORS (app, resources = {r "/ electionsystem / *": {"origins": "*"}})
However, this would then open the door to abuse, so it would be more advisable not
to allow all "origins" but to name them explicitly. For more information, see the documentation on the flask-cors package."""

CORS(app, resources=r'/electionsystem/*')

"""In the following section we build a model that describes the data structure,
on the basis of which clients and servers exchange data. The basis for this is the flask-restx package."""

api = Api(app, version='1.0', title='Electionsystem API',
            description='A System for Students to elect Projects')

"""Create a namespace Namespaces allow us to structure APIs. In this case, this namespace includes all
Electionsystem-relevant operations under the prefix / electionsystem together."""

electionSystem = api.namespace('electionsystem', description="electionsystems functions")


"""In the following, transferable structures are created analogous to our BusinessObject classes.
BusinessObject serves as the base class on which the other structures NamedBusinsessObject, Grading and Participation are based.
Namedbusiness serves the class on which the other structures User, Students, Semester, Projecttyp, Project and Module are based. """

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Unique id of a business object'),
    'creation_date': fields.String(attribute='_creation_date', description='creation date of a business object')
})

nbo = api.inherit('NamedBusinessObject', bo, {
    'name': fields.String(attribute='_name', description='name of a named business object')
})

state = api.model('State', {
    'id': fields.Integer(attribute='_id', description='unique id of the state'),
    'name': fields.String(attribute='_name', description='name of the state')
})

role = api.model('Role', {
    'id': fields.Integer(attribute='_id', description='unique id of the role'),
    'name': fields.String(attribute='_name', description='name of the role')
})


user = api.inherit('User', nbo, {
    'google_user_id': fields.String(attribute='_google_user_id', description='Users Google id from firebase'),
    'firstname': fields.String(attribute='_firstname', description='Users First Name'),
    'mail': fields.String(attribute='_mail', description='Users Mail'),
    'role_id': fields.Integer(attribute='_role_id', description='Foreign key role')
})

student = api.inherit('Student', user, {
    'matrikel_nr': fields.Integer(attribute='_matrikel_nr', description='Students Matrikel Number'),
    'study': fields.String(attribute='_study', description='Students Study')
})

semester = api.inherit('Semester', nbo, {
    'submit_projects':fields.Boolean(attribute='_submit_projects', description='Activate and deaktivate submit projects'),
    'grading':fields.Boolean(attribute='_grading', description='Activate and deactivate grading'),
    'election':fields.Boolean(attribute='_election', description='Activate and deactivate election')
})

grading = api.inherit('Grading', bo, {
    'grade': fields.Float (attribute='_grade', descritpion='Grade for evaluation'),
})

participation = api.inherit('Participation', bo, {
    'priority': fields.Integer(attribute='_priority', description='Priority for the project election'),
    'grading_id': fields.Integer(attribute='_grading_id', description='Grading id'),
    'student_id': fields.Integer(attribute='_student_id', description='Student id'),
    'project_id': fields.Integer(attribute='_project_id', description='Project id')
})

projecttype = api.inherit('Projecttype', nbo, {
    'ect': fields.Integer(attribute='_ect', description='Anzahl der ECTS für ein Projettyp'),
    'sws': fields.Integer(attribute='_sws', description='Anzahl der SWS für ein Projekttyp')
})

project = api.inherit('Project', nbo, {
    'short_description': fields.String(attribute='_short_description', description='A short description of the Project'),
    'special_room': fields.Boolean(attribute='_special_room', description='If there is a special room needed'),
    'room_desired': fields.String(attribute='_room_desired', description='The room desired for lecture'),
    'num_blockdays_prior_lecture': fields.Integer(attribute='_num_blockdays_prior_lecture', description='The number of the blockdays prior lecture'),
    'date_blockdays_during_lecture': fields.String(attribute='_date_blockdays_during_lecture', description='The dates of the blockdays during lecture'),
    'num_blockdays_during_lecture': fields.Integer(attribute='_num_blockdays_during_lecture', description='The number of blockdays needed during lecture'),
    'num_blockdays_in_exam': fields.Integer(attribute='_num_blockdays_in_exam', description='The number of blockdays needed during exams'),
    'weekly': fields.Boolean(attribute='_weekly', description='if weekly lectures are needed'),
    'num_spots': fields.Integer(attribute='_num_spots', description='If weekly lectures are needed'),
    'language': fields.String(attribute='_language', description='The language the project will be given'),
    'external_partner' : fields.String(attribute='_external_partner', description='External partner'),
    'edv_number': fields.Integer(attribute='_edv_number', description='edv number of project'),
    'projecttype_id': fields.Integer(attribute='_projecttype_id', description='The projecttype of the project'),
    'module_id': fields.Integer(attribute='_module_id', description='The module of the project'),
    'professor_id': fields.Integer(attribute='_professor_id', description='The professor giving the project'),
    'add_professor_id': fields.Integer(attribute='_add_professor_id', description='If there is a additional professor is needed'),
    'current_state_id': fields.Integer(attribute='_current_state_id', description='Current State id of project')
})

module = api.inherit('Module', nbo, {
    'edv_number': fields.String(attribute='_edv_number', description='Edv number for a module'),
})


#------Student relevant operations ---------


@electionSystem.route('/student')
@electionSystem.response(500, 'when server has problems')
class StudentListOperations(Resource):
    """Reading out all student objects.
    If no student objects are available, an empty sequence is returned."""
    @electionSystem.marshal_list_with(student)
    def get(self):
        adm = ElectionSystemAdministration()
        students = adm.get_all_students()
        return students

    @electionSystem.marshal_with(student, code=200)
    @electionSystem.expect(student)  # We expect a student object from the client side.
    def post(self):
        """Create a new student object. We take the data sent by the client as a suggestion.
        For example, assigning the ID is not the responsibility of the client.
        Even if the client should assign an ID in the proposal, so
        it is up to the electionsystem administration (business logic) to have a correct ID
        to forgive. * The corrected object will eventually be returned. *"""
        adm = ElectionSystemAdministration()
        prpl = Student.to_dict(api.payload)
        """Check the references for valid values before using them."""
        if prpl is not None:
            """We only use the attributes of student of the proposal for generation
            of a student object. The object created by the server is authoritative and
            is also returned to the client."""
            s = adm.create_student(prpl.get_name(), prpl.get_date(), prpl.get_google_user_id(), prpl.get_firstname(), prpl.get_mail(), prpl.get_role_id(), prpl.get_matrikel_nr(), prpl.get_study())

            return s, 200
        else:
            """When it comes down to it, we don't give anything back and throw a server error."""
            return '', 500


@electionSystem.route('/student/<int:id>')
@electionSystem.response(500, 'when server has problems')
class StudentOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, id):
        """reading out a specific student object.
           The object to be read is determined by the '' id '' in the URI."""
        adm = ElectionSystemAdministration()
        single_student = adm.get_student_by_id(id)
        return single_student

    @electionSystem.marshal_with(student)
    @electionSystem.expect(student, validate=True)  # We expect a student object from the client side.
    def put(self, id):
        """ Update of a specific student object.
        The relevant id is the id provided by the URI and thus as a method parameter
        is used. This parameter overwrites the ID attribute of the transmitted in the payload of the request
        student object."""
        adm = ElectionSystemAdministration()
        s = Student.to_dict(api.payload)
        print('main aufruf')

        if s is not None:
            """This sets the id of the student object to be overwritten (see update)."""
            s.set_id(id)
            adm.update_student(s)
            return '', 200
        else:
            """When it comes down to it, we don't give anything back and throw a server error."""
            return '', 500

    def delete(self, id):
        """Deletion of a specific student object.
        The object to be deleted is determined by the '' id '' in the URI."""
        adm = ElectionSystemAdministration()
        single_student = adm.get_student_by_id(id)
        adm.delete_student(single_student)
        return '', 200


@electionSystem.route('/student/<string:name>')
@electionSystem.response(500, 'when server has problems')
class StudentsNameOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, name):
        """Reading out student objects that are determined by the lastname.
        The objects to be read out are determined by '' name '' in the URI."""
        adm = ElectionSystemAdministration()
        students = adm.get_student_by_name(name)
        return students


@electionSystem.route('/student-by-mail/<string:mail>')
@electionSystem.response(500, 'when server has problems')
class StudentMailOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, mail):
        """Reading out student objects that are determined by the E-Mail.
        The objects to be read out are determined by '' mail '' in the URI."""
        adm = ElectionSystemAdministration()
        students = adm.get_student_by_mail(mail)
        return students

@electionSystem.route('/student-by-google-id/<string:id>')
@electionSystem.response(500, 'when server has problems')
class StudentGoogleOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, id):
        """Reading out student objects that are determined by the google id.
        The objects to be read out are determined by '' google_id '' in the URI."""
        adm = ElectionSystemAdministration()
        students = adm.get_student_by_google_id(id)
        return students

@electionSystem.route('/student-by-nr/<int:matrikel_nr>')
@electionSystem.response(500, 'when server has problems')
class StudentMatrikelNrOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, matrikel_nr):
        """Reading out student objects that are determined by the matrikle number
        The objects to be read out are determined by 'matrikel_nr' in the URI."""
        adm = ElectionSystemAdministration()
        students = adm.get_student_by_matrikel_nr(matrikel_nr)
        return students


@electionSystem.route('/student-by-study/<string:study>')
@electionSystem.response(500, 'when server has problems')
class StudentsStudyOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, study):
        """Reading out student objects that are determined by the study field.
          The objects to be read out are determined by 'study' in the URI."""
        adm = ElectionSystemAdministration()
        students = adm.get_student_by_study(study)
        return students


@electionSystem.route('/students-by-participations/<int:project_id>')
@electionSystem.response(500,'when the server has problems')
class StudentParticipationOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, project_id):
        """Reading out student from the participation objects that are determined by the project id.
        The objects to be read out are determined by 'project_id' in the URI."""
        adm = ElectionSystemAdministration()
        students = adm.get_all_students_of_participation(project_id)
        return students


#------User relevant operations---------

@electionSystem.route('/user')
@electionSystem.response(500, 'when server has problems')
class UserListOperations(Resource):
    @electionSystem.marshal_list_with(user)
    def get(self):
        """Reading out all user objects.
        If no user objects are available, an empty sequence is returned."""
        adm = ElectionSystemAdministration()
        users = adm.get_all_users()
        return users

    @electionSystem.marshal_with(user, code=200)
    @electionSystem.expect(user)  # We expect a user object from the client side.
    def post(self):
        """Create a new user object. We take the data sent by the client as a suggestion.
        For example, assigning the ID is not the responsibility of the client.
        Even if the client should assign an ID in the proposal, so
        it is up to the electionsystem administration (business logic) to have a correct ID
        to forgive. * The corrected object will eventually be returned. *"""
        adm = ElectionSystemAdministration()
        prpl = User.to_dict(api.payload)

        if prpl is not None:
            """We only use the attributes of user of the proposal for generation
            of a user object. The object created by the server is authoritative and
            is also returned to the client."""
            u = adm.create_user(prpl.get_name(), prpl.get_date(), prpl.get_google_user_id(), prpl.get_firstname(), prpl.get_mail(), prpl.get_role_id())

            return u, 200
        else:
            """When it comes down to it, we don't give anything back and throw a server error."""
            return '', 500


@electionSystem.route('/user/<int:id>')
@electionSystem.response(500, 'when server has problems')
class UserOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, id):
        """reading out a specific user object.
        The object to be read is determined by the '' id '' in the URI."""
        adm = ElectionSystemAdministration()
        single_user = adm.get_user_by_id(id)
        return single_user

    @electionSystem.marshal_with(user)
    @electionSystem.expect(user, validate=True) # We expect a user object from the client side.
    def put(self, id):
        """Update of a specific user object.
        The relevant id is the id provided by the URI and thus as a method parameter is used. 
        This parameter overwrites the ID attribute of the transmitted in the payload of the request
        user object."""
        adm = ElectionSystemAdministration()
        u = User.to_dict(api.payload)

        if u is not None:
            """This sets the id of the user object to be overwritten (see update)."""
            u.set_id(id)
            adm.update_user(u)
            return '', 200
        else:
            """When it comes down to it, we don't give anything back and throw a server error."""
            return '', 500

    def delete(self, id):
        """Deletion of a specific user object.
        The object to be deleted is determined by the '' id '' in the URI."""
        adm = ElectionSystemAdministration()
        single_user = adm.get_user_by_id(id)
        adm.delete_user(single_user)
        return '', 200


@electionSystem.route('/user/<string:name>')
@electionSystem.response(500, 'when server has problems')
class UserNameOperations(Resource):
    """Reading out user objects that are determined by the lastname.
    The objects to be read out are determined by '' name '' in the URI."""
    @electionSystem.marshal_with(user)
    def get(self, name):
        adm = ElectionSystemAdministration()
        users = adm.get_user_by_name(name)
        return users


@electionSystem.route('/user-by-mail/<string:mail>')
@electionSystem.response(500, 'when server has problems')
class UserMailOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, mail):
        """Reading out user objects that are determined by the E-mail.
        The objects to be read out are determined by '' mail '' in the URI."""
        adm = ElectionSystemAdministration()
        user = adm.get_user_by_mail(mail)
        return user

@electionSystem.route('/user-by-google-id/<string:id>')
@electionSystem.response(500, 'when server has problems')
class UserGoogleOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, id):
        """Reading out user objects that are determined by the google id.
        The objects to be read out are determined by '' id '' in the URI."""
        adm = ElectionSystemAdministration()
        user = adm.get_user_by_google_id(id)
        return user


@electionSystem.route('/user-by-role/<int:role>')
@electionSystem.response(500, 'when server has problems')
class UserRoleOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, role):
        """Reading out user objects that are determined by the role (student, professor or admin).
            The objects to be read out are determined by '' role '' in the URI."""
        adm = ElectionSystemAdministration()
        users = adm.get_user_by_role(role)
        return users


#------Semester relevant operations---------

@electionSystem.route('/semester')
@electionSystem.response(500, 'If there is a server-side error.')
class SemesterListOperations(Resource):
    @electionSystem.marshal_with(semester)
    def get(self):
        """Reading out all semester objects. If no semester objects are available, an empty sequence is returned."""
        adm = ElectionSystemAdministration()
        semester = adm.get_all_semester()
        return semester

    @electionSystem.marshal_with(semester, code=200)
    @electionSystem.expect(semester)  # We expect a semester object from the client side.
    def post(self):
        """Create a new semester object. It is up to the election administration (business logic) to have a correct ID
            to forgive. The corrected object will eventually be returned. """
        adm = ElectionSystemAdministration()

        proposal = Semester.to_dict(api.payload)

        if proposal is not None:
            """We only use the attributes of semester of the proposal for generation
            of a semester object. The object created by the server is authoritative and
            is also returned to the client."""
            s = adm.create_semester(proposal.get_date(), proposal.get_name(), proposal.get_submit_projects(),
             proposal.get_grading(), proposal.get_election())
            return s, 200

        else:
            """If something goes wrong we dont return anything and throw a server error."""
            return '', 500


@electionSystem.route('/semester/<int:id>')
@electionSystem.response(500, 'If there is a server-side error.')
@electionSystem.param('id', 'The id of the Semester.')
class SemesterOperations(Resource):
    @electionSystem.marshal_with(semester)
    def get(self, id):
        """Reading out a specific semester object.
        The object to be read is determined by the '' id '' in the URI."""
        adm = ElectionSystemAdministration()
        pt = adm.get_semester_by_id(id)
        return pt

    def delete(self, id):
        """Deleting a specific semester object.
        The object to be deleted is determined by the '' id '' in the URI."""
        adm = ElectionSystemAdministration()
        semester = adm.get_semester_by_id(id)
        adm.delete_semester(semester)
        return '', 200

    @electionSystem.marshal_with(semester)
    @electionSystem.expect(semester, validate=True) # We expect a user object from the client side
    def put(self, id):
        """ Update of a specific semester object.
        The relevant id is the id provided by the URI and thus as a method parameter
        is used. This parameter overwrites the ID attribute of the transmitted in the payload of the request
        semester object."""
        adm = ElectionSystemAdministration()
        s = Semester.to_dict(api.payload)

        if s is not None:
            """This sets the id of the semester object to be overwritten"""
            s.set_id(id)
            adm.save_semester(s)

            return '', 200
        else:
            return '', 500


#------Participation relevant operations---------

@electionSystem.route('/participation')
@electionSystem.response(500, 'server error')
class ParticipationsListOperations(Resource):
    @electionSystem.marshal_with(participation, code=200)
    @electionSystem.expect(participation) # We expect a participation object from the client side
    def post(self):
        """Create a new participation object. It is up to the election administration (business logic) to have a correct ID
        to forgive. The corrected object will eventually be returned. """
        adm = ElectionSystemAdministration()

        proposal = Participation.from_dict(api.payload)

        if proposal is not None:
            """We only use the attributes of participation of the proposal for generation
            of a participation object. The object created by the server is authoritative and
            is also returned to the client."""
            p = adm.create_participation(proposal.get_date(), proposal.get_priority(), proposal.get_grading_id(), proposal.get_student_id(), proposal.get_project_id())
            return p, 200
        else:
            #server error
            return '', 500


@electionSystem.route('/participation/<int:id>')
@electionSystem.response(500, 'server error')
class ParticipationOperations(Resource):
    @electionSystem.marshal_with(participation)
    def get(self, id):
        """reading out a specific student object.
        The object to be read is determined by the '' id '' in the URI."""           
        adm = ElectionSystemAdministration()
        pp = adm.get_by_participation_id(id)
        return pp
    
    @electionSystem.marshal_with(participation)
    @electionSystem.expect(participation, validate=True) # We expect a participation object from the client side
    def put(self, id):
        """ Update of a specific participation object.
        The relevant id is the id provided by the URI and thus as a method parameter
        is used. This parameter overwrites the ID attribute of the transmitted in the payload of the request
        participation object."""
        adm = ElectionSystemAdministration()
        pp = Participation.from_dict(api.payload)

        if pp is not None:
            """This sets the id of the participation object to be overwritten"""
            pp.set_id(id)
            adm.save_participation(pp)
            return '', 200
        else: 
            return '', 500

    def delete(self, id):
        """Deleting a specific participation object.
        The object to be deleted is determined by the '' id '' in the URI."""
        adm = ElectionSystemAdministration()
        pp = adm.get_by_participation_id(id)
        adm.delete_participation(pp)
        return '', 200

@electionSystem.route('/participation-by-project/<int:project_id>')
@electionSystem.response(500, 'server error')
class ParticipationsProjectListOperations(Resource):
    @electionSystem.marshal_list_with(participation)
    def get(self, project_id):
        """Reading out a specific paricipation by the project object.
        The object to be read is determined by the '' project_id '' in the URI."""
        adm = ElectionSystemAdministration()
        pp = adm.get_all_by_project_id(project_id)
        return pp

@electionSystem.route('/participation-by-student/<int:student_id>')
@electionSystem.response(500, 'server error')
class ParticipationsStudentListOperations(Resource):
    @electionSystem.marshal_list_with(participation)
    def get(self, student_id):
        """Reading out a specific paricipation by the student object.
        The object to be read is determined by the '' student_id '' in the URI."""
        adm = ElectionSystemAdministration()
        pp = adm.get_all_by_student_id(student_id)
        return pp

@electionSystem.route('/participation-by-grading/<int:grading_id>')
@electionSystem.response(500, 'server error')
class ParticipationsGradingListOperations(Resource):
    @electionSystem.marshal_list_with(participation)
    def get(self, grading_id):
        """Reading out a specific paricipation by the grading object.
        The object to be read is determined by the parameter '' grading_id '' in the URI."""
        adm = ElectionSystemAdministration()
        pp = adm.get_all_by_grading_id(grading_id)
        return pp



@electionSystem.route('/participation-by-student-project/<int:student_id><int:project_id>')
@electionSystem.response(500, 'If an server sided error occures')
class ParticipationStudentProjectOperations(Resource):
    @electionSystem.marshal_with(participation)
    def get(self, student_id, project_id):
        """Gets an specific participation object by the student project.
        The object is determined by the query parameters project_id and student_id in the URI."""
        adm = ElectionSystemAdministration()
        parti = adm.get_participation_by_student_and_project(student_id, project_id)
        return parti


#------Grading relevant operations---------

@electionSystem.route('/grading')
@electionSystem.response(500, 'server error')
class GradingListOperations(Resource):
    @electionSystem.marshal_list_with(grading)
    def get(self):
        """reading out all grading objects. If no grading objects are available, an empty sequence is returned."""           
        adm = ElectionSystemAdministration()
        grades = adm.get_all_grades()
        return grades

    @electionSystem.marshal_with(grading, code=200)
    @electionSystem.expect(grading)
    def post(self):
        """Create a new grading object. It is up to the election administration (business logic) to have a correct ID
        to forgive. The corrected object will eventually be returned. """
        adm = ElectionSystemAdministration()

        proposal = Grading.from_dict(api.payload)

        if proposal is not None:
            """We only use the attributes of grading of the proposal for generation
            of a grading object. The object created by the server is authoritative and
            is also returned to the client."""
            g = adm.create_grading(proposal.get_date(), proposal.get_grade())
            return g, 200
        else:
            #server error
            return '', 500

@electionSystem.route('/grading/<int:id>')
@electionSystem.response(500, 'server error')
class GradingOperations(Resource):
    @electionSystem.marshal_with(grading)
    def get(self, id):
        """reading out a specific grading object.
        The object to be read is determined by the '' id '' in the URI."""      
        adm = ElectionSystemAdministration()
        g = adm.get_by_grading_id(id)
        return g

    @electionSystem.marshal_with(grading)
    @electionSystem.expect(grading, validate=True)
    def put(self, id):
        """ Update of a specific gradingn object.
        The relevant id is the id provided by the URI and thus as a method parameter
        is used. This parameter overwrites the ID attribute of the transmitted in the payload of the request
        grading object."""
        adm = ElectionSystemAdministration()
        g = Grading.from_dict(api.payload)

        if g is not None:
            """This sets the id of the grading object to be overwritten""" 
            g.set_id(id)
            adm.save_grading(g)
            return '', 200
        else: 
            return '', 500

    def delete(self, id):
        """Deleting a specific grading object.
        The object to be deleted is determined by the '' id '' in the URI."""
        adm = ElectionSystemAdministration()
        g = adm.get_by_grading_id(id)
        adm.delete_grading(g)
        return '', 200


#------Projecttype relevant operations---------

@electionSystem.route('/projecttype')
@electionSystem.response(500, 'when the server has an error')
class ProjecttypeListOperations(Resource):
    @electionSystem.marshal_list_with(projecttype)
    def get(self):
        """Readout of all Projecttype-Objects that exist in database.
        If there are no Projecttype-Objects, you will get an empty sequenz."""
        adm = ElectionSystemAdministration()
        all_pt = adm.get_all_projecttypes()
        return all_pt

    @electionSystem.marshal_with(projecttype, code=200)
    @electionSystem.expect(projecttype)
    def post(self):
        """Sets a new Projecttype-Object.
        We take the data sent by the client as a suggestion.
        For example, the assignment of the ID is not the task of the client.
        Even if the client should assign an ID in the proposal, it is
        it is up to the ElectionSystemAdministration (business logic) to create a correct ID
        to assign. *The corrected object is finally returned.
        """
        adm = ElectionSystemAdministration()
        prpl = Projecttype.to_dict(api.payload)

        if prpl is not None:
            """We only use the attributes of projecttype of the proposal for generation
            of a object. The object created by the server is authoritative and
            is also returned to the client."""
            p = adm.create_projecttype(prpl.get_name(), prpl.get_date(), prpl.get_ect(), prpl.get_sws())

            return p, 200
        else:
            return '', 500


@electionSystem.route('/projecttype/<int:id>')
@electionSystem.response(500, 'when the server has problems')
class ProjecttypeOperations(Resource):
    @electionSystem.marshal_with(projecttype)
    def get(self, id):
        """Reads out the a specific Projecttype-Object by id.
        The realization of reading out the object is by ''id'' in the URI."""
        adm = ElectionSystemAdministration()
        single_pt = adm.get_projecttype_by_id(id)
        return single_pt

    def delete(self,id):
        """Delete a specific customer object.
        The object to be deleted is determined by the ''id'' in the URI."""
        adm = ElectionSystemAdministration()
        single_pt = adm.get_projecttype_by_id(id)
        adm.delete_projecttype(single_pt)
        return '', 200

    @electionSystem.marshal_with(projecttype)
    @electionSystem.expect(projecttype, validate=True)
    def put(self, id):
        """Update a specific Projecttype object.
        Relevant id is the id provided by URI and thus used as method parameter.
        method parameter. This parameter overrides the id attribute of the Projecttype object passed in the request payload.
        Projecttype object."""

        adm = ElectionSystemAdministration()
        p = Projecttype.to_dict(api.payload)

        if p is not None:
            """This sets the id of the projecttype object to be overwritten"""
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
        """Reading out a specific projecttype object.
        The object to be read is determined by the parameter '' name '' in the URI."""
        adm = ElectionSystemAdministration()
        all_pt = adm.get_projecttype_by_name(name)
        return all_pt


#------Module relevant operations---------

@electionSystem.route('/module')
@electionSystem.response(500, 'If there is a server-side error.')
class ModuleListOperations(Resource):
    @electionSystem.marshal_with(module)
    def get(self):
        """Reading out all module objects. If no module objects are available, an empty sequence is returned."""
        adm = ElectionSystemAdministration()
        module = adm.get_all_modules()
        return module

    @electionSystem.marshal_with(module, code=200)
    @electionSystem.expect(module)  # We expect a module object from the client side.
    def post(self):
        """Create a new module object."""
        """It is up to the election administration (business logic) to have a correct ID
            to forgive. The corrected object will eventually be returned. """
        adm = ElectionSystemAdministration()

        proposal = Module.to_dict(api.payload)
        if proposal is not None:
            """We only use the attributes of moduleof the proposal for generation
            of a object. The object created by the server is authoritative and
            is also returned to the client."""
            m = adm.create_module(proposal.get_date(), proposal.get_edv_number(), proposal.get_name())
            return m, 200

        else:
            """If something goes wrong we dont return anything and throw a server error."""
            return '', 500


@electionSystem.route('/module/<int:id>')
@electionSystem.response(500, 'If there is a server side error.')
class ModuleOperations(Resource):
    @electionSystem.marshal_with(module)
    def get(self, id):
        """Reading out a specific module object.
        The object to be read is determined by the '' id '' in the URI."""
        adm = ElectionSystemAdministration()
        m = adm.get_module_by_id(id)
        return m

    def delete(self, id):
        """Deleting a specific module object.
        The object to be deleted is determined by the '' id '' in the URI."""
        adm = ElectionSystemAdministration()
        module = adm.get_module_by_id(id)
        adm.delete_module(module)
        return '', 200

    @electionSystem.marshal_with(module)
    @electionSystem.expect(module, validate=True)
    def put(self, id):
        """Update of a specific module object"""
        adm = ElectionSystemAdministration()
        m = Module.to_dict(api.payload)

        if m is not None:
            """This sets the id of the module object to be overwritten"""
            m.set_id(id)
            adm.save_module(m)
            return '', 200
        else:
            return '', 500

@electionSystem.route('/module/<string:name>')
@electionSystem.response(500, 'when the server has problems')
class ModuleNameOperations(Resource):
    @electionSystem.marshal_with(module)
    def get(self, name):
        """Reads out the a specific Module-Object by name
                The realization of reading out the object is by ```name`` in the URI."""
        adm = ElectionSystemAdministration()
        module = adm.get_module_by_name(name)
        return module

@electionSystem.route('/module/<string:edv_number>')
@electionSystem.response(500, 'when the server has problems')
class ModuleEdvOperations(Resource):
    @electionSystem.marshal_with(module)
    def get(self, edv_number):
        """Reads out the a specific module-object 
        The realization of reading out the object is by ''edv_number'' in the URI.
        """
        adm = ElectionSystemAdministration()
        edv_module = adm.get_projecttype_by_id(edv_number)
        return edv_module


#------Project relevant operations---------

@electionSystem.route('/project')
@electionSystem.response(500, 'when the server has an error')
class ProjectListOperations(Resource):
    @electionSystem.marshal_list_with(project)
    def get(self):
        """Readout of all project-objects that exist in database.
        If there are no project-objects, you will get an empty sequenz."""
        adm = ElectionSystemAdministration()
        all_p = adm.get_all_projects()
        return all_p
    
    @electionSystem.marshal_with(project, code=200)
    @electionSystem.expect(project)
    def post(self):
        """Creates a new project-Object.
        We take the data sent by the client as a suggestion.
        For example, the assignment of the ID is not the task of the client.
        Even if the client should assign an ID in the proposal, it is
        it is up to the ElectionSystemAdministration (business logic) to create a correct ID
        to assign. *The corrected object is finally returned.
        """
        adm = ElectionSystemAdministration()
        prpl = Project.to_dict(api.payload)

        if prpl is not None:
            """We only use the attributes of project of the proposal for generation
            of a object. The object created by the server is authoritative and
            is also returned to the client."""
            p = adm.create_project(prpl.get_date(), prpl.get_name(), prpl.get_short_description(), prpl.get_special_room(),
                                   prpl.get_room_desired(), prpl.get_num_blockdays_prior_lecture(), prpl.get_date_blockdays_during_lecture(), 
                                   prpl.get_num_blockdays_during_lecture(), prpl.get_num_blockdays_in_exam(), prpl.get_weekly(),
                                   prpl.get_num_spots(), prpl.get_language(), prpl.get_external_partner(), prpl.get_edv_number(), prpl.get_projecttype_id(),
                                   prpl.get_module_id(), prpl.get_professor_id(), prpl.get_add_professor_id(), prpl.get_state())
            return p, 200
        else:
            return '', 500


@electionSystem.route('/project/<int:id>')
@electionSystem.response(500, 'when the server has problems')
class ProjectsOperations(Resource):
    @electionSystem.marshal_with(project)
    def get(self, id):
        """Reads out the a specific Project-Object by id.
        The realization of reading out the object is by ''id'' in dem URI.
        """
        adm = ElectionSystemAdministration()
        single_pj = adm.get_project_by_id(id)
        return single_pj

    def delete(self,id):
        """Delete a specific project object.
        The object to be deleted is determined by the ''id'' in the URI.
        """
        adm = ElectionSystemAdministration()
        single_pj = adm.get_project_by_id(id)
        adm.delete_project(single_pj)
        return '', 200

    @electionSystem.marshal_with(project)
    @electionSystem.expect(project, validate=True)
    def put(self, id):
        """Update a specific project object.
        Relevant id is the id provided by URI and thus used as method parameter.
        method parameter. This parameter overrides the id attribute of the project object passed in the request project object.
        """

        adm = ElectionSystemAdministration()
        p = Project.to_dict(api.payload)

        if p is not None:
            """This sets the id of the project object to be overwritten"""           
            p.set_id(id)
            adm.update_project(p)
            return '', 200
        else:
            return '', 500


@electionSystem.route('/project-by-name/<string:name>')
@electionSystem.response(500, 'when the server has problems')
class ProjectNameOperations(Resource):
    @electionSystem.marshal_with(project)
    def get(self, name):
        """Reads out the a specific project object by name
        The realization of reading out the object is by ''name'' in the URI."""     
        adm = ElectionSystemAdministration()
        p = adm.get_project_by_name(name)
        return p


@electionSystem.route('/project-by-prof/<int:id>')
@electionSystem.response(500, 'when the server has problems')
class ProjectProfOperation(Resource):
    @electionSystem.marshal_with(project)
    def get(self, id):
        """Reads out the a specific project object by professor
        The realization of reading out the object is by ''id'' in the URI."""     
        adm = ElectionSystemAdministration()
        p = adm.get_project_by_professorID(id)
        return p


@electionSystem.route('/project-by-projecttype/<int:id>')
@electionSystem.response(500, 'when the server has problems')
class ProjectPtypeOperation(Resource):
    @electionSystem.marshal_with(project)
    def get(self, id):
        """Reads out the a specific project object by projecttype
        The realization of reading out the object is by ''id'' in the URI.""" 
        adm = ElectionSystemAdministration()
        p = adm.get_project_by_projecttypeID(id)
        return p


@electionSystem.route('/project-by-state/<int:state>')
@electionSystem.response(500, 'when the server has problems')
class ProjectStateOperations(Resource):
    @electionSystem.marshal_with(project)
    def get(self, state):
        """Reads out the a specific project object by state
        The realization of reading out the object is by ''state'' in the URI.""" 
        adm = ElectionSystemAdministration()
        p = adm.get_project_by_state(state)
        return p

@electionSystem.route('/project-by-module/<int:id>')
@electionSystem.response(500, 'when the server has problems')
class ProjectModuleOperations(Resource):
    @electionSystem.marshal_with(project)
    def get(self, id):
        """Reads out the a specific project object by module
        The realization of reading out the object is by ''id'' in the URI.""" 
        adm = ElectionSystemAdministration()
        p = adm.get_project_by_module(id)
        return p

#------State relevant operations---------

@electionSystem.route('/state')
@electionSystem.response(500, 'server error')
class StateListOperations(Resource):
    @electionSystem.marshal_list_with(state)
    def get(self):
        """Readout of all state-objects that exist in database.
        If there are no state-objects, you will get an empty sequenz."""             
        adm = ElectionSystemAdministration()
        states = adm.get_all_states()
        return states

    @electionSystem.marshal_with(state, code=200)
    @electionSystem.expect(state)
    def post(self):
        """Creates a new state-Object.
        We take the data sent by the client as a suggestion.
        For example, the assignment of the ID is not the task of the client.
        Even if the client should assign an ID in the proposal, it is
        it is up to the ElectionSystemAdministration (business logic) to create a correct ID
        to assign. *The corrected object is finally returned.
        """
        adm = ElectionSystemAdministration()

        proposal = State.from_dict(api.payload)

        if proposal is not None:
            """We only use the attributes of state of the proposal for generation
            of a object. The object created by the server is authoritative and
            is also returned to the client."""            
            s = adm.create_state(proposal.get_name())
            return s, 200
        else:
            #server error
            return '', 500

@electionSystem.route('/state/<int:id>')
@electionSystem.response(500, 'server error')
class StateOperations(Resource):
    @electionSystem.marshal_with(state)
    def get(self, id):
        """Reads out the a specific state-object by id.
        The realization of reading out the object is by ''id'' in the URI.
        """              
        adm = ElectionSystemAdministration()
        s = adm.get_by_state_id(id)
        return s

    @electionSystem.marshal_with(state)
    @electionSystem.expect(state, validate=True)
    def put(self, id):
        """Update of a specific state object.
        The relevant id is the id provided by the URI and thus as a method parameter
        is used. This parameter overwrites the ID attribute of the transmitted in the payload of the request
        state object."""
        adm = ElectionSystemAdministration()
        s = State.from_dict(api.payload)

        if s is not None:
            """This sets the id of the state object to be overwritten"""              
            s.set_id(id)
            adm.save_state(s)
            return '', 200
        else: 
            return '', 500

    def delete(self, id):
        """Delete a specific state object.
        The object to be deleted is determined by the ''id'' in the URI.
        """              
        adm = ElectionSystemAdministration()
        s = adm.get_by_state_id(id)
        adm.delete_state(s)
        return '', 200

#------Role relevant operations---------

@electionSystem.route('/role')
@electionSystem.response(500, 'server error')
class RoleListOperations(Resource):
    @electionSystem.marshal_list_with(role)
    def get(self):
        """Reading out all role objects.
        If no role objects are available, an empty sequence is returned."""
        adm = ElectionSystemAdministration()
        roles = adm.get_all_roles()
        return roles

    @electionSystem.marshal_with(role, code=200)
    @electionSystem.expect(role)
    def post(self):
        """Sets a new role-Object.
        We take the data sent by the client as a suggestion.
        For example, the assignment of the ID is not the task of the client.
        Even if the client should assign an ID in the proposal, it is
        it is up to the ElectionSystemAdministration (business logic) to create a correct ID
        to assign. *The corrected object is finally returned.
        """        
        adm = ElectionSystemAdministration()

        proposal = Role.from_dict(api.payload)

        if proposal is not None:
            """We only use the attributes of role of the proposal for generation
            of a object. The object created by the server is authoritative and
            is also returned to the client."""     
            r = adm.create_role(proposal.get_name())
            return r, 200
        else:
            #server error
            return '', 500

@electionSystem.route('/role/<int:id>')
@electionSystem.response(500, 'server error')
class RoleOperations(Resource):
    @electionSystem.marshal_with(role)
    def get(self, id):
        """Reads out the a specific role object by id.
        The realization of reading out the object is by ''id'' in the URI.
        """ 
        adm = ElectionSystemAdministration()
        r = adm.get_by_role_id(id)
        return r

    @electionSystem.marshal_with(role)
    @electionSystem.expect(role, validate=True)
    def put(self, id):
        """Update of a specific role object.
        The relevant id is the id provided by the URI and thus as a method parameter
        is used. This parameter overwrites the ID attribute of the transmitted in the payload of the request
        role object."""             
        adm = ElectionSystemAdministration()
        r = Role.from_dict(api.payload)

        if s is not None:
            """This sets the id of the state object to be overwritten"""                 
            r.set_id(id)
            adm.save_role(r)
            return '', 200
        else: 
            return '', 500

    def delete(self, id):
        """Delete a specific role object.
        The object to be deleted is determined by the ''id'' in the URI.
        """   
        adm = ElectionSystemAdministration()
        r = adm.get_by_role_id(id)
        adm.delete_role(r)
        return '', 200



if __name__ == '__main__':
    app.run(debug=True)
