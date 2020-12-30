# service is based on flask
from flask import Flask
# using flask restX
from flask_restx import Api, Resource, fields
# cors as a flask expendency
from flask_cors import CORS

from server.ElectionSystemAdministration import ElectionSystemAdministration
from server.bo.Student import Student
from server.bo.User import User
from server.bo.Semester import Semester
from server.bo.Participation import Participation
from server.bo.Grading import Grading
from server.bo.Projecttype import Projecttype
from server.bo.Project import Project

app = Flask(__name__)


CORS(app, resources=r'/electionsystem/*')

#creating an api for clients and server data

api = Api(app, version='1.0', title='Electionsystem API',
            description='A System for Students to elect Projects')

electionSystem = api.namespace('electionsystem', description="electionsystems functions")

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Unique id of a business object'),
    'creation_date': fields.Date(attribute='_creation_date', description='creation date of a business object')
})

nbo = api.inherit('NamedBusinessObject', bo, {
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
    'submit_projects_beginn_date':fields.Date(attribute='_submit_projects_beginn_date', description='Beginning date of submiting projects'),
    'grading_beginn_date':fields.Date(attribute='_grading_beginn_date', description='Beginning date of grading')
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

projecttype = api.inherit('Projecttype',nbo, {
    'ect': fields.Integer(attribute='_ect', description='Anzahl der ECTS für ein Projettyp'),
    'sws': fields.Integer(attribute='_sws', description='Anzahl der SWS für ein Projekttyp')
})

project = api.inherit('Project',nbo, {
    'short_description': fields.String(attribute='_short_description', description='A short description of the Project'),
    'link': fields.String(attribute='_link', description='Link of the project for Information'),
    'room_desired': fields.String(attribute='_room_desired', description='The room desired for lecture'),
    'room_necessary': fields.Boolean(attribute='_room_necessary', description='If a room is necessary'),
    'grade_average': fields.Float(attribute='_grade_average', description='The average grade of the project'),
    'num_blockdays_in_exam': fields.Integer(attribute='_num_blockdays_in_exam', description='The number of blockdays needed during exams'),
    'blockdays_in_exam': fields.Boolean(attribute='_blockdays_in_exam', description='If there are blockdays needed during exams'),
    'special_room': fields.Boolean(attribute='_special_room ', description='If there is a special room needed'),
    'date_blockdays_during_lecture': fields.Date(attribute='_date_blockdays_during_lecture ', description='The dates of the blockdays during lecture'),
    'num_blockdays_prior_lecture': fields.Integer(attribute='_num_blockdays_prior_lecture ', description='The number of the blockdays prior lecture'),
    'blockdays_prior_lecture': fields.Boolean(attribute='_blockdays_prior_lecture ', description='If blockdays are needed prior lecture'),
    'num_blockdays_during_lecture': fields.Integer(attribute='_num_blockdays_during_lecture ', description='The number of blockdays needed during lecture'),
    'blockdays_during_lecture': fields.Boolean(attribute='_blockdays_during_lecture ', description='If  blockdays  during lecture are needed'),
    'weekly': fields.Boolean(attribute='_weekly ', description='if weekly lectures are needed'),
    'num_spots': fields.Integer(attribute='_num_spots ', description='If weekly lectures are needed'),
    'language': fields.Integer(attribute='_language ', description='The language the project will be given'),
    'additional_professor': fields.Integer(attribute='_additional_professor ', description='If there is a additional professor is needed'),
    'professor_id': fields.Boolean(attribute='_professor_id ', description='The professor giving the project'),
    'projecttype_id': fields.Boolean(attribute='_projecttype_id ', description='The projecttype of the project'),
    'module_id': fields.Boolean(attribute='_module_id ', description='The module of the project'),
    'participation_id': fields.Boolean(attribute='participation_id ', description='The participations of the project'),

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
        print('main aufruf')

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


@electionSystem.route('/student-by-mail/<string:mail>')
@electionSystem.response(500, 'when server has problems')
class StudentMailOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, mail):
        adm = ElectionSystemAdministration()
        students = adm.get_student_by_mail(mail)
        return students


@electionSystem.route('/student-by-nr/<int:matrikel_nr>')
@electionSystem.response(500, 'when server has problems')
class StudentMatrikelNrOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, matrikel_nr):
        adm = ElectionSystemAdministration()
        students = adm.get_student_by_matrikel_nr(matrikel_nr)
        return students


@electionSystem.route('/student-by-study/<string:study>')
@electionSystem.response(500, 'when server has problems')
class StudentsStudyOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, study):
        adm = ElectionSystemAdministration()
        students = adm.get_student_by_study(study)
        return students

@electionSystem.route('/students-by-participations/<int:project_id>')
@electionSystem.response(500,'when the server has problems')
class StudentParticipationOperations(Resource):
    @electionSystem.marshal_with(student)
    def get(self, project_id):
        adm = ElectionSystemAdministration()
        students = adm.get_all_students_of_participation(project_id)
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


@electionSystem.route('/user-by-mail/<string:mail>')
@electionSystem.response(500, 'when server has problems')
class UserMailOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, mail):
        adm = ElectionSystemAdministration()
        user = adm.get_user_by_mail(mail)
        return user


