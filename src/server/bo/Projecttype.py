from server.bo.NamedBusinessObject import NamedBusinessObject


class Projecttype(NamedBusinessObject):
    """Realization of an examplary Projecttype Class.
    """

    def __init__(self):
        super().__init__()
        self._ect = 0
        self._sws = 0

    def get_ect(self):
        """Reads out of the ECTs."""
        return self._ect

    def set_ect(self, ect):
        """Sets the ECTs."""
        self._ect = ect

    def get_sws(self):
        """Reads out of the SWS."""
        return self._sws

    def set_sws(self, sws):
        """Sets the SWS."""
        self._sws = sws

    def __str__(self):
        """Creats a simple textually Representation of a Projecttype() instanc. The Attributes are ECTs and SWS."""
        return "Projecttype: {}, {}, {}, {}, {} ".format(self.get_id(), self.get_name(),self.get_date(), self._ect, self._sws)

    @staticmethod
    def to_dict(dicti=dict()):
        """Transforms a Python dict() into a Projecttype()."""
        projecttype = Projecttype()
        projecttype.set_id(dicti["id"])
        projecttype.set_name(dicti["name"])
        projecttype.set_date(dicti["creation_date"])
        projecttype.set_sws(dicti["sws"])
        projecttype.set_ect(dicti["ect"])
        return projecttype
