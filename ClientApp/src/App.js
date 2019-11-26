import React, { Component } from "react";
import { ReactStrap } from "reactstrap";
import { Route } from "react-router";
import  Layout  from "./components/Layout";
import { Home } from "./components/Home";
import { Register } from "./components/auth/Register";
import  Login  from "./components/auth/Login";
import { GetAllUsers } from "./components/admin/GetAllUsers";
import { UpdateUser } from "./components/admin/UpdateUser";
import { RegisterCompany } from "./components/admin/RegisterCompany";
import { GetUsersId } from "./components/admin/GetUsersId";
import { GetAllCompanies } from "./components/admin/maintainerCompany/GetAllCompanies";
import { GetCompanyRut } from "./components/admin/maintainerCompany/GetCompanyRut";
import { UpdateCompany } from "./components/admin/maintainerCompany/UpdateCompany";
import { HomeProfesional } from "./components/profesional/HomeProfesional";
import { HomeClient } from "./components/client/HomeClient";
import { DoContract } from "./components/admin/maintainerContract/DoContract";
import { GetAllContracts } from "./components/admin/maintainerContract/GetAllContracts";
import { GetContractRut } from "./components/admin/maintainerContract/GetContractRut";
import { UpdateContract } from "./components/admin/maintainerContract/UpdateContract";
import { ReportAccident } from "./components/client/ReportAccident";
import { RequestACtivities } from "./components/client/RequestActivities";

export default class App extends Component {
  //static displayName = App.name();
  render() {
    return (
      <Layout>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />

        <Route path="/Home" component={Home} />
        <Route path="/HomeClient" component={HomeClient} />
        <Route path="/HomeProfesional" component={HomeProfesional} />

        <Route path="/register" component={Register} />
        <Route path="/getAllUsers" component={GetAllUsers} />
        <Route path="/getUsersId" component={GetUsersId} />
        <Route path="/updateUser" component={UpdateUser} />

        <Route path="/registerCompany" component={RegisterCompany} />
        <Route path="/getAllCompanies" component={GetAllCompanies} />
        <Route path="/getCompanyRut" component={GetCompanyRut} />
        <Route path="/updateCompany" component={UpdateCompany} />

        <Route path="/doContract" component={DoContract} />
        <Route path="/getAllContracts" component={GetAllContracts} />
        <Route path="/getContractRut" component={GetContractRut} />
        <Route path="/updateContract" component={UpdateContract} />

        {/* Client */}
        <Route path="/reportAccident" component={ReportAccident} />
        <Route path="/requestACtivities" component={RequestACtivities} /> 
      </Layout>
    );
  }
}
