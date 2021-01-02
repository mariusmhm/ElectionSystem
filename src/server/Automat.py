from server.State import State


class Automat(State):

    def __init__(self, default_state):
        self._current_state = default_state

    def set_state(self, new_state):
        self._current_state = new_state

    def is_in_state(self, state):
        return state == self._current_state