import React, { Component } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  CardBody,
  Label,
  Spinner
} from "reactstrap";

export class GetAllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false
    };
  }

  componentWillMount() {
    const newState = { ...this.state };
    newState.isLoading = true;
    this.setState(newState, () => {
      setTimeout(() => {
        fetch("http://localhost:51424/api/users/getAllUsers", {
          method: "get",
          mode: "cors"
        })
          .then(response => response.json())
          .then(json => {
            newState.data = json;
            newState.isLoading = false;
            this.setState(newState);
          })
          .catch(e => {
            console.log(e.message);
            newState.isLoading = false;
            this.setState(newState);
          });
      }, 750);
    });
  }

  render() {
    const roles = {
      1: "Administrador",
      2: "Profesional",
      3: "Cliente"
    };

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
              <h1>Usuarios</h1>
              <hr />
              <div>
                <div1></div1>
                <div2>
                  <Table>
                    <thead>
                      <tr>
                        <th>RUN</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Telefono</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map(element => {
                        return (
                          <tr>
                            <td>{element.run}</td>
                            <td>{element.name}</td>
                            <td>{element.lastname}</td>
                            <td>{element.email}</td>
                            <td>{roles[element.idRole]}</td>
                            <td>{element.phone}</td>
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
