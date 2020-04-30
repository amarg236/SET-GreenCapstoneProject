import React from "react";
import "./App.css";
import "./stylesheets/mediaQue.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Switch, Route } from "react-router-dom";
import login from "./components/Project/TestLogin";
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
import Error404 from "./components/Layout/Error";
import ExportCSV from "./components/Project/ExportToCSV";
import TestPending from "./components/Project/TestPending";
import AdminViewGame from "./components/Project/AdminShowGames";
import AllGames from "./components/Project/AllGames";
import AllGamesAdmin from "./components/Project/AllGamesAdmin";
import AddNotice from "./components/ManageNotice/AddNotice";
import ViewNotice from "./components/ManageNotice/ViewNotice";
import AddGoodDay from "./components/ManageRestriction/AddGoodDay";
import AddBadDay from "./components/ManageRestriction/AddBadDay";
import AddEventDay from "./components/ManageRestriction/AddEventDay";
import GeneralCalendar from "./components/Project/GeneralCalendar";
import AdminCalendar from "./components/Project/AdminCalendar";
import AdminCreateGame from "./components/Project/AdminGameCreate";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Layout style={{ height: "100vh" }}>
          <SidebarComp />
          <Layout className="site-layout">
            {
              // <HeaderRoot />
            }

            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                // path={queryString.stringifyUrl({
                //   url: "localhost:3000/api/auth/login",
                //   query: { u: "u" }
                // })}
                path="/verify-account"
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
              <ProtectedRoute exact path="/createGame" component={CreateGame} />
              <ProtectedRoute
                exact
                path="/acceptedGame"
                component={AcceptedGame}
              />
              <ProtectedRoute exact path="/viewGames" component={TestPending} />
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
              <ProtectedRoute
                exact
                path="/adminViewGame"
                component={AdminViewGame}
              />
              <ProtectedRoute exact path="/viewNotice" component={ViewNotice} />
              <ProtectedRoute exact path="/addNotice" component={AddNotice} />
              <ProtectedRoute exact path="/viewAllGames" component={AllGames} />
              <ProtectedRoute
                exact
                path="/adminGameView"
                component={AllGamesAdmin}
              />
              <ProtectedRoute
                exact
                path="/addEventDay"
                component={AddEventDay}
              />
              <ProtectedRoute
                exact
                path="/calendarG"
                component={GeneralCalendar}
              />
              <ProtectedRoute
                exact
                path="/adminCalendar"
                component={AdminCalendar}
              />
              <ProtectedRoute
                exact
                path="/adminCreateGame"
                component={AdminCreateGame}
              />

              <ProtectedRoute exact path="/addBadDay" component={AddBadDay} />
              <ProtectedRoute exact path="/exportCSV" component={ExportCSV} />
              <ProtectedRoute exact path="/calendarP" component={Cal} />
              <ProtectedRoute exact path="/AddGoodDay" component={AddGoodDay} />
              <Route exact path="/login" component={login} />
              <Route path="*" component={Error404} />
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
