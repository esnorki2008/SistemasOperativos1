import React from "react";
///import "./Box.css";
import { Card, ListGroup } from "react-bootstrap"
const MoreDeets = () => {
    const cardInfo = [
        { usuario: "Labr", texto: "Soy SoySoySoySoySoySoySoySoySoySoySoySoySoySoySoySoySoy" },
        { usuario: "Labr", texto: "Soy SoySoySoySoySoySoySoySoySoySoySoySoySoySoySoySoySoy" },
        { usuario: "Labr", texto: "Soy SoySoySoySoySoySoySoySoySoySoySoySoySoySoySoySoySoy" },

    ]

    const renderCard = (card, index) => {
        return (





            <Card style={{ width: '100%', aspectRatio: 1 }}>
                <Card.Header>{card.usuario}</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>{card.texto}</ListGroup.Item>
                </ListGroup>
            </Card>

        );
    };

    return <div className="grid">{cardInfo.map(renderCard)}</div>;
}

export default MoreDeets;
