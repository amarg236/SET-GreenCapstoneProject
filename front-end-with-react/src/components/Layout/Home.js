import React, { Component } from "react";
import SignIn from "../Project/SignIn";
import Cal from "../Project/Cal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../stylesheets/home.css";
import ManageBox from "../Project/ManageBox";

class Home extends Component {
  render() {
    return (
      <div className="layout">
        <Container>
          <Row>
            <Col sm={{ span: "4" }}>
              <SignIn />
              <ManageBox />
            </Col>

            <Col sm={{ span: "8" }} style={{ paddingLeft: "10vh" }}>
              <Cal />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
