from server.bo.BusinessObject import BusinessObject


class NamedBusinessObject(BusinessObject):

    def __init__(self):
        super().__init__()
        self.__name = ""

    def set_name(self, name):
        self.__name = name

    def get_name(self):
        return self.__name