from server.bo.Participation import Participation
from server.db.Mapper import Mapper

class ParticipationMapper (Mapper):
    
    def __init__(self):
        super().__init__

    def find_all(self):
        """Read out all participations :return A collection of participation objects that all participations represent."""

        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * from participation")
        tuples = cursor.fetchall()

        for (participation_id, creation_date, student_id, project_id, grading_id, priority) in tuples:
            participation = Participation()
            participation.set_id(participation_id)
            participation.set_creation_date(creation_date)
            participation.set_student(student_id)
            participation.set_project(project_id)
            participation.set_grading(grading_id)
            participation.set_priority(priority)
            result.append(participation)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, participation_id):
        """Read out the participation based on their id.
        : param participation_id of the associated participation.
        : return a participation object with the id number."""

        result = None
        cursor = self._connection.cursor()
        command = "SELECT participation_id, creation_date, student_id, project_id, grading_id, priority FROM participations WHERE participation_id={}" \
                  .format(participation_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (participation_id, creation_date, student, project, grading, priority) = tuples[0]
            participation = Participation()
            participation.set_id(participation_id)
            participation.set_creation_date(creation_date)
            participation.set_student(student)
            participation.set_project(project)
            participation.set_grading(grading)
            participation.set_priority(priority)
            result = participation

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_student_id(self, student_id):
        """Read out the participations based on the student.
        : param student of the associated participations.
        : return a participation object with the student number."""

        result = None
        cursor = self._connection.cursor()
        command = "SELECT participation_id, creation_date, student_id, project_id, grading_id, priority FROM participations WHERE student_id={}" \
                  .format(student_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (participation_id, creation_date, student_id, project_id, grading_id, priority) = tuples[0]
            participation = Participation()
            participation.set_id(participation_id)
            participation.set_creation_date(creation_date)
            participation.set_student(student_id)
            participation.set_project(project_id)
            participation.set_grading(grading_id)
            participation.set_priority(priority)
            result = participation

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

        
    def find_by_project_id(self, project):
        """Read out the participations based on the project.
        : param project of the associated participations.
        : return a participation object with the project number."""

        result = None
        cursor = self._connection.cursor()
        command = "SELECT participation_id, creation_date, student_id, project_id, grading_id, priority FROM participations WHERE project_id={}" \
                  .format(project_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (participation_id, creation_date, student_id, project_id, grading_id, priority) = tuples[0]
            participation = Participation()
            participation.set_id(participation_id)
            participation.set_creation_date(creation_date)
            participation.set_student(student_id)
            participation.set_project(project_id)
            participation.set_grading(grading_id)
            participation.set_priority(priority)
            result = participation

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

        
    def find_by_priority(self, priority):
        """Read out the participation based on their priority.
        : param priority of the associated participations.
        : return a participation object with the priority number."""

        result = None
        cursor = self._connection.cursor()
        command = "SELECT participation_id, creation_date, student_id, project_id, grading_id, priority FROM participations WHERE priority={}" \
                  .format(priority)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (participation_id, creation_date, student_id, project_id, grading_id, priority) = tuples[0]
            participation = Participation()
            participation.set_id(participation_id)
            participation.set_creation_date(creation_date)
            participation.set_student(student_id)
            participation.set_project(project_id)
            participation.set_grading(grading_id)
            participation.set_priority(priority)
            result = participation

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()
        return result