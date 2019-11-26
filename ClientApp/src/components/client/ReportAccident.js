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

export class ReportAccident extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        name: "",
        severity: "",
        date_accident: "",
        resumen: "",
        id_company: ""
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
    fetch("http://localhost:51424/api/Accidents/registerAccident", {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.formValues)
    })
      .then(response => response.json())
      .then(json => this.setState({ isRegister: json.success }));
  }

  componentWillMount() {
    const run = Session.getUser().run;
    fetch("http://localhost:51424/api/companies/getCompanyRut/" + run, {
      method: "get",
      mode: "cors"
    })
      .then(response => response.json())
      .then(json => {
        const newFormValues = { ...this.state.formValues };
        newFormValues.id_company = json.rut;
        this.setState({
          data: json,
          formValues: newFormValues
        });
      })
      .catch(e => console.log(e.message));
  }

  render() {
    if (this.state.isRegister) {
      return <Alert color="primary"><center>Accidente reportado</center></Alert>;
    }

    return (
      <Container>
        <Row>
          <Col lg={{ size: 8 , offset: 2}}>
            <Jumbotron>
              <h1> Registre el Accidente </h1>
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
                      placeholder="Baja de Voltaje"
                      onChange={this.handleChange("name")}
                      value={this.state.formValues.name}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label> Gravedad </Label>
                    <Input
                      type="select"
                      ref="severity"
                      required
                      onChange={this.handleChange("severity")}
                    >
                      {
                        <React.Fragment>
                          <option disabled selected>
                            {" "}
                            Escoger Prioridad{" "}
                          </option>
                          <option value="Alta"> Alta </option>
                          <option value="Media"> Media </option>
                          <option value="Baja"> Baja </option>
                        </React.Fragment>
                      }
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="date">Fecha</Label>
                    <Input
                      type="date"
                      required
                      name="date"
                      id="date"
                      //placeholder="email@email.cl"
                      onChange={this.handleChange("date_accident")}
                      value={this.state.formValues.date_accident}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="resumen">Resumen</Label>

                    <Input
                      type="text area"
                      required
                      name="resumen"
                      id="resumen"
                      placeholder="Resumen"
                      onChange={this.handleChange("resumen")}
                      value={this.state.formValues.resumen}
                    />
                  </FormGroup>

                  <FormGroup>
                    <h4> Empresa</h4>
                    <Input
                      type="select"
                      ref="company"
                      required
                      onChange={this.handleChange("id_company")}
                    >
                      <option disabled selected>
                        {" "}
                        Escoger Empresa{" "}
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
                  </FormGroup>

                  <div class="row justify-content-center">
                    <Button style={{ backgroundColor: "#5e8f3c" }}>
                      Reportar
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
