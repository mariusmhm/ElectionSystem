class Role():
    """The implementation of a exemplary role class.
    """

    def __init__(self):
        self._id = 0
        self._name = ""   

    def get_id(self):
        """Reads out the id."""
        return self._id

    def set_id(self, val):
        """Sets the id."""
        self._id = val
    
    def get_name(self):
        """Reads out the name."""
        return self._name

    def set_name(self, txt):
        """Sets the name."""
        self._name = txt

    @staticmethod
    def from_dict(dicti=dict()):

        """"Converts a Python dict() into a Role()."""
        role = Role()
        role.set_id(dicti["id"])
        role.set_name(dicti["name"])
        return role
