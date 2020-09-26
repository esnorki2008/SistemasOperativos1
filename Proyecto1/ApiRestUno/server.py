from flask_restful import Api,Resource,reqparse,abort,request
from pymongo import MongoClient
import requests 
class Server(Resource):
    def __init__(self):
        from main import lst_ip
        self.ip=lst_ip
    
    def get(self):
        return "oki",200    

    def put(self):
        mensaje =request.args.get('ip', None)
        if mensaje is None:
            return "No Se Detecto La Direccion Ip",409
                
    def post(self):
        try:
            mensaje =request.args.get('mensaje', None)
            userre =request.args.get('usuario', None)
            if mensaje is None:
                return "No Se Detecto El Mensaje Enviado",409
            if userre is None:
                return "No Se Detecto El Usuario A Enviar",409
            jison = {"usuario":userre,"mensaje":mensaje}   
            
            index = self.DecidirPcMensajes()
            print(index)
            if index == -1:
                index = self.DecidirPcRecursos()
            if index == -1:
                return "No Se Pudo Decidir La Computadora Para El Mensaje",409
            print("EnviandoServidor "+str(index))
            estado=self.Enviar(jison,self.ip[index])
            return estado,200
        except:
            return "No Se Pudo Enviar Al Servido AoB",409

    def DecidirPcMensajes(self):
        Pc0=self.Contar(self.ip[0])
        Pc1=self.Contar(self.ip[1])
        
        if Pc0 is None and Pc1 is not None:
            return 1
        elif Pc1 is None and Pc0 is not None:
            return 0
        elif Pc1 is None and Pc0 is None:
            return -1
        
        if Pc0 > Pc1:
            return 1
        elif Pc1 > Pc0:
            return 0
        else:
            return -1

    def DecidirPcRecursos(self):
        Pc0=self.Uso(self.ip[0])
        Pc1=self.Uso(self.ip[1])
        if Pc0 is None and Pc1 is not None:
            return 1
        elif Pc1 is None and Pc0 is not None:
            return 0
        elif Pc1 is None and Pc0 is None:
            return -1

        if Pc0["ram"] > Pc1["ram"]:
            return 1
        elif Pc1["ram"] > Pc0["ram"]:
            return 0

        if (Pc0["cpu"] > Pc1["cpu"]):
            return 1
        else:
            return 0

    def Enviar(self,jison,ip_actual):
        try:
            puerto = ":5000"
            response = requests.post("http://"+ip_actual+puerto+"/mongo",
            params=jison)
            return response.json()
        except :
            print("Error De Conexion Con El Servidor AoB")
            return "Error De Conexion Con El Servidor AoB"

    def Contar(self,ip_actual):
        try:
            contador = 0
            puerto = ":5000"
            response = requests.get("http://"+ip_actual+puerto+"/mongo")
            for cada in response.json():
                contador=contador+1
            return contador
        except :
            print("Error De Conexion Con El Servidor AoB Consultando Tamanio")
            return None
    
    def Uso(self,ip_actual):
        try:
            puerto = ":5000"
            response = requests.get("http://"+ip_actual+puerto+"/mod")
            return(response.json())
        except :
            print("Error De Conexion Con El Servidor AoB Consultando CPU/RAM")
            return None