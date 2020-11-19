from server.bo.BusinessObject import BusinessObject
from server.bo.NamedBusinessObject import NamedBusinessObject

class User(NamedBusinessObject):

    def __init__(self):
        self.__user_id=0
        self.__email=""
        self.__password=""
        self.__role=Role


    def get_user_id(self):
        """Auslesen der UserId."""
        return self.__user_id

    def set_user_id(self, id):
        """Setzen der UserId."""
        self.__user_id=id

    def get_email(self):
        """Auslesen der Usermail."""
        return self.__email

    def set_email(self,email):
        """Setzen der Usermail."""
        self.__email=email

    def get_password(self):
        """Auslesen des Userpassworts."""
        return self.__password

    def set_password(self,password):
        """Setzen des Userpassworts."""
        self.__password=password

    def get_role(self):
        """Auslesen der Rolle."""
        return self.__role

    def set_role(self,role):
        """Setzen der Rolle."""
        self.__role=role

    def __str__(self):

        """Erzeugen einer einfachen textuellen Darstellung einer User Instanz.

        Hier werden UserId, UserMail, Userpasswort und Rolle des Users ausgegeben ."""

        return "Project:  {}, {}, {}, {}, ".format(self.get_id(),self.get_mail(), self.get_password(), self.get_role())

    @staticmethod
    def to_dict(dicti=dict()):

        """Umwandeln eines Python dict() in einen User()."""

        student = Student()
        student.set_id(dicti["UserID"])
        student.set_email(dicti["UserEmail"])
        student.set_password(dicti["UserPassword"])
        student.set_role(dicti["Role"])
        return user






