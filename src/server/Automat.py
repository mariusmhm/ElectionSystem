class Automat():

    def __init__(self):
        self._current_state_id = 0

    def get_state(self):
        return self._current_state_id

    def set_state(self, state_id):
        self._current_state_id = state_id

    def is_in_state(self, state_id):
        return state_id == self._current_state_id
