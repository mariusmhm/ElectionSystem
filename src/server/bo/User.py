from server.bo.NamedBusinessObject import NamedBusinessObject
from server.Role import Role


class User(NamedBusinessObject):
    """The implementation of a exemplary user class.
    """
    
    def __init__(self):
        super().__init__()
        self._google_user_id = ""
        self._firstname = ""
        self._mail = ""
        self.role_id = 0

    def set_google_user_id(self, google_user_id):
        """set the google id of an user"""
        self._google_user_id = google_user_id


    def get_google_user_id(self):
        """set the google id of an user"""
        return self._google_user_id


    def set_firstname(self, firstname):
        """Set the first name of an User"""
        self._firstname = firstname


    def get_firstname(self):
        """Get the first name of an User"""
        return self._firstname


    def set_mail(self, mail):
        """Set the email name of an User"""
        self._mail = mail


    def get_mail(self):
        """Get the email of an User"""
        return self._mail

    def set_role_id(self, role):
        """Set the role of an User"""
        self._role_id = role


    def get_role_id(self):
        """Get the role of an User"""
        return self._role_id


  
    @staticmethod
    def to_dict(dicti=dict()):

        """Converts a Python dict() into a User()."""

        user = User()
        user.set_id(dicti["id"])
        user.set_name(dicti["name"])
        user.set_date(dicti["creation_date"])
        user.set_google_user_id(dicti["google_user_id"])
        user.set_firstname(dicti["firstname"])
        user.set_mail(dicti["mail"])
        user.set_role_id(dicti["role_id"])
        return user
