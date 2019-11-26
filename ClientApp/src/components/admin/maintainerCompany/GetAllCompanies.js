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

export class GetAllCompanies extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      data: [],
      isLoading: false
    }),
      console.log(this);
  }

  componentWillMount() {
    const newStates = {...this.state};
    newStates.isLoading = true;
    this.setState(newStates);
    setTimeout( () => {
      fetch("http://localhost:51424/api/companies/getAllCompanies", {
        method: "get",
        mode: "cors"
      })
        .then(response => response.json())
        .then(json => {
          newStates.isLoading = false;
          newStates.data = json;
          this.setState(newStates);
        })
        .catch(e => {console.log(e.message), () =>{
          newStates.isLoading = false;
        }});
    }, 750);
    
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
              <h1>Clientes</h1>
              <hr />
              <React.Fragment>
                <Table>
                  <thead>
                    <tr>
                      <th>RUT</th>
                      <th>Razón Social</th>
                      <th>Email</th>
                      <th>Direccion</th>
                      <th>Giro Comercial</th>
                      <th>Telefono</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map(element => {
                      return (
                        <tr>
                          <td>{element.rut}</td>
                          <td>{element.socialReason}</td>
                          <td>{element.email}</td>
                          <td>{element.address}</td>
                          <td>{element.comercialBusiness}</td>
                          <td>{element.phone}</td>
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
