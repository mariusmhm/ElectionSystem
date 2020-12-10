"""from server.bo.NamedBusinessObject import NamedBusinessObject"""
from server.bo.BusinessObject import BusinessObject



class Projecttype(BusinessObject):

    """Realization of an examplary Projecttype.
    """

    def __init__(self):
        super().__init__()
        self._ects = 0
        self._sws = 0

    def get_ects(self):
        """Reads out of the ECTs."""
        return self._ects

    def set_ects(self,ects):
        """Sets the ECTs."""
        self._ects = ects

    def get_sws(self):
        """Reads out of the SWS."""
        return self._sws

    def set_sws(self, sws):
        """Sets the SWS."""
        self._sws = sws


    def __str__(self):
        """Creats a simple textually Representation of a Projecttype() instanc. The Attributes are ECTs and SWS."""
        return "Projecttype: {}, {}, {}, {}, ".format(self.get_id(), self.get_creation_date(), self._ects, self._sws)

    @staticmethod
    def to_dict(dicti=None):

        """Transform a Python dict() into a Projecttype()."""
        if dicti is None:
            dicti = dict()
        projecttype = Projecttype()
        projecttype.set_id(dicti["id"])
        projecttype.set_creation_date(dicti["creation_date"])
        projecttype.set_sws(dicti["sws"])
        projecttype.set_ects(dicti["ects"])
        return projecttype




