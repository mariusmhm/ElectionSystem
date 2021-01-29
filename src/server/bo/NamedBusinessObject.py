from server.bo.BusinessObject import BusinessObject


class NamedBusinessObject(BusinessObject):
    """The implementation of a NamedBusinessObject class.
    Collective base class for the implementation of all relevant classes 
    within this project.

    A central attribute for all named business objects is the name.
    """

    def __init__(self):
        super().__init__()
        self._name = ""

    def set_name(self, name):
        """Sets the name."""
        self._name = name

    def get_name(self):
        """Reads out of the name."""
        return self._name