@electionSystem.route('/user-by-role/<string:role>')
@electionSystem.response(500, 'when server has problems')
class UserRoleOperations(Resource):
    @electionSystem.marshal_with(user)
    def get(self, role):
        adm = ElectionSystemAdministration()
        users = adm.get_user_by_role(role)
        return users


#---Semester specific functions---


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
        """Create a new customer object."""
        """It is up to the election administration (business logic) to have a correct ID
            to forgive. The corrected object will eventually be returned. """
        adm = ElectionSystemAdministration()

        proposal = Semester.to_dict(api.payload)

        if proposal is not None:
            s = adm.create_semester(proposal.get_wintersemester(), proposal.get_submit_projects_end_date(), proposal.get_grading_end_date(), proposal.get_submit_projects_beginn_date(), proposal.get_grading_beginn_date())
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
    @electionSystem.expect(semester, validate=True)
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
class ParticipationOperations(Resource):
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
class ParticipationsProjectListOperations(Resource):
    @electionSystem.marshal_list_with(participation)
    def get(self, project_id):
        adm = ElectionSystemAdministration()
        pp = adm.get_all_by_project_id(project_id)
        return pp

@electionSystem.route('/participation-by-student/<int:student_id>')
@electionSystem.response(500, 'server error')
class ParticipationsStudentListOperations(Resource):
    @electionSystem.marshal_list_with(participation)
    def get(self, student_id):
        adm = ElectionSystemAdministration()
        pp = adm.get_all_by_student_id(student_id)
        return pp

@electionSystem.route('/participation-by-grading/<int:grading_id>')
@electionSystem.response(500, 'server error')
class ParticipationsGradingListOperations(Resource):
    @electionSystem.marshal_list_with(participation)
    def get(self, grading_id):
        adm = ElectionSystemAdministration()
        pp = adm.get_all_by_grading_id(grading_id)
        return pp

@electionSystem.route('/participation-by-priority-project/<int:project_id>')
@electionSystem.response(500, 'server error')
class ParticipationsPriorityProjectListOperations(Resource):
    @electionSystem.marshal_list_with(participation)
    def get(self, project_id):
        adm = ElectionSystemAdministration()
        pp = adm.get_by_project(project_id)
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
            g = adm.create_grading(proposal.get_grade())
            return g, 200
        else:
            #server error
            return '', 500

@electionSystem.route('/grading/<int:id>')
@electionSystem.response(500, 'server error')
class GradingOperations(Resource):
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
# ----------------------------Projecttype specific operations---------------------------

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
        **ATTENTION:** We take the data sent by the client as a suggestion.
        For example, the assignment of the ID is not the task of the client.
        Even if the client should assign an ID in the proposal, it is
        it is up to the ElectionSystemAdministration (business logic) to create a correct ID
        to assign. *The corrected object is finally returned.
        """
        adm = ElectionSystemAdministration()
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
        adm = ElectionSystemAdministration()
        single_pt = adm.get_projecttype_by_id(id)
        return single_pt

    def delete(self,id):
        """Delete a specific customer object.
        The object to be deleted is determined by the ``id`` in the URI.
        """
        adm = ElectionSystemAdministration()
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

        adm = ElectionSystemAdministration()
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
        adm = ElectionSystemAdministration()
        all_pt = adm.get_projecttype_by_name(name)
        return all_pt


#--- Module |START| ---
"""
@electionSystem.route('/module')
@electionSystem.response(500, 'if server has a problem')
class ModuleListOperations(Resource):
    @electionSystem.marshal_list_with(module)
    def get(self):
        adm=ElectionSystemAdministration()
        module=adm.get_all_modules()
        return module
