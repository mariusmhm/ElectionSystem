from server.bo.Module import Module
from server.db.Mapper import Mapper

class ModuleMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
       #find_all method finds every entry of class 'module'
       result=[]
       cursor = self._connection.cursor()
       cursor.execute("SELECT edv_number, name FROM Module")
       tuples = cursor.fetchall()

       for (edv_number, name) in tuples:
           module = Module()
           module.set_edv_number(edv_number)
           module.set_name(name)
           result.append(module)

        self._connection.commit()
        cursor.close()

        return result