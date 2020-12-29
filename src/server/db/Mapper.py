import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class Mapper (AbstractContextManager, ABC):

    def __init__(self):
        self._connection = None

    def __enter__(self):

        self._connection = connector.connect(user='root', password='7891', host='localhost',
                                             database='electionsystem')


        """ if os.getenv('GAE_ENV', '').startswith('standard'):
            self._connection = connector.connect(user='web357_35', password='XfJbuWNoVCpdnx5l', host='s217.goserver.host', database='web357_db35')
            
        else: """
        #self._connection = connector.connect(user="root", password="12345678", host="127.0.0.1", database="electionsystem")
        #self._connection = connector.connect(user='web357_35', password='XfJbuWNoVCpdnx5l', host='s217.goserver.host', database='web357_db35')

        return self

    """self._connection = connector.connect(user='web357_35', password='XfJbuWNoVCpdnx5l',
            host='s217.goserver.host', database='web357_db35') return self"""

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._connection.close()

    @abstractmethod
    def find_all(self):
        pass