"""

#--- Module |END| ---

#--- project |START| ---

@electionSystem.route('/projects')
@electionSystem.response(500, 'when the server has an error')
class ProjectListOperations(Resource):
    @electionSystem.marshal_list_with(project)
    def get(self):
        """Readout of all Project-Objects that exist in database.
        If there are no Project-Objects, you will get an empty sequenz."""
        adm = ElectionSystemAdministration()
        all_p = adm.get_all_projects()
        return all_p
    
    @electionSystem.marshal_with(project, code=200)
    @electionSystem.expect(project)
    def post(self):
        """Sets a new project-Object.
        **ATTENTION:** We take the data sent by the client as a suggestion.
        For example, the assignment of the ID is not the task of the client.
        Even if the client should assign an ID in the proposal, it is
        it is up to the ElectionSystemAdministration (business logic) to create a correct ID
        to assign. *The corrected object is finally returned.
        """
        adm = ElectionSystemAdministration()
        prpl = Project.to_dict(api.payload)

        if prpl is not None:
            p = adm.create_project(prpl.get_name(), prpl.get_short_description(), prpl.get_link(),
                                   prpl.get_room_desired(), prpl.get_room_necessary(), prpl.get_grade_average(), prpl.get_num_blockdays_in_exam,
                                   prpl.get_blockdays_in_exam(), prpl.get_special_room(), prpl.get_date_blockdays_during_lecture(), prpl.get_num_blockdays_prior_lecture(),
                                   prpl.get_blockdays_prior_lecture(), prpl.get_num_blockdays_during_lecture(), prpl.get_blockdays_during_lecture(), prpl.get_weekly(),
                                   prpl.get_num_spots(), prpl.get_language(), prpl.get_module_id(), prpl.get_participation_id(), prpl.get_projecttype_id(),
                                   prpl.get_professor_id(), prpl.get_additional_prof())

            return p, 200
        else:
            return '', 500


@electionSystem.route('/projects/<int:id>')
@electionSystem.response(500, 'when the server has problems')
class ProjectsOperations(Resource):
    @electionSystem.marshal_with(project)
    def get(self, id):
        """Reads out the a specific Project-Object by id.
        The realization of reading out the object is by ```id``` in dem URI.
        """
        adm = ElectionSystemAdministration()
        single_pj = adm.get_project_by_id(id)
        return single_pj

    def delete(self,id):
        """Delete a specific project object.
        The object to be deleted is determined by the ``id`` in the URI.
        """
        adm = ElectionSystemAdministration()
        single_pj = adm.get_project_by_id(id)
        adm.delete_project(single_pj)
        return '', 200

    @electionSystem.marshal_with(project)
    @electionSystem.expect(project, validate=True)
    def put(self, id):
        """Update a specific project object.
        **CAUTION:** Relevant id is the id provided by URI and thus used as method parameter.
        method parameter. This parameter overrides the id attribute of the project object passed in the request payload.
        project object.
        """

        adm = ElectionSystemAdministration()
        p = Project.to_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.update_project(p)
            return '', 200
        else:
            return '', 500


@electionSystem.route('/projects/<string:name>')
@electionSystem.response(500, 'when the server has problems')
class ProjectNameOperations(Resource):
    @electionSystem.marshal_with(project)
    def get(self, name):
        adm = ElectionSystemAdministration()
        all_pj = adm.get_project_by_name(name)
        return all_pj

# --- project specific operations ----

# --- FIND PROJECT BY PROFESSOR ID


if __name__ == '__main__':
    app.run(debug=True)
