from server.bo.BusinessObject import BusinessObject


class Participation(BusinessObject):

    def __init__(self):
        super().__init__()
        self._priority =[]

    def get_priority(self):
        """Reads out the priority."""
        return self._priority

    def set_priority(self, priority):
        """Sets the priority."""
        self._priority = priority

    def __str__(self):

        """Creats a simple textually Representation of a Participation() instanz."""
  

        return "Project:  {}, {}, ".format(self.get_id(),self.get_priority(),)


    @staticmethod
    def to_dict(dicti=dict()):
        """"Convert  a Python dict() in a Participation()."""
        participation = Participation()
        participation.set_id(dicti["id"])
        participation.set_priority(dicti["participation_priority"])
        return participation



