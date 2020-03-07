import "../../stylesheets/home.css";
import React, { Component } from "react";
import Cal from "../Project/Cal";
import "../../stylesheets/home.css";
import UserDashboard from "./UserRoleView/UserDashboard";
import AssignorDashboard from "./UserRoleView/AssignorDashboard";
import AdminDashboard from "./UserRoleView/AssignorDashboard";

class LoggedInUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoggedIn: AuthToken.getAuthenticationStatus
    };
  }

  render() {
    // return <Cal />;
    //we are gonna put sliders and other contents in front page
    return (
      <div className="jumbotron">
        <h1 className="display-4">We will display depending upon user Roles</h1>
      </div>
    );
  }
}

export default LoggedInUser;
