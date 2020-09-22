import React, { Component } from "react";
import axios from "axios";
import { Card, ListGroup, Form } from "react-bootstrap"
import Alerta from "./Alerta";
class Tarjeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            ipA: props.ipA,
            ipB: props.ipB,
            error: 0
        }
    }

    render() {
        return (
            <div>
                {this.cargaCombo()}
                {this.GenerarCartas(this.state.lista)}
                {this.state.error === 0 ? null :
                    this.state.error === 1 ? <Alerta NombreServidor=" A" /> :
                        <Alerta NombreServidor=" B" />}
            </div>


        )
    }
    onChangeColor(event) {

        let ip_ = undefined
        if (event.target.value === 'Servidor A')
            ip_ = this.state.ipA
        else if (event.target.value === 'Servidor B')
            ip_ = this.state.ipB

        this.setState({ error: 0 })


        if (ip_ !== undefined) {
            axios.get("http://" + ip_ + ":5000/mongo")
                .then((response) => {
                    let actual = response.data[1];
                    let pos = 1;
                    let SubLista = []                                        
                    while (response.data[pos] !== undefined) {
                        actual = response.data[pos];
                        
                        SubLista[pos] = { id: pos, usuario: actual.usuario, mensaje: actual.mensaje }
                        this.setState({ lista: SubLista })
                        pos++;
                    }


                })
                .catch((error) => {
                    console.log(error)
                    if (ip_ === this.state.ipA) {
                        this.setState({ error: 1 })
                        this.setState({ lista: [] })
                    }
                    else {
                        this.setState({ error: 2 })
                        this.setState({ lista: [] })
                    }
                });
        }

    }
    cargaCombo = () => {
        return (
            <>
                <Form>

                    <Form.Group controlId="exampleForm.ControlSelect1">


                        <Form.Label>Servidor De Los Mensajes</Form.Label>
                        <Form.Control as="select" onChange={this.onChangeColor.bind(this)}>
                            <option>Defecto </option>
                            <option>Servidor A </option>
                            <option>Servidor B</option>
                        </Form.Control>

                    </Form.Group>

                </Form>
            </>
        );
    };
    GenerarCartas(Lista) {
        const renderCard = (card) => {
            return (
                <Card style={{ width: '100%', aspectRatio: 1 }} key={card.id}>
                    <Card.Header>{card.usuario}</Card.Header>
                    <ListGroup variant="flush" >
                        <ListGroup.Item >{card.mensaje}</ListGroup.Item>
                    </ListGroup>
                </Card>

            );
        };

        return <div className="grid">{Lista.map(renderCard)}</div>;
    }


}


export default Tarjeta;
