from server.bo.NamedBusinessObject import NamedBusinessObject
from server.Role import Role

class User(NamedBusinessObject):
    """Realization of an examplary Users.
    """
    def __init__(self):
        super().__init__()
        self.__google_user_id = ""
        self.__name= ""
        self.__email = ""
        self.__role = Role()

    def get_google_user(self):
        """Read out of the UserId."""
        return self.__google_user_id

    def set_google_user(self, id):
        """Set the UserId."""
        self.__google_user_id=id

    def set_name(self,name):
        self.__name=name

    def get_name(self):
        return self.__name

    def get_email(self):
        """Read out of the Usermail."""
        return self.__email

    def set_email(self,email):
        """Set the Usermail."""
        self.__email=email

    def get_role(self):
        """Readout of the Rolle."""
        return self.__role

    def set_role(self,role):
        """Set the Rolle."""
        self.__role=role

    def __str__(self):

        """Creats a simple textually Representation of a User() instanz.

        The Attributes are UserId, UserMail, Userpasswort und Rolle."""

        return "Project:  {}, {}, {}, {},{} ".format(self.get_id(),self.__google_user_id,self.__name, self.__email, self.__role,
                                                     self.get_creation_date())

    @staticmethod
    def to_dict(dicti=dict()):

        """Convert a Python dict() in a User()."""

        user = User()
        user.set_id(dicti["id"])
        user.set_google_user(dicti["google_user_id"])
        user.set_name(dicti["name"])
        user.set_email(dicti["email"])
        user.set_role(dicti["role"])
        user.set_creation_date(dicti["Date"])
        return user






