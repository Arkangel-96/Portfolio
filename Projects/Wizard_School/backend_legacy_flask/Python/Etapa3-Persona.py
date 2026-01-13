import mysql.connector

class Personas:
    def __init__(self, host, user, password, database):
        self.connexion = mysql.connector.connect(
            host=host,
            user= user,
            password=password,
            database=database
        )
        self.cursor = self.connexion.cursor(dictionary=True)  # Devuelve los resultados como diccionarios
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS personas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL,
                edad INT NOT NULL,
                imagen_url VARCHAR(255)
            )
        ''')
        self.connexion.commit()
    # --------------------AGREGAR PERSONA-------------------------
    def agregar_persona(self, email, nombre, edad, imagen):
        sql = "INSERT INTO personas (email, nombre, edad, imagen_url) VALUES (%s,%s,%s,%s)"
        valores = (email, nombre, edad, imagen)
        
        self.cursor.execute(sql, valores)
        self.connexion.commit()
        return self.cursor.lastrowid
    # -------------------CONSULTAR PERSONA------------------------
    def consultar_persona (self, email):
        self.cursor.execute(f" SELECT * FROM personas WHERE email='{email}'")
        return self.cursor.fetchone()
    # -------------------ELIMINAR PERSONA-------------------------
    def eliminar_persona (self, email):
        self.cursor.execute(f"DELETE FROM personas WHERE email = '{email}'")
        self.connexion.commit()
        return self.cursor.rowcount > 0
    # -------------------MODIFICAR PERSONA------------------------
    def modificar_persona(self, email, new_nombre, new_edad, new_imagen):
        sql = "UPDATE personas SET nombre = %s,edad = %s, imagen_url = %s WHERE email = %s"
        valores = (new_nombre,new_edad, new_imagen, email)
        self.cursor.execute(sql,valores)
        self.connexion.commit()
    # --------------------MOSTRAR PERSONA-------------------------
    def mostrar_persona(self, email):
        persona = self.consultar_persona(email)
        if persona:
            print("-" * 40)
            print(f"{persona ['imagen_url']}")
            print(f"id..........:{persona ['id']}")
            print(f"Nombres.....:{persona ['nombre']}")
            print(f"Email.......:{persona ['email']}")
            print(f"Edad........:{persona ['edad']}")   
    # -------------------CONSULTAR PERSONAS------------------------
    def listar_persona (self):
        self.cursor.execute('SELECT * FROM personas')
        filas = self.cursor.fetchall()
        print(filas)   
#-------------------------------------------------------------------
#                       PROGRAMA PRINCIPAL 
# ------------------------------------------------------------------
personas = Personas(host='localhost', user='root', password='', database ='miapp')

"""personas.agregar_persona('dario@ejemplo', 'Litterio Dario', 35, '')
personas.agregar_persona('danna@ejemplo', 'Kuzmicki Danna', 27, '')
personas.agregar_persona('nico@ejemplo', 'Chauque Nicolas', 30, '')   
"""

#email= str(input("Ingrese el email de la persona: "))

"""persona = personas.consultar_persona(email)
if persona:
    print(f"Nombre: {persona['nombre']}")
    print(f"Email: {persona['email']}")
    print(f"Edad: {persona['edad']}")
    print(f"Imagen: {persona['imagen_url']}") 
else:
    print(f'Persona {email} no se encuentra registrado.')"""

""" email= input("Ingrese un email para MODIFICAR persona: ")
new_nombre= str(input("Ingrese un nuevo nombre: "))
new_edad= int(input("Ingrese una nueva edad: "))
new_imagen= 'Hogwarts.jpg'
personas.modificar_persona(email, new_nombre ,new_edad, new_imagen)
personas.mostrar_persona(email,) """

""" email= input("Ingrese un email para ELIMINAR persona: ")
personas.eliminar_persona(email)

email= input("Ingrese un email para CONSULTAR persona: ")
persona = personas.consultar_persona(email)
if persona:
    print(f"Nombre: {persona['nombre']}")
    print(f"Email: {persona['email']}")
    print(f"Edad: {persona['edad']}")
    print(f"Imagen: {persona['imagen_url']}") 
else: 
print(f'Persona {email} no se encuentra registrado.')"""
personas.listar_persona()




