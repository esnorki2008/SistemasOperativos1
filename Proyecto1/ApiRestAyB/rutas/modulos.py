from flask_restful import Api,Resource,reqparse,abort

class Modulos(Resource):
    def mod_cpu(self):
        try:
            archivo = open("/proc/mod_cpu","r") 
            cadena =archivo.read()
            cadena = cadena.replace("\n", "")
            flotante = float(cadena)
            return flotante
        except:
            print("Error Leyendo Modulo_CPU")
            return 0
    
    def mod_ram(self):
        try:
            archivo = open("/proc/mod_ram","r") 
            cadena =archivo.read()
            cadena = cadena.replace("\n", "")
            return float(cadena)
        except:
            print("Error Leyendo Modulo_RAM")
            return 0

    def get(self):
        return {"cpu":self.mod_cpu(),"ram":self.mod_ram(),}