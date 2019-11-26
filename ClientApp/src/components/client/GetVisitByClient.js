import React, { Component } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  CardBody
} from "reactstrap";
import Session from "../auth/Session";
import { DateUtil } from "../../Utils";

export class GetVisitByClient extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      formValues: {
        run: Session.getUser().run
      },
      data: [],
      isLoading: false
    })
  }

  componentWillMount() {
    const newStates = { ...this.states };
    newStates.isLoading = true;
    this.setState(newStates, () => {
      fetch(
        "http://localhost:51424/api/Visits/getVisitsByCompany/" +
          this.state.formValues.run,
        {
          method: "get",
          mode: "cors"
        }
      )
        .then(response => response.json())
        .then(json =>{
          newStates.data = json;
        })
        .catch(e => console.log(e.message))
        .finally( () => {
          newStates.isLoading = false;
          this.setState(newStates);
        });
    })
    
  }

  render() {

    if (this.state.data.length == 0 && !this.state.isLoading) {
      return (
        <Container>
          <Row>
            <Col lg={{ size: 4, offset: 4 }}>
              <Jumbotron>
                <h3>No hay datos</h3>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container>
        <Row>
          <Col lg="12">
            <Jumbotron>
              <h1>Mis Visitas</h1>
              <hr />
              <div>
                <div1></div1>
                <div2>
                  <Table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Profesional</th>
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
                            <td>{element.idCompany}</td>
                            <td>{element.idProfessional}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div2>
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}
