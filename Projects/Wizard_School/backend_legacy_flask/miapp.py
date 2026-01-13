#----------------IMPORTS------------------
#Instalar con pip install Flask
from flask import Flask, request, jsonify
#Instalar con pip install -U flask-cors
from flask_cors import CORS
#from flask_cors import cross_origin
#Instalar con pip install mysql
import mysql.connector
import mysql.connector.errorcode
from werkzeug.utils import secure_filename

import os
import time
import flask_app as bd
#------------------APP-----------------------
app =Flask(__name__)
CORS(app)

#--------------CREACION DE LA CLASE-----------
class Personas:
    def __init__(self, host, user, password, database):
        self.connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.connection.cursor()
        #Seleccion/creacion de base de datos
        try:
            self.cursor.execute(f"USE {database}")
            self.connection.database = database
        except mysql.connector.Error as fallo:
            #Creamos la base de datos
            if fallo.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.connection.database = database
            else:
                raise fallo
        self.cursor.execute('''
                    CREATE TABLE IF NOT EXISTS personas (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        email VARCHAR(255),
                        nombre VARCHAR(50) NOT NULL,
                        edad INT NOT NULL,
                        imagen_url VARCHAR(255)
                    )
                ''')
        self.connection.commit
        #Se cierra el cursos y se abre una nuevo como diccionario
        self.cursor.close()
        self.cursor = self.connection.cursor(dictionary=True)
        # --------------------AGREGAR PERSONA-------------------------
    def agregar_persona(self, email, nombre, edad, imagen):
        ruta_imagen = imagen.filename
        sql = """INSERT INTO personas (email, nombre, edad, imagen_url) VALUES (%s,%s,%s,%s)"""
        valores = (email, nombre, edad, ruta_imagen)
        self.cursor.execute(sql, valores)
        self.connection.commit()
        return self.cursor.lastrowid
    # -------------------CONSULTAR PERSONA------------------------
    def consultar_persona (self, email):
        self.cursor.execute(f" SELECT * FROM personas WHERE email='{email}'")
        return self.cursor.fetchone()
    # -------------------ELIMINAR PERSONA-------------------------
    def eliminar_persona (self, id):
        self.cursor.execute(f"DELETE FROM personas WHERE id='{id}'")
        self.connection.commit()
        return self.cursor.rowcount > 0
    # -------------------MODIFICAR PERSONA------------------------
    def modificar_persona(self, email, new_nombre, new_edad, new_imagen):
        #ruta_imagen = new_imagen.filename
        sql = "UPDATE personas SET nombre = %s,edad = %s, imagen_url = %s WHERE email = %s"
        valores = (new_nombre, new_edad, new_imagen, email)
        self.cursor.execute(sql,valores)
        self.connection.commit()
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
    def listar_personas(self):
        self.cursor.execute(f'SELECT * FROM personas')
        filas = self.cursor.fetchall()
        print(filas)  
        return filas

#-------------------------------------------------------------------
#                       PROGRAMA PRINCIPAL 
# ------------------------------------------------------------------
personas = Personas(host='localhost', user='root', password='', database ='miapp')

# Carpeta para guardado de imagenes
ruta_destino= './HTMLS/Img'
#ruta_destino='/home/angelniz/mysite/static/'
@app.route("/personas", methods=["GET"])
def listar_personas():
    persona = personas.listar_personas()
    return jsonify(persona)

@app.route('/personas/<string:email>', methods=["GET"])
def mostrar_persona(email):
    persona = personas.consultar_persona(email)
    if persona:
        return jsonify(persona)
    else:
        return "producto no encontrado", 404
    
#Agregamos metodo POST y creamos un formulario

@app.route("/personas", methods=["POST"])
def agregar_persona():
    
    email = request.form.get('email')
    nombre = request.form.get('nombre')
    edad = request.form.get('edad')
    imagen = request.files.get('imagen')
    nombre_imagen = ''
    
    #Generamos el nombre de la imagen
    nombre_imagen = secure_filename(imagen.filename) #nombre.jpg
    nombre_base, extencion = os.path.split(nombre_imagen) #nombre   .jpg (separa el nombre del tipo de archivo)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extencion}" # nombre_tiempo.jpg
    
    new_id = personas.agregar_persona(email,nombre,edad,imagen)
    if new_id:
        imagen.save(os.path.join(ruta_destino, nombre_imagen))
        return jsonify({"mensaje":"Persona Agregada Correctamente.", "id": new_id, "Imagen": nombre_imagen})
    else:
        return jsonify({"mensaje":"Error al agregar producto" }), 500

@app.route("/personas/<string:email>", methods=["PUT"])# El metodo PUT lo utilizamos para modificar
def modificar_persona(email):
    #Se recuperan los nuevos datos del formulario
    new_email= request.form.get("email")
    new_nombre= request.form.get("nombre")
    new_edad= request.form.get("edad")
    
    #Verificar si proporsiono una nueva imagen
    if 'imagen' in request.files:
        imagen = request.files['imagen']
        #Procesamos la imagen
        nombre_imagen = secure_filename(imagen.filename) #nombre.jpg
        nombre_base, extencion = os.path.split(nombre_imagen) #nombre   .jpg (separa el nombre del tipo de archivo)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extencion}" # nombre_tiempo.jpg     
        
        imagen.save(os.path.join(ruta_destino, nombre_imagen))
       
        persona = personas.consultar_persona(email)
        if persona:# Si la persona existe
            imagen_vieja= persona['imagen_url']
            #Armado de la ruta de la imagen
            ruta_imagen = os.path.join(ruta_destino, imagen_vieja)  
            
            # Y si la imagen exite la borro
            if os.path.exists(ruta_imagen):
                os.remove(ruta_imagen)        
    else:
        persona= personas.consultar_persona(email)
        if persona:
            nombre_imagen = persona['imagen_url'] 
    #Llamamos a modificar producto                     
    if personas.modificar_persona(new_email, new_nombre, new_edad, nombre_imagen):
        return jsonify({"mensaje": "Persona modificada"}), 200
    else:
        return jsonify({"mensaje": "producto no encontrado"}), 403

@app.route("/personas/<int:id>", methods=["DELETE"])
def eliminar_persona(id):
    #Bucamos la informacion del producto
    persona = personas.eliminar_persona(id)
    if persona:
        ruta_imagen = os.path.join(ruta_destino, personas['imagen_url'])
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)
            
        #Elimiar la persona del catalogo
        if personas.eliminar_persona(id):
            return jsonify({"mensaje": "Persona eliminada"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar persona"}),500
    else:
        return jsonify({"mensaje":"Persona no encontrada"}), 404

if __name__=="__main__":
    app.run(debug=True)
