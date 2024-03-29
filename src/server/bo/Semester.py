from server.bo.NamedBusinessObject import NamedBusinessObject

"""Realization of an semester class"""
    
class Semester(NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._submit_projects = False
        self._grading = False
        self._election = False

    def get_submit_projects(self):
        """Read submit_project_end_date."""
        return self._submit_projects

    def set_submit_projects(self, sp):
        """Set submit_project_end_date."""
        self._submit_projects = sp

    def get_grading(self):
        """Read the grading beginn date."""
        return self._grading

    def set_grading(self, grading):
        """Set the grading beginn date."""
        self._grading = grading

    def get_election(self):
        """Read the election beginn date."""
        return self._election

    def set_election(self, election):
        """Set the election beginn date."""
        self._election = election


    @staticmethod
    def to_dict(dicti=dict()):
        """Convert a Python dict() in a Semester()."""
        semester = Semester()
        semester.set_id(dicti["id"])
        semester.set_date(dicti["creation_date"])
        semester.set_name(dicti["name"])
        semester.set_submit_projects(dicti["submit_projects"])
        semester.set_grading(dicti["grading"])
        semester.set_election(dicti["election"])
        return semester
