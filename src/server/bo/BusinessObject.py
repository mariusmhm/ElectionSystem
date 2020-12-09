from abc import ABC

class BusinessObject(ABC):

    def __init__(self):
        self.__id = 0

    def get_id(self):
        return self.__id

    def set_id(self, val):
        self.__id = val
