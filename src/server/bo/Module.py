from server.bo.NamedBusinessObject import NamedBusinessObject


class Module(NamedBusinessObject):
    """The implementation of a exemplary module class.
    """

    def __init__self(self):
        super().__init__()
        self._edv_number=""

    def set_edv_number(self,edv_number):
        """Set the edv number"""
        self._edv_number = edv_number

    def get_edv_number(self):
        """Reads out the edv number"""
        return self._edv_number

    def __str__(self):

        """Creats a simple textually Representation of a Module() instanz.
        The Attributes are id, date, name and edv number."""

        return "Module: {}, {}, {}, {}, ".format(self.get_id(), self.get_date(), self.get_name(), self._edv_number)


    @staticmethod
    def to_dict(dicti=dict()):
        """Converts a Python dict() into a Module)."""
        module = Module()
        module.set_id(dicti["id"])
        module.set_date(dicti["creation_date"])
        module.set_name(dicti["name"])
        module.set_edv_number(dicti["edv_number"])
        return module



