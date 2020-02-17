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
    return (
      <Container fluid={true} className="body-container-style">
        <Row noGutters={true} className="body-row-style">
          <Col md={2} sm={3} className="login-column">
            {AuthToken.getAuthenticationStatus() ? <ManageBox /> : <SignIn />}
          </Col>
          <Col md={10} sm={9} style={{ paddingLeft: "1%" }}>
            <Cal />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
