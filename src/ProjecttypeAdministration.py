from server.bo.Projecttype import Projecttype
from server.db.ProjecttypeMapper import ProjecttypeMapper

class ProjecttypeAdministration (object):
    def __init__(self):
        pass

    def get_all_projecttypes (self):
        with ProjecttypeMapper() as mapper:
            return mapper.find_all()


    def get_projecttype_by_id (self, id):
        with ProjecttypeMapper() as mapper:
            return mapper.find_by_id(id)

    def update_projecttype(self, projecttype):
        with ProjecttypeMapper() as mapper:
            return mapper.update(projecttype)


    def delete_projecttype(self, projecttype):
        with ProjecttypeMapper() as mapper:
            return mapper.delete(projecttype)


    def create_projecttype(self, sws, ects):
        projecttype = Projecttype()
        projecttype.set_ects(ects)
        projecttype.set_sws(sws)
        projecttype.set_id(1)
        projecttype.set_creation_date(1)

        with ProjecttypeMapper() as mapper:
            return mapper.insert(projecttype)

