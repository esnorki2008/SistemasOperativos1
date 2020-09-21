from flask_restful import Api,Resource,reqparse,abort,request
from pymongo import MongoClient
class Mongo(Resource):
    mydb = None
    client = None
    def __init__(self):
        try:
            self.client = MongoClient('localhost',27017)
            self.mydb = self.client['mongo_mensajes']
        except:
            print("No Se Pudo Inicializar La Base De Datos")
            

    #def get(self,name):
    #    return {"data:":name}
    
    #for post in mydb.mytable.find({"author": "Adja"}):
        #mydb.mytable.find({"author": "Adja"}).count()
        #mydb.mytable.count()
        #for post in mydb.mytable.find({"date": {"$lt": datetime.datetime(2015, 12, 1)}}).sort("author"):
        #    post
        
    
    def get(self):
        try:
            todo = {}
            key1="usuario"
            key2="mensaje"
            consul = self.mydb.mytable.find()
            conta = 0
            for post in consul:
                conta=conta+1
                todo[conta]={key1:post.get(key1),key2:post.get(key2)}
            return todo   
        except:
            print("Error Con La Consulta")
            return "No Se Pudo Realizar Consulta",409    

    #def put(self):
    #    ip =request.args.get('mensaje', None)
    #    if ip is None:
    #        print("Mensaje Nulo")
    #        return "No Se Detecto El Mensaje Enviado",409
    #    return {"data:":"Post"}
     
    def post(self):
        try:
            mensaje =request.args.get('mensaje', None)
            userre =request.args.get('usuario', None)
            if mensaje is None:
                print("Mensaje Nulo")
                return "No Se Detecto El Mensaje Enviado",409
            if userre is None:
                print("Usuario Nulo")
                return "No Se Detecto El Usuario A Enviar",409
            print(userre,mensaje)
            #return 'Se Cargo Dato Exitosamente',200
            myrecord = {"usuario":userre,"mensaje":mensaje}
            #record_id = 
            self.mydb.mytable.insert(myrecord)
            #print record_id
            #print self.mydb.collection_names()
            print("Dato Cargado")
            return 'Se Cargo Dato Exitosamente',200
        except:
            print("Error Conexion Base")
            return "No Se Pudo Insertar En La Base De Datos",409
            

    def delete(self):
        pass
    
