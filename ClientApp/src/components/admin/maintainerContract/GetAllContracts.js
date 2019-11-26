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
import { DateUtil } from "../../../Utils";

export class GetAllContracts extends Component {
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
      fetch("http://localhost:51424/api/Contracts/getAllContracts", {
        method: "get",
        mode: "cors"
      })
        .then(response => response.json())
        .then(json => {
          newStates.data = json;
          newStates.isLoading = false;
          this.setState(newStates);
        })
        .catch(e => {
          console.log(e.message);
          newStates.isLoading = false;
          this.setState(newStates);
        });
    });
  }

  render() {
    if (this.state.data.length == 0 && !this.state.isLoading) {
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

    return (
      <Container>
        <Row>
          <Col lg="12">
            <Jumbotron>
              <h1>Contratos</h1>
              <hr />
              <div>
                <div1></div1>
                <div2>
                  <Table>
                    <thead>
                      <tr>
                        <th>RUT</th>
                        <th>Precio</th>
                        <th>Cantidad de Visitas</th>
                        <th>Cantidad de Asesorías</th>
                        <th>Fecha de Expiración</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map(element => {
                        var date = element.dateExpired.split("T");
                        return (
                          <tr>
                            <td>{element.rutCompany}</td>
                            <td>{element.price}</td>
                            <td>{element.numberVisit}</td>
                            <td>{element.numberAsesory}</td>
                            <td>{DateUtil.toString(date[0])}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div2>
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}
