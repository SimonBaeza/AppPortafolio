import React, { Component } from "react";
import { Label } from "reactstrap";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import Session from "../components/auth/Session";
import { Routes } from "../Routes";
import Logo from "./auth/logoPortafolio.png";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
    var arChupa = [];
    for (const key in Routes[Session.getUserRole()]) {
      const item = Routes[Session.getUserRole()][key];
      if (!arChupa.includes(item.belong)) {
        arChupa.push(item.belong);
      }
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      role: Session.getUserRole(),
      categories: arChupa
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  navItem = (
    <React.Fragment>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Usuarios
        </DropdownToggle>
        <DropdownMenu right>
          {Routes[Session.getUserRole()].map(m => (
            <NavItem key={m.label}>
              <NavLink tag={Link} className="text-dark" to={m.layout + m.path}>
                {m.label}
              </NavLink>
            </NavItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </React.Fragment>
  );

  render() {
    return (
      <header>
        <Navbar
          style={{ backgroundColor: "#5e8f3c"}}
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to={"/" + Session.getUserRole() + "/Home"}>
            <img src={Logo} width="85" height="70"></img>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                {this.state.categories.map(name => (
                  <UncontrolledDropdown nav inNavbar >
                    <DropdownToggle nav caret>
                      {name}
                    </DropdownToggle>
                    <DropdownMenu right>
                      {Routes[Session.getUserRole()]
                        .filter(i => i.belong == name)
                        .map(item => (
                          <NavItem key={item.label} >
                            <NavLink
                              tag={Link}
                              className="text-dark"
                              to={item.layout + item.path}
                            >
                              {item.label}
                            </NavLink>
                          </NavItem>
                        ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ))}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
