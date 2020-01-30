import React, { Component } from "react";
import SignIn from "../Project/SignIn";
import Cal from "../Project/Cal";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Home extends Component {
  render() {
    return (
        <Container style={{position:'absolute', top:'125px', maxWidth:"100%", maxHeight:"100%"}}>
          <Row>
            <Col md = {{span: '3', offset: '1'}} style={{height:'100vh', backgroundColor:'purple'}}>
              <SignIn />
            </Col>
            <Col> </Col>
            <Col md = {{span: '7', }}>
              <Cal />
            </Col>
            </Row> 
        </Container>
    );
  }
}

export default Home;