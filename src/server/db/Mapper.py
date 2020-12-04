import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class Mapper (AbstractContextManager, ABC):

    def __init__(self):
        self._connection = None

    def __enter__(self):

        if os.getenv('GAE_ENV', '').startswith('standard'):
            self._connection = connector.connect(user='hbi2apgzw5', password='y83hG8WssC3!Tud!', host='host237.checkdomain.de', database='uvltnvmc18')

        else:
            self._connection = connector.connect(user="root", password="12345678", host="127.0.0.1", database="electionsystem")
        
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._connection.close()

    @abstractmethod
    def find_all(self):
        pass

    @abstractmethod
    def find_by_id(self, id):
        pass

    @abstractmethod
    def insert(self, object):
        pass

    @abstractmethod
    def update(self, object):
        pass

    @abstractmethod
    def delete(self, object):
        pass

    