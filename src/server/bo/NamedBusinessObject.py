from server.bo.BusinessObject import BusinessObject


class NamedBusinessObject(BusinessObject):

    # realization of a named business object

    def __init__(self):
        super().__init__()
        self._name = ""

    def set_name(self, name):
        """Sets the name of the bo."""
        self._name = name

    def get_name(self):
        """Read out of the name of the bo."""
        return self._name
