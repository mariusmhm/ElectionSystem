from server.bo.Project import Project
from server.db.ProjectMapper import ProjectMapper

from server.bo.Module import Module
from server.db.ModuleMapper import ModuleMapper

class ProjectAdministration (object):
    def __init__(self):
        pass

    def get_all_projects(self, ):
        with ProjectMapper() as mapper:
            return mapper.find_all()

    def find_project_by_id(self, number):
        with ProjectMapper() as mapper:
            return mapper.find_project_by_id(number)

    def find_project_by_name(self, name):
        with ProjectMapper() as mapper:
            return mapper.find_project_by_name(name)


    # --- Project SPECIFIC OPERATIONS ---

    def create_project(self, project_id, project_name, short_description, link, room_desired, grade_average, num_blockdays_in_exam, blockdays_in_exam, special_room, date_blockdays_during_lecture, num_blockdays_prior_lecture, blockdays_prior_lecture, num_blockdays_during_lecture, blockdays_during_lecture, weekly, num_spots):
        #create participation
        project = Project()
        project.set_project_id(project_id)
        project.set_project_name(project_name)
        project.set_short_description(short_description)
        project.set_link(link)
        project.set_room_desired(room_desired)
        project.set_grade_average(grade_average)
        project.set_num_blockdays_in_exam(num_blockdays_in_exam)
        project.set_blockdays_in_exam(blockdays_in_exam)
        project.set_special_room(special_room)
        project.set_date_blockdays_during_lecture(date_blockdays_during_lecture)
        project.set_num_blockdays_prior_lecture(num_blockdays_prior_lecture)
        project.set_blockdays_prior_lecture(blockdays_prior_lecture)
        project.set_num_blockdays_during_lecture(num_blockdays_during_lecture)
        project.set_blockdays_during_lecture(blockdays_during_lecture)
        project.set_weekly(weekly)
        project.set_num_spots(num_spots)

        with ProjectMapper() as mapper:
            return mapper.insert(project)
<<<<<<< HEAD
    
    def delete_project(self, project):
        
        with ProjectMapper() as mapper:
           return mapper.delete(project)


    def save_project(self, project):
        """Das Projekt speichern."""
        with ProjectMapper() as mapper:
            mapper.update(project)
=======


    # --- Module general Operations ---

    def get_all_modules(self, ):
        with ModuleMapper() as mapper:
            return mapper.find_all()


>>>>>>> 99cbdba7280c71649328ad1933e5bd1df208e6a7
