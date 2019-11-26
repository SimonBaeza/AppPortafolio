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

export class RegisterConsultation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        name: "",
        date_asesory: "",
        time_asesory: "",
        resumen: "",
        id_profesional: "",
        rut_company: "",
        extra: ""
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
    fetch("http://localhost:51424/api/Consultations/registerConsultation/", {
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

  componentWillMount() {
    const newFormValues = { ...this.state.formValues };
    const userRun = Session.getUser().run;
    newFormValues.id_profesional = userRun;
    this.setState({
      formValues: newFormValues
    });
    fetch("http://localhost:51424/api/companies/getAllCompanies", {
      method: "get",
      mode: "cors"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json
        });
      })
      .catch(e => console.log(e.message));
  }

  render() {
    if (this.state.isRegister) {
      return <Alert color="primary"><center>Asesoría agendada</center></Alert>;
    }

    return (
      <Container>
        <Row>
          <Col lg={{ size: 8 , offset: 2}}>
            <Jumbotron>
              <h1> Agende la Asesoría </h1>
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
                      placeholder="Charla de Iluminación"
                      onChange={this.handleChange("name")}
                      value={this.state.formValues.name}
                    />
                  </FormGroup>

                  <FormGroup>
                    <h4> Empresa </h4>
                    <Input
                      type="select"
                      ref="company"
                      onChange={this.handleChange("rut_company")}
                      required
                    >
                      <option disabled selected>
                        {" "}
                        Seleccione la empresa{" "}
                      </option>
                      {this.state.data.map((company, i) => {
                        return (
                          <React.Fragment>
                            <option key={i} value={company.rut}>
                              {" "}
                              {company.socialReason}{" "}
                            </option>
                          </React.Fragment>
                        );
                      })}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="date_asesory">Fecha</Label>
                    <Input
                      type="date"
                      required
                      name="date_asesory"
                      id="date_asesory"
                      onChange={this.handleChange("date_asesory")}
                      value={this.state.formValues.date_asesory}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="time_asesory">Hora</Label>
                    <Input
                      type="time"
                      required
                      name="time_asesory"
                      id="time_asesory"
                      onChange={this.handleChange("time_asesory")}
                      value={this.state.formValues.time_asesory}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="resumen">Resumen</Label>
                    <Input
                      type="textarea"
                      required
                      name="resumen"
                      id="resumen"
                      placeholder="Resumen"
                      onChange={this.handleChange("resumen")}
                      value={this.state.formValues.resumen}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Asesoría Extra</Label>
                    <Input
                      type="select"
                      ref="extra"
                      required
                      onChange={this.handleChange("extra")}
                    >
                      <option disabled selected>
                        {" "}
                        Seleccione opción{" "}
                      </option>
                      <option value="No"> No </option>
                      <option value="Si"> Si </option>
                    </Input>
                  </FormGroup>

                  <div class="row justify-content-center">
                    <Button style={{ backgroundColor: "#5e8f3c" }}>
                      Registrar Asesoría
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
