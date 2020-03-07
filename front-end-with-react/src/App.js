import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Project/SignIn";
import Home from "./components/Layout/Home";
import CreateGame from "./components/Project/CreateGame";
import Footer from "./components/Layout/Footer";
import ProtectedRoute from "./Utility/protectedRoute";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ManageBox from "./components/Project/ManageBox";
import ViewGames from "./components/Project/ViewGames";
import UserProfile from "./components/Project/UserProfile";
import { connect } from "react-redux";
import HeaderRoot from "./components/Layout/HeaderRoot";
import LoggedInUserDashboard from "./components/Layout/LoggedInUser";
import history from "./Utility/history";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <HeaderRoot />
          <Container fluid={true} className="body-container-style">
            <Row
              noGutters={true}
              className="body-row-style justify-content-sm-center"
            >
              <Col lg={3} md={4} sm={10} className="login-column">
                {this.props.role ? <ManageBox /> : <SignIn />}
              </Col>
              <Col lg={9} md={8} sm={10} style={{ paddingLeft: "1%" }}>
                <div
                  className="auth-inner"
                  style={{ paddingLeft: "3%", paddingRight: "3%" }}
                >
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <ProtectedRoute
                      exact
                      path="/dashboard"
                      component={LoggedInUserDashboard}
                    />
                    <ProtectedRoute
                      exact
                      path="/createGame"
                      component={CreateGame}
                    />
                    <ProtectedRoute
                      exact
                      path="/viewGames"
                      component={ViewGames}
                    />
                    <ProtectedRoute
                      exact
                      path="/userProfile"
                      component={UserProfile}
                    />
                    <Route path="*" component={() => "404 NOT FOUND"} />
                  </Switch>
                </div>
              </Col>
            </Row>
          </Container>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStatetoProps = state => {
  return {
    role: state.userReducer.role
  };
};

export default connect(mapStatetoProps)(App);
