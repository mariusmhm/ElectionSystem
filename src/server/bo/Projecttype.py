from server.bo.NamedBusinessObject import NamedBusinessObject


class Projecttype(NamedBusinessObject):

    """Realization of an examplary Projecttype.
    """

    def __init__(self):
        self.__ects = 0
        self.__sws = 0

    def get_ects(self):
        """Read out of the ECTs."""
        return self.__ects

    def set_ects(self,ects):
        """Set the ECTs."""
        self.__ects = ects

    def get_sws(self):
        """Read out of the SWS."""
        return self.__sws

    def set_sws(self, sws):
        """Set the SWS."""
        self.__sws = sws


    def __str__(self):

        """Creats a simple textually Representation of a Projecttype() instanz.

        The Attributes are ECTs and SWS."""

        return "Projecttype: {}, {}, {}, {}, {}, ".format(self.get_id(), self.get_creation_date, self.get_name(), self.get_ects(), self.get_sws())

    @staticmethod
    def to_dict(dicti=dict()):

        """"Convert a Python dict() in a Projecttype()."""
        projecttype = Projecttype()
        projecttype.set_ects(dicti["ETCS"])
        projecttype.set_id(dicti["Projecttype_ID"])
        projecttype.set_name(dicti["Projecttype_Name"])
        projecttype.set_creation_date(dicti["Creation_Date"])
        projecttype.set_sws(dicti["SWS"])
        return projecttype
