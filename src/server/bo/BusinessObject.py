from abc import ABC, abstractmethod
from Datetime import Date

class BusinessObject(ABC):

    def __init__(self):
        self.__id = 0
        self.__creation_date=Date

    def get_id(self):
        return self.__id

    def set_id(self, val):
        self.__id = val
        
    def set_creation_date(self, Date):
        self.__creation_date = Date
    
    def get_creation_date():
        return self.__creation_date
    
