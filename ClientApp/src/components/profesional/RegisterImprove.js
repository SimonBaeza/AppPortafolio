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

export class RegisterImprove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        name: "",
        type_improve: "",
        description: ""
      },
      data: [],
      isRegister: false
    };
  }

  handleChange = name => event => {
    const { formValues } = this.state;
    formValues[name] = event.target.value;
    this.setState({ formValues });
  };

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:51424/api/Improves/register/", {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.formValues)
    })
      .then(response => response.json())
      .then(json =>
        this.setState({
          isRegister: json.success
        })
      );
  }

  render() {
    if (this.state.isRegister) {
      return <Alert color="primary"><center>Mejora registrada</center></Alert>;
    }

    return (
      <Container>
        <Row>
          <Col lg={{ size: 8 , offset: 2}}>
            <Jumbotron>
              <h1> Realizar Mejora </h1>
              <hr />
              <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                  <FormGroup>
                    <Label for="name">Nombre</Label>
                    <Input
                      type="text"
                      required
                      name="name"
                      id="name"
                      placeholder="Mejora de Charla"
                      onChange={this.handleChange("name")}
                      value={this.state.formValues.name}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="type">Tipo</Label>
                    <Input
                      type="select"
                      ref="type"
                      required
                      onChange={this.handleChange("type_improve")}
                    >
                      <option disabled selected>
                        {" "}
                        Seleccione el tipo{" "}
                      </option>
                      <option> Visita </option>
                      <option> Asesoría </option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="description">Descripción</Label>
                    <Input
                      type="textarea"
                      required
                      name="description"
                      id="description"
                      placeholder="Charla prioritaria"
                      onChange={this.handleChange("description")}
                      value={this.state.formValues.description}
                    />
                  </FormGroup>

                  <div class="row justify-content-center">
                    <Button style={{ backgroundColor: "#5e8f3c" }}>
                      Registrar Mejora
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
