from server.bo.Projecttype import Projecttype
from server.db.ProjecttypeMapper import ProjecttypeMapper

class ProjecttypeAdministration (object):

    def __init__(self):
        pass

    def get_all_projecttypes (self):
        with ProjecttypeMapper() as mapper:
            return mapper.find_all()

    def get_projecttype_by_id (self, p_id):
        with ProjecttypeMapper() as mapper:
            return mapper.find_by_id(p_id)

    def get_projecttype_by_name(self, name):
        with ProjecttypeMapper() as mapper:
            return mapper.find_by_name(name)

    def update_projecttype(self, pt):
        with ProjecttypeMapper() as mapper:
            return mapper.update(pt)

    def delete_projecttype(self, pt):
        with ProjecttypeMapper() as mapper:
            return mapper.delete(pt)

    def create_projecttype(self,name, sws, ect):
        projecttype = Projecttype()
        projecttype.set_name(name)
        projecttype.set_ect(ect)
        projecttype.set_sws(sws)
        projecttype.set_id(1)
        projecttype.set_creation_date(1)

        with ProjecttypeMapper() as mapper:
            return mapper.insert(projecttype)

