import React from "react";
import "./App.css";
import "./stylesheets/mediaQue.css";
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
import AddTeam from "./components/ManageTeam/AddTeam";
import AddDistrict from "./components/ManageTeam/AddDistrict";
import InviteToSystem from "./components/ManageUser/InviteToSystem";
import InviteAssignor from "./components/ManageUser/InviteAssignor";
import ManageUser from "./components/ManageUser/MangeUser";
import VerifyAccount from "./components/EmailConfirmation/VerifyAccount";
import ChangePassword from "./components/EmailConfirmation/ChangePassword";
import AcceptedGame from "./components/Project/AcceptedGame";
import ApprovedGame from "./components/Project/ApprovedGame";
import ShowAllUser from "./components/ManageUser/ShowAllUser";
import RequestedGames from "./components/Project/RequestedGame";
import RejectedGames from "./components/Project/RejectedGames";
import TestCreateGane from "./components/Project/TestCreateGame";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Layout style={{ height: "100vh", overflow: "hidden" }}>
          <SidebarComp />
          <Layout className="site-layout">
            <HeaderRoot />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                // path={queryString.stringifyUrl({
                //   url: "localhost:3000/api/auth/login",
                //   query: { u: "u" }
                // })}
                path="/api/auth/login"
                component={VerifyAccount}
              />
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
              <ProtectedRoute
                exact
                path="/changePassword"
                component={ChangePassword}
              />
              <ProtectedRoute exact path="/addSchool" component={AddSchool} />
              <ProtectedRoute
                exact
                path="/createGame"
                component={TestCreateGane}
              />
              <ProtectedRoute
                exact
                path="/acceptedGame"
                component={AcceptedGame}
              />
              <ProtectedRoute exact path="/viewGames" component={ViewGames} />
              <ProtectedRoute exact path="/addTeam" component={AddTeam} />
              <ProtectedRoute exact path="/manageUser" component={ManageUser} />
              <ProtectedRoute exact path="/allUsers" component={ShowAllUser} />
              <ProtectedRoute
                exact
                path="/rejectedGames"
                component={RejectedGames}
              />
              <ProtectedRoute
                exact
                path="/requestedGames"
                component={RequestedGames}
              />
              <ProtectedRoute
                exact
                path="/approvedGames"
                component={ApprovedGame}
              />
              <ProtectedRoute
                exact
                path="/inviteToSystem"
                component={InviteToSystem}
              />
              <ProtectedRoute
                exact
                path="/inviteAssignor"
                component={InviteAssignor}
              />

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

const mapStatetoProps = (state) => {
  return {
    role: state.userReducer.role,
  };
};

export default connect(mapStatetoProps)(App);
