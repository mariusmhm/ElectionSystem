from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject
from server.Role import Role

class User(NamedBusinessObject):

    # Realization of an User Class
    def __init__(self):
        super().__init__()
        self._user_firstname = ""
        self._mail = ""
        self._role = ""

    def set_firstname(self, user_firstname):
        #Set the first name of an User
        self._user_firstname = user_firstname

    def get_firstname(self):
        #Get the first name of an User
        return self._user_firstname

    def set_mail(self, mail):
        #Set the email name of an User
        self._mail = mail

    def get_mail(self):
        #Get the email of an User
        return self._mail

    def set_role(self, role):
        #Set the role of an User
        self._role = Role.role[role]

    def get_role(self):
        #Get the role of an User
        return self._role

  
    @staticmethod
    def to_dict(dicti=dict()):

        """Convert a Python dict() in a User()."""

        user = User()
        user.set_id(dicti["id"])
        user.set_name(dicti["name"])
        user.set_mail(dicti["mail"])
        user.set_role(dicti["role"])
        return user






