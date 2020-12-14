from server.bo.Participation import Participation
from server.bo.Grading import Grading

from server.db.ParticipationMapper import ParticipationMapper
from server.db.GradingMapper import GradingMapper


class ElectionSystemAdministration(object):
    def __init__(self):
        pass

    #-----Participation--------

    def create_participation(self, priority, grading_id, student_id, project_id):
        #create participation
        pp = Participation()
        pp.set_priority(priority)
        pp.set_grading_id(grading_id)
        pp.set_student_id(student_id)
        pp.set_project_id(project_id)
        pp.set_id(1)
        pp.set_creation_date(1)

        with ParticipationMapper() as mapper:
            return mapper.insert(pp)

    def save_participation(self, participation):
        with ParticipationMapper() as mapper:
            mapper.update(participation)

    def delete_participation(self, participation):
        with ParticipationMapper() as mapper:
            mapper.delete(participation)

    def get_by_participation_id(self, id):
        with ParticipationMapper() as mapper:
            return mapper.find_by_participation_id(id)

    def get_all_by_project_id(self, project_id):
        with ParticipationMapper() as mapper:
            return mapper.find_all_by_project_id(project_id)

    def get_all_by_student_id(self, student_id):
        with ParticipationMapper() as mapper:
            return mapper.find_all_by_student_id(student_id)

    def get_all_by_grading_id(self, grading_id):
        with ParticipationMapper() as mapper:
            return mapper.find_all_by_grading_id(grading_id)
        
    def get_all_by_priority(self, priority):
        with ParticipationMapper() as mapper:
            return mapper.find_all_by_priority(priority)

    def delete_grading_id(self, participation):
        with ParticipationMapper() as mapper:
            mapper.delete_grading_id(participation)

    #-----Grading-------

    def create_grading(self, grade):

        allgrades = self.get_all_grades()

        glist=[]

        for g in allgrades:
            glist.append(g.get_grade())
            
        if grade in glist:
            print('grade exists') 
            return None 
        else: 
            self.new_grading(grade)
        

    def new_grading(self, grade):
        #create grading
        g = Grading()
        g.set_grade(grade)
        g.set_id(1)
        g.set_creation_date(1)

        with GradingMapper() as mapper:
            return mapper.insert(g)

    def save_grading(self, grading):
        with GradingMapper() as mapper:
            mapper.update(grading)

    def delete_grading(self, grading):
        with GradingMapper() as mapper:

            participations = self.get_all_by_grading_id(grading.get_id())

            if not(participations is None):
                for p in participations:
                    self.delete_grading_id(p)
                          
            mapper.delete(grading)
       
    
    def get_all_grades(self):
        with GradingMapper() as mapper:
            return mapper.find_all()

    def get_by_grading_id(self, id):
        with GradingMapper() as mapper:
            return mapper.find_by_grading_id(id)
    

















