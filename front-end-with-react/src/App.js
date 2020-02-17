import React, { useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import ApproveGame from "./components/Project/ApproveGame";
import SignIn from "./components/Project/SignIn";
import Home from "./components/Layout/Home";
import CreateGame from "./components/Project/CreateGame";
import Footer from "./components/Layout/Footer";
import AdminDashboard from "./components/Layout/Admindashboard";
import ProtectedRoute from "./Utility/protectedRoute";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthToken from "./Utility/AuthToken";
import ManageBox from "./components/Project/ManageBox";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Container fluid={true} className="body-container-style">
            <Row noGutters={true} className="body-row-style">
              <Col md={2} sm={3} className="login-column">
                {AuthToken.getAuthenticationStatus() ? (
                  <ManageBox />
                ) : (
                  <SignIn />
                )}
              </Col>
              <Col md={10} sm={9} style={{ paddingLeft: "1%" }}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <ProtectedRoute
                    exact
                    path="/createGame"
                    component={CreateGame}
                  />
                  <Route exact path="/ApproveGame" component={ApproveGame} />
                  <Route exact path="/addProject" component={AddProject} />
                  <Route exact path="/signIn" component={SignIn} />
                  <Route path="*" component={() => "404 NOT FOUND"} />
                </Switch>
              </Col>
            </Row>
          </Container>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
