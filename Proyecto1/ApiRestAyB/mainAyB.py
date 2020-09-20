from flask import Flask
from flask_restful import Api,Resource,reqparse,abort
from rutas.modulos import Modulos
from rutas.mongo import Mongo



app = Flask(__name__)
api = Api(app)




api.add_resource(Mongo,"/mongo")
api.add_resource(Modulos,"/mod")

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')
