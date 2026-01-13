# Definimos una lista llamada "personas"
personas = []
# Definimos las variables del diccionario "persona"
email = str
nombre = str
edad = int
# Definimos las variables para modificar "persona"
newNombre= str
newEdad= int
#Creamos el diccionario "persona"
persona = {}

#--------------Funcion de consulta Persona ---------------------
def consultar_persona(email):
    for persona in personas:
        if persona['email'] == email:
            return persona
        else:
            return print("No se encontro el email")
    return False
#--------------Funcino para añadir una lista--------------------
def agregar_persona(email, nombre, edad ):
    if consultar_persona(email):
        return False
    
    nueva_persona={
        'email': email,
        'nomre': nombre,
        'edad' : edad
    }

    personas.append(nueva_persona)
    return True
#--------------Consultar Persona ----------------
def modificar_persona(email, newNombre, newEdad):
    for persona in personas:
        if email == 'email':
            persona['nombre']== newNombre
            persona['edad']== newEdad
            return True
        return False
#-------------Eliminar Persona ------------------
def eliminar_persona(email):
    for persona in personas:
        if persona ['email'] == email:
            personas.remove(persona)
        return True
    return False
#-------------Listar Personas -------------------
def listar_personas():
    print("-" * 50)
    for persona in personas:
        print(f"Email.........:{persona['email']}")
        print(f"Nombre........:{persona['nombre']}")
        print(f"Edad..........:{persona['edad']}")
        print("-" * 50)
#------------------------------------------------
# Programa Principal
# -----------------------------------------------
print("Ingrese un email:")
email =input()

consultar_persona(email)

print("Ingrese un nombre:")
nombre =input()
print("Ingrese su edad:")
edad =input()
agregar_persona(email, nombre,edad)

print(personas)