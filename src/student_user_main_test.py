# service is based on flask
from flask import Flask
# using flask restX
from flask_restx import Api, Resource, fields
# cors as a flask expendency
from flask_cors import CORS

from student_user_administration_test import StudentUserAdministration
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

nbo = api.model('NamedBusinessObject', {
    'name': fields.String(attribute='_name', description='name of a named business object')
})

student = api.inherit('Student', bo, nbo, {
    'student_firstname': fields.String(attribute='_student_firstname', description="Students First Name"),
    'mail': fields.String(attribute='_mail', description='Students Mail'),
    'role': fields.String(attribute='_role', description='Student can only be a student'),
    'matrikel_nr': fields.Integer(attribute='_matrikel_nr', description='Students Matrikel Number'),
    'study': fields.String(attribute='_study', description='Students Study')
})

user = api.inherit('User', bo, nbo, {
    'user_firstname': fields.String(attribute='_user_firstname', description='Users First Name'),
    'mail': fields.String(attribute='_mail', description='Users Mail'),
    'role': fields.String(attribute='_role', description='User can be an student, administration or a professor')
})


# --- STUDENT SPECIFIC OPERATIONS ---

@electionSystem.route('/student')
@electionSystem.response(500, 'when server has problems')
class StudentListOperations(Resource):
    @electionSystem.marshal_list_with(student)
    def get(self):
        adm = StudentUserAdministration()
        students = adm.get_all_students()
        return students

    @electionSystem.marshal_with(student, code=200)
    @electionSystem.expect(student)
    def post(self):
        adm = StudentUserAdministration()
        prpl = Student.to_dict(api.payload)

        if prpl is not None:
            s = adm.create_student(prpl.get_name(), prpl.get_firstname(), prpl.get_mail(), prpl.get_role(), prpl.get_matrikel_nr(), prpl.get_study())

            return s, 200
        else:
            return '', 500


@electionSystem.route('/student/<int:id>')
@electionSystem.response(500, 'when server has problems')
class StudentOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, id):
        adm = StudentUserAdministration()
        single_student = adm.get_student_by_id(id)
        return single_student

    @electionSystem.marshal_with(student)
    @electionSystem.expect(student, validate=True)
    def put(self, id):
        adm = StudentUserAdministration()
        s = Student.to_dict(api.payload)

        if s is not None:
            s.set_id(id)
            adm.update_student(s)
            return '', 200
        else:
            return '', 500

    # doesnt work right now, parameter isnt an object it is a list 
    def delete(self, id):
        adm = StudentUserAdministration()
        single_student = adm.get_student_by_id(id)
        adm.delete_student(single_student[0])
        return '', 200


@electionSystem.route('/student/<string:name>')
@electionSystem.response(500, 'when server has problems')
class StudentsNameOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, name):
        adm = StudentUserAdministration()
        students = adm.get_student_by_name(name)
        return students


# returns an empty list WHY??
@electionSystem.route('/student/<string:mail>')
@electionSystem.response(500, 'when server has problems')
class StudentMailOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, mail):
        adm = StudentUserAdministration()
        students = adm.get_student_by_mail(mail)
        return students


# returns an empty list WHY??
@electionSystem.route('/student/<int:matrikel_nr>')
@electionSystem.response(500, 'when server has problems')
class StudentMatrikelNrOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, matrikel_nr):
        adm = StudentUserAdministration()
        students = adm.get_student_by_matrikel_nr(matrikel_nr)
        return students


# returns an empty list WHY??
@electionSystem.route('/student/<string:study>')
@electionSystem.response(500, 'when server has problems')
class StudentsStudyOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, study):
        adm = StudentUserAdministration()
        students = adm.get_student_by_study(study)
        return students
        

# --- USER SPECIFIC OPERATIONS ---

@electionSystem.route('/user')
@electionSystem.response(500, 'when server has problems')
class UserListOperations(Resource):
    @electionSystem.marshal_list_with(user)
    def get(self):
        adm = StudentUserAdministration()
        users = adm.get_all_users()
        return users

    @electionSystem.marshal_with(user, code=200)
    @electionSystem.expect(user)
    def post(self):
        adm = StudentUserAdministration()
        prpl = User.to_dict(api.payload)
        # user_firstname wird nicht übergeben?!
        if prpl is not None:
            u = adm.create_user(prpl.get_name(), prpl.get_firstname(), prpl.get_mail(), prpl.get_role())

            return u, 200
        else:
            return '', 500


@electionSystem.route('/user/<int:id>')
@electionSystem.response(500, 'when server has problems')
class UserOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, id):
        adm = StudentUserAdministration()
        single_user = adm.get_user_by_id(id)
        return single_user

    @electionSystem.marshal_with(user)
    @electionSystem.expect(user, validate=True)
    def put(self, id):
        adm = StudentUserAdministration()
        u = User.to_dict(api.payload)

        if u is not None:
            u.set_id(id)
            adm.update_user(u)
            return '', 200
        else:
            return '', 500


@electionSystem.route('/user/<string:name>')
@electionSystem.response(500, 'when server has problems')
class UserNameOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, name):
        adm = StudentUserAdministration()
        users = adm.get_user_by_name(name)
        return users


# returns an empty list WHY??
@electionSystem.route('/user/<string:mail>')
@electionSystem.response(500, 'when server has problems')
class UserMailOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, mail):
        adm = StudentUserAdministration()
        user = adm.get_user_by_mail(mail)
        return user


# returns an empty list WHY??
@electionSystem.route('/user/<string:role>')
@electionSystem.response(500, 'when server has problems')
class UserRoleOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, role):
        adm = StudentUserAdministration()
        users = adm.get_user_by_role(role)
        return users


if __name__ == '__main__':
    app.run(debug=True)