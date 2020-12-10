import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class Mapper (AbstractContextManager, ABC):

    def __init__(self):
        self._connection = None

    def __enter__(self):
        self._connection = connector.connect(user='web357_35', password='XfJbuWNoVCpdnx5l', host='s217.goserver.host', database='web357_db35')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._connection.close()

  

    