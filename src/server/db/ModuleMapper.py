from server.bo.Module import Module
from server.db.Mapper import Mapper


class ModuleMapper (Mapper):

    def __init__(self):
        super().__init__()
        """Mapper class, that maps the module objects on relational
        Database. To do this, a number of methods are available
        with the help of which Objects can be searched, created, modified and
        deleted. The mapping is bidirectional. Objects
        can be converted into DB structures and DB structures into objects."""

    def find_all(self):
         """Reads out all modules.
              :return A collection of module objects that represent all modules."""

         res = []
         crs = self._connection.cursor()

         crs.execute("SELECT * FROM Module")
         tupsrc = crs.fetchall()

         for (module_id, module_creation_date, module_name, edv_number) in tupsrc:
            module = Module()
            module.set_id(module_id)
            module.set_creation_date(module_creation_date)
            module.set_name(module_name)
            module.set_edv_number(edv_number)
            res.append(module)

         self._connection.commit()
         crs.close()

         return res

    def find_by_id(self, module_id):
        """Read out the module based on their id.
        : param module_id of the associated module.
        : return a module object with the id number."""

        res = None
        cursor = self._connection.cursor()
        command = "SELECT module_id, creation_date, module_name edv_number FROM Module WHERE module_id={}".format(module_id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (module_id, module_creation_date, module_name, edv_number)= tuples[0]
            module = Module()
            module.set_id(module_id)
            module.set_creation_date(module_creation_date)
            module.set_name(module_name)
            module.set_edv_number(edv_number)
            res = module

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
            does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            res = None

        self._connection.commit()
        cursor.close()
        return res

    def find_by_name(self, module_name):
        """Read out all modules based on their name.
        : param module_name of the associated module.
        : return A collection of modules objects
            with the desired name."""
        result = []
        crs = self._connection.cursor()
        crs.execute("SELECT module_id, creation_date, module_name, edv_number"/
                    " FROM Module WHERE module_name LIKE '{}'"\
                    " ORDER BY module_name"
                    .format(module_name))

        tuples = crs.fetchall()

        try:
            (module_id, creation_date, module_name, edv_number) = tuples[0]
            module = Module()
            module.set_id(module_id)
            module.set_creation_date(creation_date)
            module.set_module_name(module_name)
            module.set_edv_number(edv_number)
            result = module

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
            does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            res = None

        self._connection.commit()
        crs.close()
        return res

    def find_by_edv_number(self,edv_number):
        """Read out all modules based on the assigned edv numbers.
        : param (edv_number) edv number of the associated module.
        : return the module object that contain
            the desired edv number."""

        result = None
        cursor = self._connection.cursor()
        command = "module_id, creation_date, module_name, edv_number FROM Module WHERE mail={}".format(edv_number)
        cursor.execute(command)
        tuples = cursor.fetchall()
        
        try:
            (module_id, module_creation_date, module_name, edv_number)= tuples[0]
            module = Module()
            module.set_id(module_id)
            module.set_creation_date(module_creation_date)
            module.set_name(module_name)
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
        
        crs = self._connection.cursor()
        crs.execute("SELECT MAX(id) AS maxid FROM Module")
        tuples = crs.fetchall()

        for (maxid) in tuples:
            module.set_id(maxid[0]+1)
            
            crs.execute("INSERT INTO Module(module_id, creation_date,module_name, edv_number) VALUES ('{}', '{}','{}','{}')"
                        .format(module.get_id(), module.get_creation_date(), module.get_name(), module.get_edv_number()))
            
        self._connection.commit()
        crs.close()

        return module
    
    def delete(self, module):
        """Deleting the data of a module object from the database.
        : param module the "object" to be deleted from the DB"""
        
        crs = self._connection.cursor()
        crs.execute("DELETE FROM Module WHERE module_id={}".format(module.get_id()))

        self._connection.commit()
        crs.close()
        
    def update(self, module):
         """Repeated writing of an module object to the database.
            : param module the object to be written into the DB"""
         
         cursor = self._connection.cursor()

         command = "UPDATE module " + "SET creation_date=%s, module_id=%s, " \
                                       "module_name, edv_number" \
                                       "WHERE module_id=%s"
         data = (module.get_creation_date(), module.get_module_name(),module.get_id(), module.get_edv_number())
         cursor.execute(command, data)
         


