import React, { Component } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  CardBody,
  Label
} from "reactstrap";
import { DateUtil } from "../../Utils";

export class GetAllAccidents extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      data: [],
      isLoading: false
    }),
      console.log(this);
  }

  componentWillMount() {
    const newStates = { ...this.state };
    newStates.isLoading = true;
    this.setState(newStates, () => {
      fetch("http://localhost:51424/api/Accidents/getAllAccidents/", {
        method: "get",
        mode: "cors"
      })
        .then(response => response.json())
        .then(json =>{
          newStates.data = json;
        })
        .catch(e => console.log(e.message))
        .finally( () => {
          newStates.isLoading = false;
          this.setState(newStates);
        });
    });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <Container>
          <Row>
            <Col lg={{ size: 4, offset: 4 }}>
              <Jumbotron>
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status" style={{ marginRight: 9, color: "#5e8f3c" }}>
                    <span class="sr-only"></span>
                  </div>
                    <Label>Cargando...</Label>
                </div>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      );
    }

    if (this.state.data.length == 0) {
      return (
        <Container>
          <Row>
            <Col lg={{ size: 4, offset: 4 }}>
              <Jumbotron>
                <h3>No hay datos</h3>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container>
        <Row>
          <Col lg="12">
            <Jumbotron>
              <h1>Accidentes</h1>
              <hr></hr>
              <React.Fragment>
                <Table>
                  <thead>
                    <tr>
                      <th>RUT</th>
                      <th>Nombre</th>
                      <th>Gravedad</th>
                      <th>Fecha</th>
                      <th>Resumen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map(element => {
                      var date = element.dateAccident.split("T");
                      return (
                        <tr>
                          <td>{element.idCompany}</td>
                          <td>{element.name}</td>
                          <td>{element.severity}</td>
                          <td>{DateUtil.toString(date[0])}</td>
                          <td>{element.resumen}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </React.Fragment>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}
