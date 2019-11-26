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

export class CalculateAccidentRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        id_company: "",
        accidents: [],
        countWorkers: ""
      },
      data: [],
      isRegister: false,
      varAccidents: "",
      Ta: false
    };
  }

  handleChange = name => event => {
    const { formValues } = this.state;
    formValues[name] = event.target.value;
    this.setState({ formValues }, () =>{
      if (name == "id_company") {
        this.getAllAccidents();
      }
    });
  };

  getAllAccidents() {
    fetch(
      "http://localhost:51424/api/Accidents/getAccidentsByCompanyToTA/" +
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
            accidents: json
          },
          () => {
            this.state.data.forEach(element => {
              if (element.id_company == this.state.formValues.id_company) {
                let dataToSet = {
                  id_company: element.id_company,
                  accidents: this.state.formValues.accidents,
                  data: this.state.formValues.data,
                  countWorkers: this.state.formValues.countWorkers
                };
                this.setState({ formValues: dataToSet });
              }
            });
          }
        );
      })
      .catch(e => console.log(e.message));
  }

  handleSubmit(event) {
    if (this.state.accidents != null) {
      let count = 0;
      for (var key in this.state.accidents) {
        count++;
      }  
      let varAcc = 0;
      varAcc = (count * 100) / this.state.formValues.countWorkers;
      this.setState( { varAccidents: varAcc });
      this.setState( { Ta: true });
    }
  }

  handleClick(event){
    this.setState({ Ta: false})
  }

  componentWillMount() {
    //event.preventDefault();
    fetch("http://localhost:51424/api/Contracts/getAllContracts", {
      method: "get",
      mode: "cors"
    })
      .then(response => response.json())
      .then(json => {
        //console.log(json[0].id);
        this.setState({
          data: json
        });
      })
      .catch(e => console.log(e.message));
  }

  render() {
    if (this.state.Ta != false)
    {
      return  (
        <Container>
          <Row>
            <Col lg={{ size: 8, offset: 2}}>
              <Jumbotron>
                <h2>La probabilidad de un accidente</h2>
                <hr/>
                <Label>La Probabilidad es del: {this.state.varAccidents}% </Label>
                <br></br>
                <div class="row justify-content-center">
                    <Button onClick={ this.handleClick.bind(this) } style={{ backgroundColor: "#5e8f3c" }}>
                      Volver
                    </Button>
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
          <Col lg={{ size: 8, offset: 2 }}>
            <Jumbotron>
              <h1> Calcular Accidentabilidad </h1>
              <hr />
              <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                <br></br>
                  <h4>Rellene los campos del cliente</h4>
                  <Label>RUT</Label>
                  <Input
                    style={{ marginBottom: 10}}
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
                  
                  <FormGroup>
                    <Label for="countWorkers">Cantidad de Trabajadores</Label>
                    <Input
                      type="text"
                      required
                      pattern="\d{0,99999999999}"
                      name="countWorkers"
                      id="countWorkers"
                      placeholder="100"
                      onChange={this.handleChange("countWorkers")}
                      value={this.state.formValues.countWorkers}
                    />
                  </FormGroup>
                  
                  <div class="row justify-content-center">
                    <Button style={{ backgroundColor: "#5e8f3c" }}>
                      Calcular
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
