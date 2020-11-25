from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject


class Module(NamedBusinessObject):
    def __init__self(self):
        super().__init__()
        self._edv_number=""

    def set_edv_number(self,edv_number):
        self._edv_number=edv_number

    def get_edv_number(self):
        return self._edv_number



