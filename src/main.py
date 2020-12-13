# service is based on flask
from flask import Flask
# using flask restX
from flask_restx import Api, Resource, fields
# cors as a flask expendency
from flask_cors import CORS

from server.ElectionSystemAdministration import ElectionSystemAdministration
from server.bo.Student import Student
from server.bo.User import User

app = Flask(__name__)


CORS(app, resources=r'/electionsystem/*')

#creating an api for clients and server data

api = Api(app, version='1.0', title='Electionsystem API',
            description='A System for Students to elect Projects')

electionSystem = api.namespace('electionsystem', description="electionsystems functions")

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='id of a business object'),
    'creation_date': fields.Date(attribute='_creation_date', description='creation date of a business object')
})

nbo = api.model('NamedBusinessObject', bo, {
    'name': fields.String(attribute='_name', description='name of a named business object')
})

user = api.inherit('User', nbo, {
    'google_user_id': fields.String(attribute='_google_user_id', description='Users Google id from firebase'),
    'firstname': fields.String(attribute='_firstname', description='Users First Name'),
    'mail': fields.String(attribute='_mail', description='Users Mail'),
    'role': fields.String(attribute='_role', description='User can be an student, administration or a professor')
})

student = api.inherit('Student', user, {
    'matrikel_nr': fields.Integer(attribute='_matrikel_nr', description='Students Matrikel Number'),
    'study': fields.String(attribute='_study', description='Students Study')
})

semester= api.inherit('Semester', bo, {
    'winter_semester':fields.Boolean(attribute='_winter_semester', description='Winter Semester is true or false'),
    'submit_projects_end_date':fields.Date(attribute='_submit_projects_end_date', description='End datum'),
    'grading_end_date':fields.Date(attribute='_grading_end_date', description='End date of grading'),
})


# --- STUDENT SPECIFIC OPERATIONS ---

@electionSystem.route('/student')
@electionSystem.response(500, 'when server has problems')
class StudentListOperations(Resource):
    @electionSystem.marshal_list_with(student)
    def get(self):
        adm = ElectionSystemAdministration()
        students = adm.get_all_students()
        return students

    @electionSystem.marshal_with(student, code=200)
    @electionSystem.expect(student)
    def post(self):
        adm = ElectionSystemAdministration()
        prpl = Student.to_dict(api.payload)

        if prpl is not None:
            s = adm.create_student(prpl.get_name(), prpl.get_google_user_id(), prpl.get_firstname(), prpl.get_mail(), prpl.get_role(), prpl.get_matrikel_nr(), prpl.get_study())

            return s, 200
        else:
            return '', 500


@electionSystem.route('/student/<int:id>')
@electionSystem.response(500, 'when server has problems')
class StudentOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, id):
        adm = ElectionSystemAdministration()
        single_student = adm.get_student_by_id(id)
        return single_student

    # irrelevant for user and student as a prototype?
    @electionSystem.marshal_with(student)
    @electionSystem.expect(student, validate=True)
    def put(self, id):
        adm = ElectionSystemAdministration()
        s = Student.to_dict(api.payload)

        if s is not None:
            s.set_id(id)
            adm.update_student(s)
            return '', 200
        else:
            return '', 500

    def delete(self, id):
        adm = ElectionSystemAdministration()
        single_student = adm.get_student_by_id(id)
        adm.delete_student(single_student)
        return '', 200


@electionSystem.route('/student/<string:name>')
@electionSystem.response(500, 'when server has problems')
class StudentsNameOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, name):
        adm = ElectionSystemAdministration()
        students = adm.get_student_by_name(name)
        return students


# returns an empty list WHY??
@electionSystem.route('/student-by-mail/<string:mail>')
@electionSystem.response(500, 'when server has problems')
class StudentMailOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, mail):
        adm = ElectionSystemAdministration()
        students = adm.get_student_by_mail(mail)
        return students


# returns an empty list WHY??
@electionSystem.route('/student-by-nr/<int:matrikel_nr>')
@electionSystem.response(500, 'when server has problems')
class StudentMatrikelNrOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, matrikel_nr):
        adm = ElectionSystemAdministration()
        students = adm.get_student_by_matrikel_nr(matrikel_nr)
        return students


# returns an empty list WHY??
@electionSystem.route('/student-by-study/<string:study>')
@electionSystem.response(500, 'when server has problems')
class StudentsStudyOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, study):
        adm = ElectionSystemAdministration()
        students = adm.get_student_by_study(study)
        return students
        

