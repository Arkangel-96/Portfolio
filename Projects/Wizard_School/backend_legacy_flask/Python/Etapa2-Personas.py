class Personas:
    personas=[]
     
    def constructor(self, email, nombre,edad):
        self.email == email
        self.nombre == nombre
        self.edad == edad
        #----------------------CONSULTAR PRODUCTO--------------------
    def consultar_persona(self, email):
        for persona in self.personas:
            if persona['email'] == email:
                return persona
    #----------------------AGREGAR PERSONA-----------------------
    def agregar_persona (self, email, nombre, edad):
        if self.consultar_persona(email):
            return False
            
        nueva_persona={
            'email': email,
            'nombre': nombre,
            'edad': edad
        }
        print("persona agregada exitosamente")
        self.personas.append(nueva_persona)
        return True
    #----------------------MODIFICAR PERSONA-----------------------
    def modeificar_persona (self, email, nombre, edad):
        for persona in self.personas: 
            if persona['email'] == email:
                'nombre' == nombre
                'edad' == edad
                return True
        return False    
    #----------------------ELIMINAR PERSONA------------------------        
    def eliminar_persona(self, email):
        for persona in self.personas :
            if persona['email'] == email:
                self.personas.remove(persona)
                return True
        return False
    #----------------------LISTAR PERSONAS ------------------------
    def listar_personas(self):
        print('-' * 50)
        for persona in self.personas:
            print (f"nombre....:{persona['nombre']}")
            print (f"email.....:{persona['email']}")
            print (f"edad......:{persona['edad']}")
            print ('-' * 50)
        
        
#--------------------------------------------------------------
#                   PROGRAMA PRINCIPAL 
#--------------------------------------------------------------
usuarios = Personas()

usuarios.agregar_persona('danna@ejemplo', 'Danna', 25)
usuarios.agregar_persona('nico@ejemplo', 'Nico', 30)
usuarios.agregar_persona('jaz@ejemplo', 'Jazmin', 31)

print ("Listar personas: ")
usuarios.listar_personas()


# print("-" * 50)
# print ("Mostrar producto: ")
# Personas.consultar_persona('nico@ejemplo')
# Personas.eliminar_persona('nico@ejemplo')
# print("-" * 50)
# print ("Listar personas: ")
# Personas.listar_personas    