import React, { Component, Step1, Step2 } from "react";
import {
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  CardBody
} from "reactstrap";
import { timingSafeEqual } from "crypto";
//import { Form } from 'reactstrap';

export class GetUsersId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        run: ""
      },
      data: [],
      isFirstChange: true,
      isLoading: false
    };
  }

  handleChange = name => event => {
    const { formValues } = this.state;
    formValues[name] = event.target.value;
    this.setState({ formValues });
  };

  handleSubmit(event) {
    const newStates = { ...this.state };
    newStates.isFirstChange = false;
    newStates.isLoading = true;
    this.setState(newStates);
    event.preventDefault();
    fetch(
      "http://localhost:51424/api/users/getUser/" + this.state.formValues.run,
      {
        method: "get",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.run)
      }
    )
      .then(response => response.json())
      .then(json => {
        newStates.data = json;
        newStates.isLoading = false;
        this.setState(newStates);
      });
  }

  handleSubmitDelete(event) {
    const newStates = { ...this.state };
    newStates.isLoading = true;
    this.setState(newStates);
    event.preventDefault();
    fetch(
      "http://localhost:51424/api/users/deleteUsers/" +
        this.state.formValues.run,
      {
        method: "post",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.run)
      }
    )
      .then(response => response.json())
      .then(json => {
        newStates.data = [];
        newStates.isLoading = false;
        this.setState(newStates);
      });
  }

  render() {
    const roles = {
      1: "Administrador",
      2: "Profesional",
      3: "Cliente"
    };

    const isFoundUser = this.state.data.length > 0;
    const { isFirstChange, isLoading } = this.state;
    const Spinner = (
      <div class="d-flex justify-content-center">
        <div
          class="spinner-border"
          role="status"
          style={{ marginRight: 9, color: "#5e8f3c" }}
        >
          <span class="sr-only"></span>
        </div>
        <Label>Cargando...</Label>
      </div>
    );

    return (
      <Container>
        <Row>
          <Col lg="12">
            <Jumbotron>
              <h1> Buscar Usuarios </h1>
              <hr />
              <div>
                <div1>
                  <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                      <Label for="run">RUN</Label>
                      <Input
                        type="number"
                        required
                        name="run"
                        id="run"
                        placeholder="111111111"
                        onChange={this.handleChange("run")}
                        value={this.state.formValues.run}
                      />
                    </FormGroup>
                    <Input type="submit" value="Buscar" />
                    <br></br>
                  </Form>
                </div1>
                {isFirstChange && !isLoading ? null : isFirstChange &&
                  isLoading ? (
                  Spinner
                ) : !isFirstChange && isFoundUser ? (
                  <React.Fragment>
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
                    <hr />
                    <br></br>
                    <center>
                      <div3>
                        <Button
                          style={{ backgroundColor: "#5e8f3c" }}
                          onClick={this.handleSubmitDelete.bind(this)}
                        >
                          Eliminar
                        </Button>
                      </div3>
                    </center>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Label> No se ha encontrado usuario </Label>
                  </React.Fragment>
                )}
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}
