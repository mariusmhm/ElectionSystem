class Automat():

    def __init__(self):
        self._state = ""

    def get_state(self):
        return self._state

    def set_state(self, txt):
        self._state = txt
