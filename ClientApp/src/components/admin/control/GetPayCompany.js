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

export class GetPayCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        rut: ""
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
    event.preventDefault();
    const newStates = { ...this.state };
    newStates.isFirstChange = false;
    newStates.isLoading = true;
    this.setState(newStates, () => {
      fetch(
        "http://localhost:51424/api/Pays/getPaysByCompany/" +
          this.state.formValues.rut,
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
        })
        .finally(() => {
          newStates.isLoading = false;
          this.setState(newStates);
        });
    });
  }

  render() {
    const isPayFound = this.state.data.length > 0;
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
              <h1> Buscar Pagos </h1>
              <hr />
              <div>
                <div1>
                  <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                      <Label for="rut">RUT</Label>
                      <Input
                        type="number"
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
                ) : !isFirstChange && !isLoading && isPayFound ? (
                  <React.Fragment>
                    <div2>
                      <Table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>RUT</th>
                            <th>Pago</th>
                            <th>Fecha del Pago</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data.map(element => {
                            var date = element.datePay.split("T");
                            return (
                              <tr>
                                <td>{element.id}</td>
                                <td>{element.idCompany}</td>
                                <td>{element.cost}</td>
                                <td>{DateUtil.toString(date[0])}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div2>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Label>No hay Pagos</Label>
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
