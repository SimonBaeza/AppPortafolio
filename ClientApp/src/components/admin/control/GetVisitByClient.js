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

export class GetVisitByClient2 extends Component {
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
        "http://localhost:51424/api/Visits/getVisitByClient/" +
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
    const isVisitFound = this.state.data.length > 0;
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
              <h1> Buscar Visitas por Cliente </h1>
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
                {isFirstChange && !isLoading ? null : !isFirstChange &&
                  isLoading ? (
                  Spinner
                ) : !isFirstChange && !isLoading && isVisitFound ? (
                  <React.Fragment>
                    <div2>
                      <Table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Estado</th>
                            <th>Cliente</th>
                            <th>Profesional</th>
                            <th>Extra</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data.map(element => {
                            var date = element.dateVisit.split("T");
                            var date2 = date[1];
                            var time = date2.split(":");
                            return (
                              <tr>
                                <td>{element.id}</td>
                                <td>{element.name}</td>
                                <td>{DateUtil.toString(date[0])}</td>
                                <td>{time[0] + ":" + time[1]}</td>
                                <td>{element.status}</td>
                                <td>{element.idCompany}</td>
                                <td>{element.idProfessional}</td>
                                <td>{element.extra}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div2>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Label>No hay visitas</Label>
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
