import "../../stylesheets/home.css";
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
            <Col sm={{ span: "4" }} className="login-column">
              {/*Log in Heading  */}
              <div
                style={{
                  backgroundColor: "#6B9712",
                  textAlign: "center",
                  color: "#ffffff"
                }}
              >
                <h3
                  style={{
                    padding: "3%"
                  }}
                >
                  Login
                </h3>
              </div>
              <SignIn />
              <hr />
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
