from abc import ABC
from datetime import date

class BusinessObject(ABC):

    def __init__(self):
        self._id = 0
        self._creation_date = date

    def get_id(self):
        return self._id

    def set_id(self, val):
        self._id = val

    def get_creation_date(self):
        return self._creation_date

    def set_creation_date(self, date):
        self._creation_date = date
