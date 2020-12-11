from abc import ABC, abstractmethod
from datetime import date


class BusinessObject(ABC):

    def __init__(self):
        self._id = 0
        self._creation_date = date

    def get_id(self):
        return self._id

    def set_id(self, id):
        self._id = id

    def set_creation_date(self,creation_date):
        creation_date=date.today()
        self._creation_date=creation_date

    def get_creation_date(self):
        return self._creation_date

