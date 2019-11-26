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
import { DateUtil } from "../../../Utils";
//import { Form } from 'reactstrap';

export class GetContractRut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        rut_company: "",
        id: ""
      },
      id_company: "",
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
    const newStates = { ...this.state};
    newStates.isLoading = true;
    newStates.isFirstChange = false;
    event.preventDefault();
    this.setState(newStates, () =>{
      fetch(
        "http://localhost:51424/api/Contracts/getContract/" +
          this.state.formValues.rut_company,
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
          newStates.id_company = json.id;
          newStates.isLoading = false;
          this.setState(newStates);
        });
    });
    
  }

  handleSubmitDelete(event) {
    
    event.preventDefault();
    fetch(
      "http://localhost:51424/api/Contracts/deleteContract/" +
        this.state.id_company,
      {
        method: "post",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.id_company)
      }
    )
      .then(response => response.json())
      .then(json =>
        this.setState({
          data: []
        })
      );
  }

  render() {
    const isContractFound = this.state.data.length > 0;
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
              <h1> Buscar Contrato </h1>
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
                        onChange={this.handleChange("rut_company")}
                        value={this.state.formValues.rut_company}
                      />
                    </FormGroup>
                    <Input type="submit" value="Buscar" />
                    <br></br>
                  </Form>
                </div1>
                {isFirstChange && !isLoading ? null : isFirstChange &&
                  isLoading ? (
                  Spinner
                ) : !isLoading && !isFirstChange && isContractFound ? (
                  <React.Fragment>
                    <div2>
                      <Table>
                        <thead>
                          <tr>
                            <th>RUT</th>
                            <th>Precio</th>
                            <th>Cantidad de Visitas</th>
                            <th>Cantidad de Asesorías</th>
                            <th>Fecha de Expiración</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data.map(element => {
                            var date = element.dateExpired.split("T");
                            return (
                              <tr>
                                <td>{element.rutCompany}</td>
                                <td>{element.price}</td>
                                <td>{element.numberVisit}</td>
                                <td>{element.numberAsesory}</td>
                                <td>{DateUtil.toString(date[0])}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div2>
                    <hr />
                    <br />
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
                    <Label>No se ha encontrado algún contrato</Label>
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
