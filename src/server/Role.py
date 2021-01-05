class Role():

    def __init__(self):
        self._role = ""   

    def set_role(self, txt):
        #Set the role of an User
        self._role = txt

    def get_role(self):
        #Get the role of an User
        return self._role
