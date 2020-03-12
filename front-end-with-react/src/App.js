import React from "react";
import "./App.css";

//Redux
import { connect } from "react-redux";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

// Router Import
import { Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Project/SignIn";

// Components
import Home from "./components/Layout/Home";
import CreateGame from "./components/Project/CreateGame";
import FooterComp from "./components/Layout/FooterComp";
import ProtectedRoute from "./Utility/protectedRoute";
import Cal from "./components/Project/Cal";
import ManageBox from "./components/Project/ManageBox";
import ViewGames from "./components/Project/ViewGames";
import UserProfile from "./components/Project/UserProfile";
import HeaderRoot from "./components/Layout/HeaderRoot";
import LoggedInUserDashboard from "./components/Layout/LoggedInUser";
import history from "./Utility/history";
import SidebarComp from "./components/Layout/SidebarComp";

// AntDesign
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

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
