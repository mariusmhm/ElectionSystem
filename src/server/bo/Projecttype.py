from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject


class Projecttype(NamedBusinessObject):

    """Realization of an examplary Projecttype.
    """

    def __init__(self):
        self.__etcs = 0
        self.__sws = 0

    def get_etcs(self):
        """Read out of the ECTs."""
        return self.__etcs

    def set_etcs(self,etcs):
        """Set the ECTs."""
        self.__etcs = etcs

    def get_sws(self):
        """Read out of the SWS."""
        return self.__sws

    def set_sws(self, sws):
        """Set the SWS."""
        self.__sws = sws


    def __str__(self):

        """Creats a simple textually Representation of a Projecttype() instanz.

        The Attributes are ECTs and SWS."""

        return "Project:  {}, {}, ".format(self.get_ects(),self.get_sws())

    @staticmethod
    def to_dict(dicti=dict()):

        """"Convert a Python dict() in a Projecttype()."""
        projecttype = Projecttype()
        projecttype.set_etcs(dicti["ETCS"])
        project.set_sws(dicti["SWS"])
        return projecttype
