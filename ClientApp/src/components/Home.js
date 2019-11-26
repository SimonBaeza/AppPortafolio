import React, { Component } from "react";
import { NavMenu } from "./NavMenu";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Routes } from "../Routes";
import Session from "./auth/Session";
import DebugRouter from "../DebugRouter";
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
  CardBody
} from "reactstrap";

export class Home extends Component {
  //static displayName = Home.name;

  render() {
    //const ;
    return (
      <Container>
        <Row>
          <Col lg="12">
            <Jumbotron>
              <h1> Bienvenido a No más Accidentes</h1>
              <br></br>
              <br></br>
              <h4>
                La empresa está compuesta por varios profesionales, quienes
                están a cargo de la atención de los diferentes clientes que
                tienen.<br></br>
                <br></br>
                Como empresa en conjunto con los mejores profesionales,
                ofrecemos asesorías y visitas por parte de capacitaciones a
                diferentes riesgos.
              </h4>
            </Jumbotron>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <center>
          <Label> &copy; 2019 Todos los derechos Reservados </Label>
        </center>
      </Container>
    );
  }
}
