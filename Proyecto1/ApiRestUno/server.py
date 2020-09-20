from flask_restful import Api,Resource,reqparse,abort,request
from pymongo import MongoClient
import requests 
class Server(Resource):
    def __init__(self):
        self.ip=None
    
    def get(self):
        pass

    def put(self):
        mensaje =request.args.get('ip', None)
        if mensaje is None:
            return "No Se Detecto La Direccion Ip",409
                
    def post(self):
        try:
            print(request.args)
            mensaje =request.args.get('mensaje', None)
            userre =request.args.get('usuario', None)
            if mensaje is None:
                return "No Se Detecto El Mensaje Enviado",409
            if userre is None:
                return "No Se Detecto El Usuario A Enviar",409
            print(userre,mensaje)
            jison = {"usuario":userre,"mensaje":mensaje}
            estado=self.Enviar(jison)
            return estado,200
        except:
            return "No Se Pudo Enviar Al Servido AoB",409

    def Enviar(self,jison):
        try:
            puerto = ":5000"
            self.ip = '192.168.1.10'
            response = requests.post("http://"+self.ip+puerto+"/mongo",
            params=jison)
            return response.json()
        except :
            print("Error De Conexion Con El Servidor AoB")
            return "Error De Conexion Con El Servidor AoB"