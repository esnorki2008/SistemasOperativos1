from flask import Flask
from flask_restful import Api, Resource, reqparse, abort
from server import Server


app = Flask(__name__)
api = Api(app)


def leer_ip():
    try:
        archivo = open("/home/ip.txt", "r")
        cadena = archivo.read()
        cadena = cadena.split("\n")
        return cadena
    except:
        print("Error Leyendo Archivo Con Ips")
        return 0,0

lst_ip=leer_ip()

api.add_resource(Server, "/server")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int("5050"))
