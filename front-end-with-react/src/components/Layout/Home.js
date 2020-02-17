import "../../stylesheets/home.css";
import React, { Component } from "react";
import SignIn from "../Project/SignIn";
import Cal from "../Project/Cal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../stylesheets/home.css";
import ManageBox from "../Project/ManageBox";
import AuthToken from "../../Utility/AuthToken";
import CreateGame from "../Project/CreateGame";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    // isLoggedIn: AuthToken.getAuthenticationStatus
    };
  }

  render() {
    return <CreateGame />;
  }
}

export default Home;
