from abc import ABC, abstractmethod
from datetime import date

class BusinessObject(ABC):

    def __init__(self):
        self._id = 0
        self._creation_date = ''

    def get_id(self):
        # get id of an business Object
        return self._id

    def set_id(self, val):
        # set id of an business Object
        self._id = val

    def get_date(self):
        # get date of an business Object
        return self._creation_date

    def set_date(self, creation_date):
        # set the creation date of an business Object
        self._creation_date = creation_date
