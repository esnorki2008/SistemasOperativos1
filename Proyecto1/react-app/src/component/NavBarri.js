import React from "react";
import Combo from './combo';
import Graph from './Graph';
///import "./Box.css";
import {  Nav, Form , Col,Row} from "react-bootstrap"
class NavBarri extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:props.chartData,
            showComponent: false,
        };

    }
    componentWillMount(){
        // this.getchartData(); // this should be this.getChartData();
         this.getChartData();
    }
    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
      }
    Mensajes = () => {
        console.log("DitaDita")
    }
    decidir = () => {
        this.setState({
            showComponent: !this.state.showComponent,
        });
    }
    NavBarArriba = () => {




    }
    navbarri = () => {
        return <>

            <h1 className="text-center mt-4 mb-4">Servidor Web</h1>
            <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                    <Nav.Link onClick={this.decidir}>Mensajes/Grafica</Nav.Link>
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
                        <Form.Control type="ipa" placeholder="Ip Servidor A" />
                    </Col>
                    <Col>
                        <Form.Control type="ipb" placeholder="Ip Servidor B" />
                    </Col>
                </Row>
            </Form>
        </>
    }
    getChartData(){
        // Ajax calls here
        this.setState({
          chartData:{
            labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
            datasets:[
              {
                label:'Servidor A',
                data:[
                  5,
                  8,
                  5,
                  8,
                  5,
                  5,
                  5,
                ],
                backgroundColor:[
                  'rgba(19, 229, 166, 0.5)',
                ]
              },
              {
                label:'Servidor B',
                data:[
                  3,
                  4,
                  4,
                  2,
                  3,
                  20
                ],
                backgroundColor:[
                  'rgba(0, 73,153, 0.8)',
                ]
              }
            ]
          }
        });
      }
    render() {
        return (
            <div>
                {
                    this.navbarri()
                }
                {this.state.showComponent ?
                    <Combo /> :(
                    <Graph chartData={this.state.chartData} cadena="Valores Del Uso De" legendPosition="bottom"/>
                    
                    )
                }
                
            </div>
        );
    }
}
export default NavBarri;
