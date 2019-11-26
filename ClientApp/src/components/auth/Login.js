import React, { Component } from "react";
//import { LoginScreen } from 'react-navigation-stack';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  CardBody,
  Media,
  Spinner
} from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import Session from "./Session";
import Logo from "./logoPortafolio.png";
import css from "../../login.css";
import Fondo from "../../img/fondo.jpg";
import { FaUserAlt, FaLock } from "react-icons/fa";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        run: "",
        password: "",
        id_role: ""
      },
      isLogged: false
    };
  }

  static navigationOptions = {
    //title: 'Welcome',
    header: { visible: false }
  };

  handleChange = name => event => {
    const { formValues } = this.state;
    formValues[name] = event.target.value;
    this.setState({ formValues });
  };

  handleSubmit(event) {
    event.preventDefault();
    const that = this;
    fetch("http://localhost:51424/api/users/login", {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.formValues)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          const newFormValues = { ...this.state.formValues };
          newFormValues.id_role = json.rol;
          const { run } = this.state.formValues;
          const { id_role } = this.state.formValues;
          Session.start(
            { run, id_role: json.rol },
            () => that.props.history.push("/" + Session.getUserRole() + "/Home")
            //<Redirect to = { "/" + Session.getUserRole() + "/Home"}></Redirect>
          );
          // this.setState({
          //   formValues: newFormValues,
          //   isLogged: json.success
          // });
        } else {
          <Label>Error al ingresar</Label>;
        }
      });
  }

  render() {
    // if (this.state.isLogged) {
    //   return <Redirect to={"/" + Session.getUserRole() + "/Home"} />;
    // }
    return (
      // background-repeat: no-repeat, repeat;
      
      <div
        className="App"
        style={{
          backgroundImage: "url(" + Fondo + ")",
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh"
        }}
      >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Container>
          <Row>
            <Col sm={{ size: 4, offset: 4 }}>
              <div>
                <center>
                  <img
                    className="logo"
                    src={Logo}
                    width="95"
                    height="100"
                  ></img>
                  <h3 style={{ fontFamily: "Source Sans Pro" }}>
                    Iniciar Sesión
                  </h3>
                </center>
                <hr />
                <Card className="shadow p-3 mb-5 bg-white rounded" id="card">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                      <FormGroup>
                        <FaUserAlt /> &nbsp;
                        <label>RUT </label>
                        <Input
                          type="text"
                          pattern="\d{0,99999999999}"
                          required
                          name="run"
                          id="run"
                          maxLength="9"
                          placeholder="Sin puntos ni guión"
                          // minLength="8"
                          onChange={this.handleChange("run")}
                          value={this.state.formValues.run}
                        />
                      </FormGroup>
                      <div className="form-group has-feedback">
                        <FaLock /> &nbsp;
                        <label>Contraseña</label>
                        <input
                          className="form-control"
                          type="password"
                          required
                          name="password"
                          id="password"
                          placeholder="****"
                          maxLength="255"
                          onChange={this.handleChange("password")}
                          value={this.state.formValues.password}
                        />
                        {/* <i className="fa fa-key icon form-control-feedback"></i> */}
                      </div>
                      <br />
                      <div class="row justify-content-center">
                        <Button style={{ backgroundColor: "#013C4C" }}>
                          Iniciar Sesión
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default withRouter(Login);
