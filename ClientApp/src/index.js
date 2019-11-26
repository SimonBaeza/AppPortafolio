import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createBrowserHistory } from "history";
import Login from "./components/auth/Login";
import { Home } from "./components/Home";
import  Layout  from "./components/Layout";
import DebugRouter from "./DebugRouter";
import Session from "./components/auth/Session";
import { Register } from "./components/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

const history = createBrowserHistory();

ReactDOM.render (
  // <DebugRouter>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login}/>
        <ProtectedRoute path={ Session.layoutRoutes } component={ Layout }/>
        
        {/* <Route path="/1/register" component={Register}/> */}
        {/* <Route path={"/" + Session.getUserRole() } component={ Layout }/> */}
        {/* <Redirect from="/" to="/Login"/> */}
      </Switch>
    </Router>
  // </DebugRouter>
    , rootElement
);

registerServiceWorker();
