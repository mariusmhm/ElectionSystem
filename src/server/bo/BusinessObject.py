from abc import ABC, abstractmethod

class BusinessObject(ABC):

    def __init__(self):
        self._id = 0

    def get_id(self):
        return self._id

    def set_id(self, val):
        self._id = val