class State():


    def __init__(self, state="new"):
        self._state = state

    def get_state(self):
        return self._state

    def set_state(self, state):
        self._state = state

    def __eq__(self, change):
        if isinstance(change, State):
            return self._state == change._state
        else:
            return False



