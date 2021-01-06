from abc import ABC, abstractmethod
from datetime import date

class BusinessObject(ABC):

    def __init__(self):
        self.__id = 0

    def get_id(self):
        return self.__id

    def set_id(self, val):
        self.__id = val

    def get_date(self):
        return self._creation_date

    def set_date(self, creation_date):
        creation_date = date.today()
        self._creation_date = creation_date