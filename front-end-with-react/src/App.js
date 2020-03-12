import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Project/SignIn";
import Home from "./components/Layout/Home";
import CreateGame from "./components/Project/CreateGame";
import FooterComp from "./components/Layout/FooterComp";
import ProtectedRoute from "./Utility/protectedRoute";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cal from "./components/Project/Cal";
import ManageBox from "./components/Project/ManageBox";
import ViewGames from "./components/Project/ViewGames";
import UserProfile from "./components/Project/UserProfile";
import { connect } from "react-redux";
import HeaderRoot from "./components/Layout/HeaderRoot";
import LoggedInUserDashboard from "./components/Layout/LoggedInUser";
import history from "./Utility/history";
import SidebarComp from "./components/Layout/SidebarComp";
import { Layout, Breadcrumb, Content } from "antd";
import AddSchool from "./components/ManageTeam/AddSchool";
import AddDistrict from "./components/ManageTeam/AddDistrict";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Layout>
          <SidebarComp />
          <Layout className="site-layout">
            <HeaderRoot />
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoute
                exact
                path="/dashboard"
                component={LoggedInUserDashboard}
              />
              <ProtectedRoute
                exact
                path="/addDistrict"
                component={AddDistrict}
              />
              <ProtectedRoute exact path="/addSchool" component={AddSchool} />
              <ProtectedRoute exact path="/createGame" component={CreateGame} />
              <ProtectedRoute exact path="/viewGames" component={ViewGames} />
              <ProtectedRoute
                exact
                path="/userProfile"
                component={UserProfile}
              />
              <ProtectedRoute exact path="/calander" component={Cal} />
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
          </Layout>
        </Layout>
        <FooterComp />
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
