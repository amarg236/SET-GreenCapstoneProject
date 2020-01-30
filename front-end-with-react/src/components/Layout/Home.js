import React, { Component } from "react";
import SignIn from "../Project/SignIn";
import Cal from "../Project/Cal";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../stylesheets/home.css";

class Home extends Component {
  render() {
    return (
      <div style={{position:'absolute', top:'125px', 
      maxWidth:"100%", maxHeight:"100%",}} 
      className='layout'>
        <Container>
          <Row>
            <Col sm = {{span: '4',}}>
              <SignIn />
            </Col>
            
            <Col sm = {{span: '8', }} style={{alignContent: 'right'}}>
              <Cal />
            </Col>
            </Row> 
        </Container>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
  }
}

export default Home;