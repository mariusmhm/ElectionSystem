from server.bo.Projecttype import Projecttype
from server.db.ProjecttypeMapper import ProjecttypeMapper

class ProjecttypeAdministration (object):
    def __init__(self):
        pass

    def create_projecttype(self, creation_date, projecttype_name, sws, ects):
        """Create a ne Projecttype:"""
        projecttype = Projecttype()
        projecttype.set_id(1)
        projecttype.set_creation_date(creation_date)
        projecttype.set_name(projecttype_name)
        projecttype.set_sws(sws)
        projecttype.set_etcs(ects)

        with ProjecttypeMapper() as mapper:
            return mapper.insert(projecttype)

    def get_projecttype_by_id(self, projecttype_id):
        """Read out the projecttype by ID."""
        with ProjecttypeMapper() as mapper:
            return mapper.find_by_id(projecttype_id)

    def get_projecttype_by_name(self, projecttype_name):
        """Read out the projecttype by name."""
        with ProjecttypeMapper() as mapper:
            return mapper.find_by_name(projecttype_name)

    def get_all_projecttypes(self):
        """Read out all projecttypes"""
        with ProjecttypeMapper() as mapper:
            return mapper.find_all()

    def delete_projecttype(self, projecttype):
        """delete a projecttype"""
        with ProjecttypeMapper() as mapper:
            mapper.delete(projecttype)

    def save_projecttype(self, projecttype):
        """update a projecttype."""
        with ProjecttypeMapper() as mapper:
            mapper.update(projecttype)







