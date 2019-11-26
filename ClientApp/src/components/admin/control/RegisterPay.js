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

export class RegisterPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        id_company: "",
        cost: "",
        date_pay: ""
      },
      isRegister: false,
      data: [],
      dataAsesory: [],
      dataVisit: [],
      numberVisitExtra: [],
      numberAsesoryExtra: [],
      firstChange: true
    };
  }

  handleChange = name => event => {
    console.log(this.state.numberAsesoryExtra);
    const { formValues } = this.state;
    formValues[name] = event.target.value;
    this.setState({ formValues }, () => {
      if (name == "id_company") {
        this.getAllAsesory();
        this.getAllVisits();
      }
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const newStates = { ...this.state };
    newStates.firstChange = false;
    this.setState(newStates);

    fetch("http://localhost:51424/api/Pays/register", {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        a: this.state.formValues,
        asesory: this.state.dataAsesory,
        visit: this.state.dataVisit
      })
    })
      .then(response => response.json())
      .then(json => {
        newStates.isRegister = json.success;
        this.setState(newStates);
      });
  }

  getAllAsesory() {
    fetch(
      "http://localhost:51424/api/Consultations/getAllConsultationsToPay/" +
        this.state.formValues.id_company,
      {
        method: "get",
        mode: "cors"
      }
    )
      .then(response => response.json())
      .then(json => {
        this.setState(
          {
            numberAsesoryExtra: json
          },
          () => {
            this.state.data.forEach(element => {
              if (element.rutCompany == this.state.formValues.id_company) {
                let dataToSet = {
                  id_company: element.rutCompany,
                  cost: element.price,
                  date_pay: this.state.formValues.date_pay
                };
                this.setState({ formValues: dataToSet });
              }
            });
          }
        );
      })
      .catch(e => console.log(e.message));
  }

  getAllVisits() {
    fetch(
      "http://localhost:51424/api/Visits/getAllVisitsToPay/" +
        this.state.formValues.id_company,
      {
        method: "get",
        mode: "cors"
      }
    )
      .then(response => response.json())
      .then(json => {
        this.setState(
          {
            numberVisitExtra: json
          },
          () => {
            this.state.data.forEach(element => {
              if (element.rutCompany == this.state.formValues.id_company) {
                let dataToSet = {
                  id_company: element.rutCompany,
                  cost: element.price,
                  date_pay: this.state.formValues.date_pay
                };
                this.setState({ formValues: dataToSet });
              }
            });
          }
        );
      })
      .catch(e => console.log(e.message));
  }

  componentWillMount() {
    fetch("http://localhost:51424/api/Contracts/getAllContractsToPay", {
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
      return (
        <Alert color="primary">
          <center>Pago registrado</center>
        </Alert>
      );
    }

    if (!this.state.isRegister && !this.state.firstChange) {
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
              <h1> Registrar el Pago </h1>
              <hr />
              <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                  <br></br>
                  <Label>RUT</Label>
                  <Input
                    type="select"
                    ref="company"
                    required
                    onChange={this.handleChange("id_company")}
                  >
                    <option disabled selected>
                      {" "}
                      Seleccione la empresa{" "}
                    </option>
                    {this.state.data.map(company => {
                      return (
                        <React.Fragment>
                          <option value={company.rutCompany}>
                            {" "}
                            {company.rutCompany}{" "}
                          </option>
                        </React.Fragment>
                      );
                    })}
                  </Input>

                  <Label> Precio Base </Label>
                  <Input
                    readOnly
                    value={"$ " + this.state.formValues.cost}
                  ></Input>

                  {this.state.numberAsesoryExtra.reduce((num, a) => {
                    if (a.rutCompany == this.state.formValues.id_company) {
                      num++;
                    }
                    return num;
                  }, 0) ? (
                    <React.Fragment>
                      <Label> Cantidad Asesorías Extras </Label>
                      <Input
                        readOnly
                        value={this.state.numberAsesoryExtra.reduce(
                          (num, a) => {
                            if (
                              a.rutCompany == this.state.formValues.id_company
                            ) {
                              num++;
                            }
                            return num;
                          },
                          0
                        )}
                      ></Input>

                      <Label> Precio Asesorías Extras </Label>
                      <Input
                        readOnly
                        value={this.state.numberAsesoryExtra.reduce(
                          (price, a) => {
                            if (
                              a.rutCompany == this.state.formValues.id_company
                            ) {
                              price = price + 15000;
                            }
                            return price;
                          },
                          0
                        )}
                      ></Input>
                    </React.Fragment>
                  ) : null}

                  {this.state.numberVisitExtra.reduce((num, a) => {
                    if (a.idCompany == this.state.formValues.id_company) {
                      num++;
                    }
                    return num;
                  }, 0) ? (
                    <React.Fragment>
                      <Label> Cantidad Visitas Extras </Label>
                      <Input
                        readOnly
                        value={this.state.numberVisitExtra.reduce((num, a) => {
                          if (a.idCompany == this.state.formValues.id_company) {
                            num++;
                          }
                          return num;
                        }, 0)}
                      ></Input>

                      <Label> Precio Visitas Extras </Label>
                      <Input
                        readOnly
                        value={this.state.numberVisitExtra.reduce(
                          (price, a) => {
                            if (
                              a.idCompany == this.state.formValues.id_company
                            ) {
                              price = price + 30000;
                            }
                            return price;
                          },
                          0
                        )}
                      ></Input>
                    </React.Fragment>
                  ) : null}

                  <FormGroup>
                    <Label for="date_pay">Fecha</Label>
                    <Input
                      type="date"
                      required
                      name="date_pay"
                      id="date_pay"
                      onChange={this.handleChange("date_pay")}
                      value={this.state.formValues.date_pay}
                    />
                  </FormGroup>

                  <div class="row justify-content-center">
                    <Button style={{ backgroundColor: "#5e8f3c" }}>
                      Registrar Pago
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
