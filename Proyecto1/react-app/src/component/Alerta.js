import React, { Component} from "react";
import Alert from 'react-bootstrap/Alert'
class Alerta extends Component {
    constructor(props) {
        super(props)
        this.state={nombre:props.NombreServidor}
    }

    
    render(){
        return (<h1>
            
            <div>
            <Alert variant="danger"  dismissible>
            <Alert.Heading>Error Conectando Al Servidor {this.state.nombre} </Alert.Heading>
            <p>
              Verificar La Ip Del Servidor {this.state.nombre}
            </p>
            </Alert>
            </div>
            
            </h1>)

    }
}

export default Alerta;
