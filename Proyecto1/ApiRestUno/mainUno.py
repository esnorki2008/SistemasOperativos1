from flask import Flask
from flask_restful import Api,Resource,reqparse,abort
from server import Server


app = Flask(__name__)
api = Api(app)




api.add_resource(Server,"/server")

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=int("5050"))
