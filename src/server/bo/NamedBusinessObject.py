from server.bo.BusinessObject import BusinessObject


class NamedBusinessObject(BusinessObject):

    def __init__(self):
        super().__init__()
        self._name = ""

    def set_name(self, name):
        self._name = name

    def get_name(self):
        return self._name
