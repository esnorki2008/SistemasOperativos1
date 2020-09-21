import React from "react";
import MoreDeets from './MoreDeets';

import { Form } from "react-bootstrap"
const Combo = () => {

  const cargaCombo = (card, index) => {
    return (
      <>
        <Form>

          <Form.Group controlId="exampleForm.ControlSelect1">
            
            
            <Form.Label>Servidor De Los Mensajes</Form.Label>
            <Form.Control as="select">
              <option>Servidor A </option>
              <option>Servidor B</option>
            </Form.Control>

          </Form.Group>

        </Form>
        <MoreDeets />
      </>
    );
  };

  return <div className="grid">{cargaCombo()}</div>;
}

export default Combo;
