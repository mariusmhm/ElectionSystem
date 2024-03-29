from server.bo.Module import Module
from server.db.Mapper import Mapper


class ModuleMapper (Mapper):

    def __init__(self):
        super().__init__()
        """Mapper class, that maps the module objects on relational
        Database. To do this, a number of methods are available
        which help to search, create, modify and
        delete objects. The mapping is bidirectional. Objects
        can be converted into DB structures and DB structures into objects."""

    def find_all(self):
         """Reads out all modules.
        :return A collection of module objects that represent all modules.
        """

         res = []
         crs = self._connection.cursor()

         crs.execute("SELECT * FROM Module")
         tupsrc = crs.fetchall()

         for (id, creation_date, name, edv_number) in tupsrc:
            module = Module()
            module.set_id(id)
            module.set_date(creation_date)
            module.set_name(name)
            module.set_edv_number(edv_number)
            res.append(module)

         self._connection.commit()
         crs.close()

         return res

    def find_by_id(self, id):
        """Reads out the module based on their id.
        : param module_id of the associated module.
        : return a module object with the id number."""

        res = None
        cursor = self._connection.cursor()
        command = "SELECT * FROM Module WHERE id={}".format(id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, name, edv_number) = tuples[0]
            module = Module()
            module.set_id(id)
            module.set_date(creation_date)
            module.set_name(name)
            module.set_edv_number(edv_number)
            res = module

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
            does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            res = None

        self._connection.commit()
        cursor.close()
        return res


    def find_by_name(self, name):
        """Reads out all modules based on their name.
        : param name of the associated module.
        : return A collection of modules objects
            with the desired name."""
        result = []
        crs = self._connection.cursor()

        crs.execute("SELECT * FROM Module WHERE name LIKE '{}' ORDER BY name".format(name))
        tuples = crs.fetchall()

        for(id, creation_date, name, edv_number) in tuples:
            module = Module()
            module.set_id(id)
            module.set_date(creation_date)
            module.set_name(name)
            module.set_edv_number(edv_number)
            result.append(module)

        self._connection.commit()
        crs.close()

        return result

    def find_by_edv_number(self,edv_number):
        """Reads out all modules based on the assigned edv numbers.
        : param edv_number of the associated module.
        : return the module object that contain the desired edv number."""

        result = None
        cursor = self._connection.cursor()
        command = "SELECT * FROM Module WHERE edv_number={}".format(edv_number)
        cursor.execute(command)
        tuples = cursor.fetchall()
        
        try:
            (id, creation_date, name, edv_number)= tuples[0]
            module = Module()
            module.set_id(id)
            module.set_date(creation_date)
            module.set_name(name)
            module.set_edv_number(edv_number)
            res = module
            
        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
            does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
        result = None

        self._connection.commit()
        cursor.close()

        return result
    
    def insert(self, module):
        """Insertion of a module object into the database.

        The primary key of the transferred object is also checked and if necessary
        corrected.

        : param module, the object to be saved
        : return the object that has already been transferred, but with a possibly corrected ID.
        """

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Module ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                module.set_id(maxid[0] + 1)
            else:
                module.set_id(1)

        command = "INSERT INTO Module (id, creation_date, name, edv_number) VALUES (%s, %s, %s, %s)"
        data = (module.get_id(), module.get_date(), module.get_name(), module.get_edv_number())
        cursor.execute(command,data)
        self._connection.commit()
        cursor.close()

        return module
    
    def delete(self, module):
        """Deleting the data of a module object from the database.
        : param module the "object" to be deleted from the DB"""
        
        crs = self._connection.cursor()
        crs.execute("DELETE FROM Module WHERE id={}".format(module.get_id()))

        self._connection.commit()
        crs.close()


    def update(self, module):
        """Updates an module object in the database.
        : param module the object that is to be written to the DB"""
        cursor = self._connection.cursor()
        cmd = "SET (id=%s, creation_date=%s, name=%, edv_number=%s) WHERE id=%s"
        data = (module.get_id(), module.get_date(), module.get_name(), module.get_edv_number())
        cursor.execute("UPDATE Module ", cmd, data)

        self._connection.commit()
        cursor.close()
         


