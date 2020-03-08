import "../../stylesheets/home.css";
import React, { Component } from "react";
import Cal from "../Project/Cal";
import "../../stylesheets/home.css";
import UserDashboard from "./UserRoleView/UserDashboard";
import AssignorDashboard from "./UserRoleView/AssignorDashboard";
import AdminDashboard from "./UserRoleView/AdminDashboard";
import { connect } from "react-redux";

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
    console.log(this.props.role);

    switch (this.props.role) {
      case "ADMIN":
        return <AdminDashboard />;

      case "USER":
        return <UserDashboard />;

      case "ASSIGNOR":
        return <AssignorDashboard />;
      default:
        return (
          <div>
            <div className="jumbotron">
              <h1 className="display-4">
                Sorry! Will are not a valid user. You will be logged out. Bye
                bye
              </h1>
            </div>
            <Cal />
          </div>
        );
    }
  }
}

const mapStatetoProps = state => {
  return {
    role: state.userReducer.role
  };
};

export default connect(mapStatetoProps)(LoggedInUser);
