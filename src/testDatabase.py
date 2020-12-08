import mysql.connector
from mysql.connector import Error


#Test if connection with database table: project was successfully
try:
    connection = mysql.connector.connect(user='web357_35', password='XfJbuWNoVCpdnx5l', host='s217.goserver.host', database='web357_db35')

    sql_select_Query = "select * from projects"
    cursor = connection.cursor()
    cursor.execute(sql_select_Query)
    records = cursor.fetchall()
    print("Total number of rows in projects is: ", cursor.rowcount)

    print("\nPrinting each project record")
    for row in records:
        print("Id = ", row[0], )
        print("Name = ", row[1])
        print("Description  = ", row[2])

except Error as e:
    print("Error reading data from MySQL table", e)
finally:
    if (connection.is_connected()):
        connection.close()
        cursor.close()
        print("MySQL connection is closed")