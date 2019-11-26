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
import { DateUtil } from "../../Utils";

export class GetPDFConsultation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        id: ""
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
        "http://localhost:51424/api/Consultations/getConsultationByID/" +
          this.state.formValues.id,
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
    const isConsultationFound = this.state.data.length > 0;
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
          <Col lg={{ size: 9, offset: 2 }}>
            <Jumbotron>
              <h1> Ingrese la Asesoría para PDF </h1>
              <hr />
              <div>
                <div3>
                  <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                      <Label for="id">ID</Label>
                      <Input
                        type="number"
                        required
                        name="id"
                        id="id"
                        placeholder="1"
                        onChange={this.handleChange("id")}
                        value={this.state.formValues.id}
                      />
                    </FormGroup>
                    <Input type="submit" value="Buscar" />
                    <br></br>
                  </Form>
                </div3>
                {isFirstChange && !isLoading ? null : !isFirstChange &&
                  isLoading ? (
                  Spinner
                ) : !isFirstChange && !isLoading && isConsultationFound ? (
                  <React.Fragment>
                    <div1>
                      <h1>Asesoría a PDF</h1>
                    </div1>
                    <div2>
                      <Table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Fecha </th>
                            <th>Hora</th>
                            <th>Resumen</th>
                            <th>Estado</th>
                            <th>Profesional a Cargo</th>
                            <th>Cliente</th>
                            <th>Extra</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data.map(element => {
                            var date = element.dateAsesory.split("T");
                            var date2 = date[1];
                            var time = date2.split(":");
                            return (
                              <tr>
                                <td>{element.id}</td>
                                <td>{element.name}</td>
                                <td>{DateUtil.toString(date[0])}</td>
                                <td>{time[0] + ":" + time[1]}</td>
                                <td>{element.resumen}</td>
                                <td>{element.status}</td>
                                <td>{element.idProfesional}</td>
                                <td>{element.rutCompany}</td>
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
                    <Label>No existe Asesoría</Label>
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
