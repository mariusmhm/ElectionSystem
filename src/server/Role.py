class Role():

    def __init__(self):
        self._id = 0
        self._name = ""   

    def get_id(self):
        return self._id

    def set_id(self, val):
        self._id = val
    
    def get_name(self):
        return self._name

    def set_name(self, txt):
        self._name = txt

    @staticmethod
    def from_dict(dicti=dict()):

        """"Convert  a Python dict() in a Grading()."""
        role = Role()
        role.set_id(dicti["id"])
        role.set_name(dicti["name"])
        return role
