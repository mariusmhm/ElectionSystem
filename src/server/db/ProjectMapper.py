from server.bo.Project import Project
from server.db.Mapper import Mapper

class ProjectMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT id, name, short_description from Projects")
        tuples = cursor.fetchall()

        for (id, name, project_description) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_short_description(project_description)
            result.append(project)

        self._connection.commit()
        cursor.close()

        return result

    def find_project_by_id(self,id):

        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, name, short_description FROM Projects WHERE id={}" \
                    .format(id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, project_description) = tuples[0]
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_short_description(project_description)
            result = project

        except IndexError:
            """The IndexError will occur above when accessing tuples [0] when the previous SELECT call
                       does not return tuples, but tuples = cursor.fetchall () returns an empty sequence."""
            result = None

        self._connection.commit()
        cursor.close()
        return result




