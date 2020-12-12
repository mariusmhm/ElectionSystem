from server.bo import BusinessObject as bo

class Automat(bo.BusinessObject):

    def __init__(self):
        self.__curr_state = 0

    def get_curr_state(self):
        """Reads out the state"""
        return self.__curr_state

    def set_curr_state(self, state):
        """Sets the state"""
        self.__curr_state = state

 @staticmethod
    def to_dict(dicti=dict()):
        #Convert  a Python dict() in an Automat().#
        automat = Automat()
        automat.set_curr_state(dicti["State"])

        return automat