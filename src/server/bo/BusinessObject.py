from abc import ABC, abstractmethod
from datetime import date

class BusinessObject(ABC):

    def __init__(self):
        self.__id = 0
        self.__creation_date = date

    def get_id(self):
        return self.__id

    def set_id(self, val):
        self.__id = val
        
    def set_creation_date(self, date):
        self.__creation_date = date
    
    def get_creation_date(self):
        return self.__creation_date
    
