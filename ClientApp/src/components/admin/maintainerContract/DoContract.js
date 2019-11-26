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
import Session from "../../auth/Session";

export class DoContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        rut_company: "",
        price: "",
        number_visit: "",
        number_asesory: "",
        date_expired: "",
        status: ""
      },
      data: [],
      isCreate: false,
      isFound: false,
      firstChange: true
    };
  }

  handleChange = name => event => {
    //console.log("llegue");
    const { formValues } = this.state;
    formValues[name] = event.target.value;
    this.setState({ formValues });

    if (name == "rut_company") {
      this.state.data.forEach(element => {
        if (element.rut_company == this.state.formValues.rut_company) {
          let dataToSet = {
            rut_company: element.rut_company
          };
          this.setState({ formValues: dataToSet });
        }
      });
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    const newStates = { ...this.state };
    newStates.firstChange = false;
    this.setState(newStates);
    fetch("http://localhost:51424/api/Contracts/doContract/", {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.formValues)
    })
      .then(response => response.json())
      .then(json => {
        newStates.isCreate = json.success;
        this.setState(newStates);
      })
      .catch(e => console.log(e.message));
  }

  componentWillMount() {
    //event.preventDefault();
    fetch("http://localhost:51424/api/Companies/getAllcompaniesForContract", {
      method: "get",
      mode: "cors"
    })
      .then(response => response.json())
      .then(json => {
        //console.log(json[0].id);
        this.setState({
          data: json,
          formValues: {
            rut_company: json[0].rut
          }
        });
      })
      .catch(e => console.log(e.message));
  }

  render() {
    if (this.state.isCreate) {
      return (
        <Alert color="primary">
          <center>Contrato realizado</center>
        </Alert>
      );
    }

    if (!this.state.isCreate && !this.state.firstChange) {
      return (
        <Alert color="primary">
          <center> No se pudo realizar el contrato</center>
        </Alert>
      );
    }

    return (
      <Container>
        <Row>
          <Col lg={{ size: 8, offset: 2 }}>
            <Jumbotron>
              <h1> Empresa a Realizar contrato </h1>
              <hr />
              <div>
                <Input
                  type="select"
                  ref="company"
                  onChange={this.handleChange("rut_company")}
                >
                  <option disabled selected>
                    {" "}
                    Seleccione la empresa{" "}
                  </option>
                  {this.state.data.map(company => {
                    return (
                      <React.Fragment>
                        <option value={company.rut}>
                          {" "}
                          {company.socialReason}{" "}
                        </option>
                      </React.Fragment>
                    );
                  })}
                </Input>
                <br></br>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                  <h3> Contrato </h3>

                  <Label> RUT </Label>
                  <Input
                    readOnly
                    value={this.state.formValues.rut_company}
                  ></Input>
                  <br></br>

                  <FormGroup>
                    <Label for="price">Precio</Label>
                    <Input
                      type="number"
                      required
                      name="price"
                      id="price"
                      placeholder="150000"
                      onChange={this.handleChange("price")}
                      value={this.state.formValues.price}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="number_visit">
                      Cantidad de Visitas Mensuales
                    </Label>
                    <Input
                      type="number"
                      required
                      name="number_visit"
                      id="number_visit"
                      placeholder="10"
                      onChange={this.handleChange("number_visit")}
                      value={this.state.formValues.number_visit}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="number_asesory">Cantidad de Asesorías</Label>
                    <Input
                      type="number"
                      required
                      name="number_asesory"
                      id="number_asesory"
                      placeholder="10"
                      onChange={this.handleChange("number_asesory")}
                      value={this.state.formValues.number_asesory}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="date_expired">Fecha de Expiración</Label>
                    <Input
                      type="date"
                      required
                      name="date_expired"
                      id="date_expired"
                      onChange={this.handleChange("date_expired")}
                      value={this.state.formValues.date_expired}
                    />
                  </FormGroup>

                  <div class="row justify-content-center">
                    <Button style={{ backgroundColor: "#5e8f3c" }}>
                      Realizar Contrato
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
