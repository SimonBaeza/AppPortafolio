import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  CardBody,
  Button
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Session from "../auth/Session";

export class RegisterCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        rut: "",
        social_reason: "",
        email: "",
        address: "",
        comercial_business: "",
        phone: "",
        id_role: "3",
        password: ""
      },
      isRegister: false,
      isFirstChange: true
    };
  }

  handleChange = name => event => {
    const { formValues } = this.state;
    formValues[name] = event.target.value;
    this.setState({ formValues });
  };

  handleSubmit(event) {
    event.preventDefault();
    const newStates = { ...this.state };
    newStates.isFirstChange = false;
    this.setState(newStates);
    fetch("http://localhost:51424/api/Companies/register", {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.formValues)
    })
      .then(response => response.json())
      .then(json => {
        newStates.isRegister = json.success;
        this.setState(newStates);
      });
  }

  componentWillMount() {
    //event.preventDefault();
    fetch("http://localhost:51424/api/users/getAllUsersClient", {
      method: "get",
      mode: "cors"
    })
      .then(response => response.json())
      .then(json => {
        //console.log(json[0].id);
        this.setState({
          data: json,
          formValues: {
            run_client: json[0].rut
          }
        });
      })
      .catch(e => console.log(e.message));
  }

  render() {
    if (this.state.isRegister) {
      return (
        <Alert color="primary">
          <center>Clientre registrado</center>
        </Alert>
      );
    }

    if (!this.state.isRegister && !this.state.isFirstChange) {
      return (
        <Alert color="primary">
          <center>No se pudo registrar</center>
        </Alert>
      );
    }

    return (
      <Container>
        <Row>
          <Col lg={{ size: 8, offset: 2 }}>
            <Jumbotron>
              <h1> Registra la Empresa </h1>
              <hr />
              <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                  <FormGroup>
                    <Label for="rut">RUT</Label>
                    <Input
                      type="number"
                      required
                      name="rut"
                      id="rut"
                      placeholder="11111111"
                      onChange={this.handleChange("rut")}
                      value={this.state.formValues.rut}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="social_reason">Razón Social</Label>
                    <Input
                      type="text"
                      required
                      name="social_reason"
                      id="social_reason"
                      placeholder="No mas Accidentes S.A."
                      onChange={this.handleChange("social_reason")}
                      value={this.state.formValues.social_reason}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      required
                      name="email"
                      id="email"
                      placeholder="administracion@nomasaccidentes.cl"
                      onChange={this.handleChange("email")}
                      value={this.state.formValues.email}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="address">Dirección</Label>
                    <Input
                      type="text"
                      required
                      name="address"
                      id="text"
                      placeholder="Av. Pajaritos #3153"
                      onChange={this.handleChange("address")}
                      value={this.state.formValues.address}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="comercial_business">Giro comercial</Label>
                    <Input
                      type="text"
                      required
                      name="comercial_business"
                      id="comercial_business"
                      placeholder="Ventas Online"
                      onChange={this.handleChange("comercial_business")}
                      value={this.state.formValues.comercial_business}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="phone">Teléfono</Label>
                    <Input
                      type="number"
                      required
                      name="phone"
                      id="phone"
                      placeholder="56930799532"
                      onChange={this.handleChange("phone")}
                      value={this.state.formValues.phone}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Contraseña</Label>
                    <Input
                      type="password"
                      required
                      name="password"
                      id="password"
                      placeholder="****"
                      onChange={this.handleChange("password")}
                      value={this.state.formValues.password}
                    />
                  </FormGroup>

                  <input
                    type="hidden"
                    name="id_role"
                    onChange={this.handleChange}
                    value={this.state.formValues.id_role}
                  ></input>
                  <div class="row justify-content-center">
                    <Button style={{ backgroundColor: "#5e8f3c" }}>
                      Registrar
                    </Button>
                  </div>
                </Form>
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}
//
