#'/home/pc/Downloads/bt.css'
#'/home/pc/Music/texto.txt'
#"192.168.1.10"
import requests 
import json
import random
class Consola():
    def Ejecutar(self):
        self.lista_usr=['Liam','Olivia',
                        'Noah','Emma',
                        'Oliver','Ava',
                        'William','Sophia',
                        'Elijah','Isabella',
                        'James','Charlotte',
                        'Benjamin','Amelia',
                        'Lucas','Mia',
                        'Mason','Harper',
                        'Ethan','Evelyn'
        ]
        self.cadena=None
        self.ip=None
        while True:
            print("Aplicacion De Escritorio")
            print("1) Ingresar Ruta Archivo")
            print("2) Ingresar ip ")
            print("3) Ver Datos ")
            print("4) Enviar Datos ")
            print("5) Salir ")
            
            entrada = input("Ingresar Opcion \n")
            if entrada == 1:
                self.Uno()
            elif entrada == 2:
                self.Dos()
            elif entrada == 3:
                self.Tres()
            elif entrada == 4:
                self.Cuatro()
            elif entrada == 5:
                self.Cinco()
            

    def Uno(self):
        entrada = input("Ingresar Ruta Del Archivo")
        try:
            archivo = open(entrada,"r") 
            self.cadena =archivo.read()
            print("Archivo Cargado A Memoria")
        except:
            print("Error Ruta Incorrecta")
    
    def Dos(self):
        entrada = input("Ingresar Direccion ip \n")
        self.ip = entrada

    def Tres(self):
        print(self.cadena)
        print("\n")
        
    def Cuatro(self):
        try:
            puerto = ":5050"
            
            if self.ip is None:
                print("No Se Ingreso Una ip")
                return 
            if self.cadena is None or self.cadena =="":
                print("No Se Ingreso Un Mensaje Para Enviar")
                return 
            linea = self.cadena.split("\n")
            for msg in linea:
                usuario = random.choice(self.lista_usr)
                if msg != "":
                    jison ={"usuario":usuario,'mensaje':msg}
                    response = requests.post("http://"+self.ip+puerto+"/server",
                    params=jison)
                    print(response.json())

            print("---------------------TERMINADO---------------------------")
            input("")
        except :
            print("Error De Conexion Con El Servidor")    
    def Cinco(self):
        exit()




app = Consola()
app.Ejecutar()