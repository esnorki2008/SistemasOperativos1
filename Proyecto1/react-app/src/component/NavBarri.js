import React from "react";
import Tarjeta from "./Tarjeta";
import Graph from "./Graph";
///import "./Box.css";
import { Nav, Form, Col, Row } from "react-bootstrap";
class NavBarri extends React.Component {
  constructor(props) {
    super(props);
    this.TextoServerA = React.createRef();
    this.TextoServerB = React.createRef();
    this.state = {
      //chartData:props.chartData,
      ipA: "",
      ipB: "",
      MostrarGrafica: false,
      MostrarMensajes: false,
    };
  }
  componentWillMount() {
    // this.getchartData(); // this should be this.getChartData();
    this.getChartData();
  }
  static defaultProps = {
    ipA: "l",
    ipB: "l",
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City",
  };
  Mensajes = () => {
    console.log("DitaDita");
  };
  decidirMensaje = () => {
    this.setState({
      MostrarMensajes: !this.state.MostrarMensajes,
      MostrarGrafica: false,
    });
  };
  CargarIp = () => {
    this.setState({ ipA: this.TextoServerA.current.value });
    this.setState({ ipB: this.TextoServerB.current.value });
    console.log(this.TextoServerA.current.value);
    console.log(this.TextoServerB.current.value);
  };
  decidirGrafica = () => {
    this.setState({
      MostrarGrafica: !this.state.MostrarGrafica,
      MostrarMensajes: false,
    });
  };

  navbarri = () => {
    return (
      <>
        <h1 className="text-center mt-4 mb-4">Servidor Web</h1>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            <Nav.Link onClick={this.CargarIp}>Cargar Ip Servidores</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={this.decidirMensaje}>Mensajes</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={this.decidirGrafica}>Grafica</Nav.Link>
          </Nav.Item>
        </Nav>
        <Form>
          <Row>
            <Col>
              <Form.Label>Ip Servidor A</Form.Label>
            </Col>
            <Col>
              <Form.Label>Ip Servidor B</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                ref={this.TextoServerA}
                type="text"
                placeholder="Ip Servidor A"
              />
            </Col>
            <Col>
              <Form.Control
                ref={this.TextoServerB}
                type="text"
                placeholder="Ip Servidor B"
              />
            </Col>
          </Row>
        </Form>
      </>
    );
  };
  getChartData() {
    // Ajax calls here
  }
  render() {
    return (
      <div>
        {this.navbarri()}

        {this.state.MostrarGrafica ? (
          <Graph
            ipA={this.state.ipA}
            ipB={this.state.ipB}
            cadena="Valores Del Uso De"
            legendPosition="bottom"
          />
        ) : null}
        {this.state.MostrarMensajes ? <Tarjeta ipA={this.state.ipA}
          ipB={this.state.ipB} /> : null}
      </div>
    );
  }
}
export default NavBarri;