# --- USER SPECIFIC OPERATIONS ---

@electionSystem.route('/user')
@electionSystem.response(500, 'when server has problems')
class UserListOperations(Resource):
    @electionSystem.marshal_list_with(user)
    def get(self):
        adm = ElectionSystemAdministration()
        users = adm.get_all_users()
        return users

    @electionSystem.marshal_with(user, code=200)
    @electionSystem.expect(user)
    def post(self):
        adm = ElectionSystemAdministration()
        prpl = User.to_dict(api.payload)

        if prpl is not None:
            u = adm.create_user(prpl.get_name(), prpl.get_google_user_id(), prpl.get_firstname(), prpl.get_mail(), prpl.get_role())

            return u, 200
        else:
            return '', 500


@electionSystem.route('/user/<int:id>')
@electionSystem.response(500, 'when server has problems')
class UserOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, id):
        adm = ElectionSystemAdministration()
        single_user = adm.get_user_by_id(id)
        return single_user

    # irrelevant for user and student as a prototype?
    @electionSystem.marshal_with(user)
    @electionSystem.expect(user, validate=True)
    def put(self, id):
        adm = ElectionSystemAdministration()
        u = User.to_dict(api.payload)

        if u is not None:
            u.set_id(id)
            adm.update_user(u)
            return '', 200
        else:
            return '', 500

    def delete(self, id):
        adm = ElectionSystemAdministration()
        single_user = adm.get_user_by_id(id)
        adm.delete_user(single_user)
        return '', 200


@electionSystem.route('/user/<string:name>')
@electionSystem.response(500, 'when server has problems')
class UserNameOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, name):
        adm = ElectionSystemAdministration()
        users = adm.get_user_by_name(name)
        return users


# returns an empty list WHY??
@electionSystem.route('/user-by-mail/<string:mail>')
@electionSystem.response(500, 'when server has problems')
class UserMailOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, mail):
        adm = ElectionSystemAdministration()
        user = adm.get_user_by_mail(mail)
        return user


# returns an empty list WHY??
@electionSystem.route('/user-by-role/<string:role>')
@electionSystem.response(500, 'when server has problems')
class UserRoleOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, role):
        adm = ElectionSystemAdministration()
        users = adm.get_user_by_role(role)
        return users


"""---Semester specific functions---"""

@electionSystem.route('/semester')
@electionSystem.response(500, 'If there is a server-side error.')
class SemesterListOperations(Resource):
    @electionSystem.marshal_list_with(semester)
    def get(self):
        """Reading out all semester objects. If no semester objects are available, an empty sequence is returned."""
        adm = ElectionSystemAdministration()
        semester = adm.get_all_semester()
        return semester

    @electionSystem.marshal_with(semester, code=200)
    @electionSystem.expect(semester)  # We expect a semester object from the client side.
    def post(self):
        """Create a new customer object."""
        It is up to the election administration (business logic) to have a correct ID
        to forgive. The corrected object will eventually be returned. """
        adm = ElectionSystemAdministration()

        proposal = Semester.to_dict(api.payload)

        if proposal is not None:
            s = adm.create_semester(proposal.get_wintersemester(),
                                    proposal.get_submit_projects_end_date(),
                                    proposal.get_grading_end_date())
            return s, 200

        else:
            """If something goes wrong we dont return anything and throw a server error."""
            return '', 500


@electionSystem.route('/semester/<int:id>')
@electionSystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@electionSystem.param('id', 'Die ID des Semester-Objekts')
class SemesterOperations(Resource):
    @electionSystem.marshal_with(semester)
    def get(self, id):
        """Reading out a specific semester object.
        The object to be read is determined by the `` id '' in the URI."""
        adm = ElectionSystemAdministration()
        pt = adm.get_semester_by_id(id)
        return pt

    def delete(self, id):
        """Deleting a specific semester object.
        The object to be deleted is determined by the `` id '' in the URI."""
        adm = ElectionSystemAdministration()
        semester = adm.get_semester_by_id(id)
        adm.delete_semester(semester)
        return '', 200

    @electionSystem.marshal_with(semester)
    def put(self, id):
        """Update of a specific semester object"""
        adm = ElectionSystemAdministration()
        s = Semester.to_dict(api.payload)

        if s is not None:
            """This sets the id of the account object to be overwritten"""
            s.set_id(id)
            adm.save_semester(s)
            return '', 200
        else:
            return '', 500


if __name__ == '__main__':
    app.run(debug=True)
