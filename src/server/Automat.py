from server.State import State

"""Vorläufiger Test-Automat"""

class Automat (State):
    def __init__(self):
        self.__current_state=State()

    def get_current_state(self):
        return self.__current_state

    def set_current_state(self,state):
        self.__current_state=state
