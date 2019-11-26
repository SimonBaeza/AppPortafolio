import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  CardBody,
  Alert,
  Button
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Session from "../auth/Session";

export class CheckListMyConsultation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        run: Session.getUser().run,
        id: "",
        name: "",
        date_asesory: "",
        time_asesory: "",
        resumen: "",
        id_profesional: "",
        rut_company: "",
        status: ""
      },
      data: [],
      isUpdate: false,
      isFound: false
    };
  }

  handleChange = name => event => {
    //console.log("llegue");
    const { formValues } = this.state;
    formValues[name] = event.target.value;
    this.setState({ formValues });

    if (name == "run") {
      this.state.data.forEach(element => {
        if (element.run == this.state.formValues.run) {
          let dataToSet = {
            id: element.id,
            name: element.name,
            date_asesory: element.date_asesory,
            resumen: element.resumen,
            id_profesional: element.id_profesional,
            rut_company: element.rut_company,
            status: element.status
          };
          this.setState({ formValues: dataToSet });
        }
      });
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    //console.log(this.state.formValues.rut);

    fetch(
      "http://localhost:51424/api/Consultations/updateConsultation/" +
        this.state.formValues.id,
      {
        method: "post",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.formValues)
      }
    )
      .then(response => response.json())
      .then(json => this.setState({ isUpdate: json.success }));
  }

  componentWillMount() {
    //event.preventDefault();
    fetch(
      "http://localhost:51424/api/Consultations/getConsultationByRunProfesional/" +
        this.state.formValues.run,
      {
        method: "get",
        mode: "cors"
      }
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json,
          formValues: {
            id: json[0].id,
            name: json[0].name,
            date_asesory: json[0].dateAsesory,
            resumen: json[0].resumen,
            id_profesional: json[0].idProfesional,
            rut_company: json[0].rutCompany,
            status: json[0].status
          }
        });
        console.log(this.state.formValues);
      })
      .catch(e => console.log(e.message));
  }

  render() {
    if (this.state.isUpdate) {
      return <Alert color="primary"><center>Check Realizado </center></Alert>;
    }

    return (
      <Container>
        <Row>
          <Col lg={{ size: 8 , offset: 2}}>
            <Jumbotron>
              <h1> Asesoría</h1>
              <hr />
              <div>
                <Input
                  type="select"
                  ref="asesory"
                  required
                  onChange={this.handleChange("id")}
                >
                  {/* <option disabled selected> Mis Asesoría </option> */}
                  {this.state.data.map(asesory => {
                    return (
                      <React.Fragment>
                        {/* <option   disabled selected value={asesory.id}> {asesory.name} </option> */}
                        <option value={asesory.id}> {asesory.name} </option>
                      </React.Fragment>
                    );
                  })}
                </Input>
                <br></br>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                  <h3> Finalizar Tareas </h3>

                  <Label> ID </Label>
                  <Input readOnly value={this.state.formValues.id}></Input>
                  <br></br>

                  <FormGroup>
                    <Label for="name">Nombre</Label>
                    <Input
                      type="text"
                      required
                      name="name"
                      id="name"
                      placeholder="Mejora de Iluminicaciòn"
                      onChange={this.handleChange("name")}
                      value={this.state.formValues.name}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Estado</Label>
                    <Input
                      type="select"
                      for="status"
                      required
                      onChange={this.handleChange("status")}
                    >
                      Estado
                      <option
                        disabled
                        selected
                        value={this.state.formValues.status}
                      >
                        {this.state.formValues.status}
                      </option>
                      <option value="Terminado"> Terminado </option>
                      <option value="Cancelado"> Cancelado </option>
                    </Input>
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

                  <div class="row justify-content-center">
                    <Button style={{ backgroundColor: "#5e8f3c" }}>
                      Finalizar
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
