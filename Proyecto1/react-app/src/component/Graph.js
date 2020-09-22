import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Alerta from "./Alerta";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpuA:[],
      cpuB:[],
      ramA:[],
      ramB:[],
      ipA:props.ipA,
      ipB:props.ipB,
      EstadoipA: true,
      EstadoipB: true,
      
      chartDataA: {
        labels: [
          "T0",
          "T1",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
          "T13",
          "T14",
          "T15",
          "T16",
          "T17",
          "T18",
          "T19",
          "T20",
        ],
        datasets: [
          {
            label: "Servidor A",
            data: [],
            backgroundColor: ["rgba(19, 229, 166, 0.5)"],
          },
          {
            label: "Servidor B",
            data: [],
            backgroundColor: ["rgba(0, 73,153, 0.8)"],
          },
        ],
      },
      chartDataB: {
        labels: [
          "T0",
          "T1",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
          "T13",
          "T14",
          "T15",
          "T16",
          "T17",
          "T18",
          "T19",
          "T20",
        ],
        datasets: [
          {
            label: "Servidor A",
            data: [],
            backgroundColor: ["rgba(19, 229, 166, 0.5)"],
          },
          {
            label: "Servidor B",
            data: [],
            backgroundColor: ["rgba(0, 73,153, 0.8)"],
          },
        ],
      },
    };
  
  }
  static defaultProps = {
    NombreServidor: "",
  };
  estadoCpu(est,est2) {
    this.setState({
      chartDataA: {
        labels: [
          "T0",
          "T1",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
          "T13",
          "T14",
          "T15",
          "T16",
          "T17",
          "T18",
          "T19",
          "T20",
        ],
        datasets: [
          {
            label: "Servidor A",
            data: est,
            backgroundColor: ["rgba(19, 229, 166, 0.5)"],
          },
          {
            label: "Servidor B",
            data: est2,
            backgroundColor: ["rgba(0, 73,153, 0.8)"],
          },
        ],
      },
    });
  }
  
  estadoRam(est,est2) {
    this.setState({
      chartDataB: {
        labels: [
          "T0",
          "T1",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
          "T13",
          "T14",
          "T15",
          "T16",
          "T17",
          "T18",
          "T19",
          "T20",
        ],
        datasets: [
          {
            label: "Servidor A",
            data: est,
            backgroundColor: ["rgba(19, 229, 166, 0.5)"],
          },
          {
            label: "Servidor B",
            data: est2,
            backgroundColor: ["rgba(0, 73,153, 0.8)"],
          },
        ],
      },
    });
  }
  
  componentDidMount() {
    this.periodo = setInterval(() => {
      axios
        .get("http://"+this.state.ipA+":5000/mod")
        .then((response) => {
          let i = 0;
          let estCpu = [0];
          let estRam = [0];

          for (i = 18; i >= 0; i--) {
            estCpu[i + 1] = this.state.chartDataA.datasets[0].data[i];
            estRam[i + 1] = this.state.chartDataB.datasets[0].data[i];
            
          }
          estCpu[0] = response.data.cpu;
          estRam[0] = response.data.ram;
          this.setState({cpuA:estCpu})
          this.setState({ramA:estRam})
        })
        .catch((error) => {
          //console.log(error);
          //clearInterval(this.periodo);
          this.setState({ EstadoipA: false });
        });
        axios
        .get("http://"+this.state.ipB+":5000/mod")
        .then((response) => {
          let i = 0;
          let estCpu = [0];
          let estRam = [0];
          
          
          for (i = 18; i >= 0; i--) {
            estCpu[i + 1] = this.state.chartDataA.datasets[1].data[i];
            estRam[i + 1] = this.state.chartDataB.datasets[1].data[i];
            
          }
          estCpu[0] = response.data.cpu;
          estRam[0] = response.data.ram;
          this.setState({cpuB:estCpu})
          this.setState({ramB:estRam})
          
        })
        .catch((error) => {
          //console.log(error);
          //clearInterval(this.periodo);
          this.setState({ EstadoipB: false });
        });

        this.estadoCpu(this.state.cpuA,this.state.cpuB);
        this.estadoRam(this.state.ramA,this.state.ramB,);
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.periodo);
  }
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City",
  };

  render() {
    return (
      <div className="chart">
        {!this.state.EstadoipA ? <Alerta NombreServidor=" A" /> : null}
        {!this.state.EstadoipB ? <Alerta NombreServidor=" B" /> : null}
        <Line
          data={this.state.chartDataA}
          options={{
            title: {
              display: this.props.displayTitle,
              text: this.props.cadena + " CPU",
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
          }}
        />
        <Line
          data={this.state.chartDataB}
          options={{
            title: {
              display: this.props.displayTitle,
              text: this.props.cadena + " RAM",
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
          }}
        />
      </div>
    );
  }
}

export default Graph;
