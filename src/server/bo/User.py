from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject
from server.role import Role

class User(NamedBusinessObject):

    """Realization of an examplary Users.
    """

    def __init__(self):
        self.__user_id = 0
        self.__email = ""
        self.__password = ""
        self.__role = Role()


    def get_user_id(self):
        """Read out of the UserId."""
        return self.__user_id

    def set_user_id(self, id):
        """Set the UserId."""
        self.__user_id=id

    def get_email(self):
        """Read out of the Usermail."""
        return self.__email

    def set_email(self,email):
        """Set the Usermail."""
        self.__email=email

    def get_password(self):
        """Reade out of the Userpassworts."""
        return self.__password

    def set_password(self,password):
        """Set the Userpassworts."""
        self.__password=password

    def get_role(self):
        """Readout of the Rolle."""
        return self.__role

    def set_role(self,role):
        """Set the Rolle."""
        self.__role=role

    def __str__(self):

        """Creats a simple textually Representation of a User() instanz.

        The Attributes are UserId, UserMail, Userpasswort und Rolle."""

        return "Project:  {}, {}, {}, {}, ".format(self.get_id(),self.get_mail(), self.get_password(), self.get_role())

    @staticmethod
    def to_dict(dicti=dict()):

        """Convert a Python dict() in a User()."""

        student = Student()
        student.set_id(dicti["UserID"])
        student.set_email(dicti["UserEmail"])
        student.set_password(dicti["UserPassword"])
        student.set_role(dicti["Role"])
        return user






