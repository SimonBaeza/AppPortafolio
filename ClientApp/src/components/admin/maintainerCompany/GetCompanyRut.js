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

export class GetCompanyRut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        rut: ""
      },
      data: [],
      isLoading: false,
      isFirstChange: true
    };
  }

  handleChange = name => event => {
    const { formValues } = this.state;
    formValues[name] = event.target.value;
    this.setState({ formValues });
  };

  handleSubmit(event) {
    console.log(this.state.data);
    const newStates = { ...this.state };
    newStates.isLoading = true;
    newStates.isFirstChange = false;
    this.setState(newStates);
    event.preventDefault();
    fetch(
      "http://localhost:51424/api/companies/getCompanyRut/" +
        this.state.formValues.rut,
      {
        method: "get",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.rut)
      }
    )
      .then(response => response.json())
      .then(json => {
        newStates.data = json;
        newStates.isLoading = false;
        this.setState(newStates);
      })
      .catch(e => {
        console.log(e.message),
          () => {
            newStates.isLoading = false;
            this.setState(newStates);
          };
      });
  }

  handleSubmitDelete(event) {
    const newStates = { ...this.state };
    newStates.isLoading = true;
    this.setState(newStates);
    event.preventDefault();
    fetch(
      "http://localhost:51424/api/companies/deleteCompany/" +
        this.state.formValues.rut,
      {
        method: "post",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.id)
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
    const isFoundClient = this.state.data.length > 0;
    const { isLoading, isFirstChange } = this.state;
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
              <h1> Buscar Cliente </h1>
              <hr />
              <div>
                <div1>
                  <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                      <Label for="rut">RUT</Label>
                      <Input
                        type="text"
                        required
                        name="rut"
                        id="rut"
                        placeholder="111111111"
                        onChange={this.handleChange("rut")}
                        value={this.state.formValues.rut}
                      />
                    </FormGroup>
                    <Input type="submit" value="Buscar" />
                    <br></br>
                  </Form>
                </div1>
                {isFirstChange && !isLoading ? null : isFirstChange &&
                  isLoading ? (
                  Spinner
                ) : !isFirstChange && isFoundClient ? (
                  <React.Fragment>
                    <div2>
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
                    </div2>
                    <hr></hr>
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
                    <Label> Ningún cliente encontrado </Label>
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
