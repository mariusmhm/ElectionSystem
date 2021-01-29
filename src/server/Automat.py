class Automat():
    """The implementation of a exemplary automat class.
    """

    def __init__(self):
        self._current_state_id = 0

    def get_state(self):
        """Reads out the state."""
        return self._current_state_id

    def set_state(self, state_id):
        """Sets the state."""
        self._current_state_id = state_id

