from server.bo.NamedBusinessObject import NamedBusinessObject


class Module(NamedBusinessObject):

    def __init__self(self):
        super().__init__()
        self._edv_number=""

    def set_edv_number(self,edv_number):
        """Set the edv number"""
        self._edv_number = edv_number

    def get_edv_number(self):
        """Read out the edv number"""
        return self._edv_number

    def __str__(self):

        """Creats a simple textually Representation of a Module() instanz.
        The Attributes are id, date, name and edv number."""

        return "Module: {}, {}, {}, {}, ".format(self.get_id(), self.get_date(), self.get_name(), self._edv_number)


    @staticmethod
    def to_dict(dicti=dict()):
        """Convert a Python dict() in a Module)."""
        module = Module()
        module.set_id(dicti["id"])
        module.set_date(dicti["creation_date"])
        module.set_name(dicti["name"])
        module.set_edv_number(dicti["edv_number"])
        return module
<<<<<<< HEAD
=======

>>>>>>> d9d9f00f6b1cb5a5f80e5d479cbcac9a3ea3e960


