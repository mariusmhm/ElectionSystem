from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject


class Module(NamedBusinessObject):
    def __init__self(self):
        super().__init__()
        self._edv_number=""
        self._name=""

    def set_edv_number(self,edv_number):
        self._edv_number=edv_number

    def get_edv_number(self):
        return self._edv_number

    def set_name(self,name):
        self._name=name

    def get_name(self):
        return self._name

    @staticmethod
    def to_dict(dicti=dict()):
        #Conversion 

        module = Module()
        module.set_edv_number(dicti["edv_number"])
        module.set_name(dicti["name"])

        return module