from server.bo.Semester import Semester
from server.db.SemesterMapper import SemesterMapper
from datetime import date


class ElectionSystemAdministration(object):
    def __init__(self):
        pass

    def create_semester(self, winter_semester, grading_end_date, submit_projects_end_date):
        """Create a ne Semester:"""
        semester = Semester()
        semester.set_wintersemester(winter_semester)
        semester.set_grading_end_date(grading_end_date)
        semester.set_submit_projects_end_date(submit_projects_end_date)
        semester.set_creation_date(1)
        semester.set_id(1)

        with SemesterMapper() as mapper:
            return mapper.insert(semester)

    def get_semester_by_id(self, id):
        """Read out the semester by ID."""
        with SemesterMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_semester(self):
        """Read out all semesters"""
        with SemesterMapper() as mapper:
            return mapper.find_all()

    def save_semester(self, semester):
        """update a semesters."""
        with SemesterMapper() as mapper:
            mapper.update(semester)

    def delete_semester(self, semester):
        """delete a semester"""
        with SemesterMapper() as mapper:
            mapper.delete(semester)











