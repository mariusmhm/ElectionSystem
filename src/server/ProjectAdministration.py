from server.bo.Project import Project
from server.db.ProjectMapper import ProjectMapper


class ProjectAdministration (object):
    def __init__(self):
        pass

    def get_all_projects(self, ):
        with ProjectMapper() as mapper:
            return mapper.find_all()

    def find_project_by_id(self, number):
        with ProjectMapper() as mapper:
            return mapper.find_project_by_id(number)
