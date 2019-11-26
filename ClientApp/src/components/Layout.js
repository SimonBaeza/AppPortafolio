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

export default class Layout extends Component {
  //static displayName = Home.name;

  render() {
    //const ;
    return (
      <DebugRouter>
        <React.Fragment>
          <NavMenu />
          <div>
            <Switch>
              {Routes[Session.getUserRole()].map(r => {
                return (
                  <Route
                    key={r.label}
                    to={r.layout + r.path}
                    component={r.component}
                    path={r.layout + r.path}
                  />
                );
              })}
              {/* <Redirect from={"/" + Session.getUserRole()} to={"/" + Session.getUserRole() +"/Home"} /> */}
            </Switch>
          </div>
        </React.Fragment>
      </DebugRouter>
    );
  }
}
