import React, { Component, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Session from "../auth/Session";

export class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogout: true
    };
  }

  render() {
    if (this.state.isLogout) {
      Session.end();
      window.location.reload();
      return (
        //   <Redirect to={"/"} />
        <label></label>
      );
    }
    // handleShow();
    return (
      <label> </label>
    );
  }
}
//
