import "../../stylesheets/home.css";
import React, { Component } from "react";
import Cal from "../Project/Cal";
import "../../stylesheets/home.css";
import UserDashboard from "./UserRoleView/UserDashboard";
import AssignorDashboard from "./UserRoleView/AssignorDashboard";
import AdminDashboard from "./UserRoleView/AdminDashboard";
import { connect } from "react-redux";
import { Layout } from "antd";
const { Content } = Layout;

class LoggedInUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoggedIn: AuthToken.getAuthenticationStatus
    };
  }

  render() {
    //we are gonna put sliders and other contents in front page
    console.log(this.props.role);

    switch (this.props.role) {
      case "ADMIN":
        return (
          <Content
            style={{
              padding: 5,
              margin: 0,
              minHeight: 580
            }}
            className=" site-layout-background"
          >
            <AdminDashboard />
          </Content>
        );

      case "USER":
        return (
          <Content
            style={{
              padding: 3,
              margin: 0,
              minHeight: 580
            }}
            className="site-layout-background"
          >
            <UserDashboard />
          </Content>
        );

      case "ASSIGNOR":
        return (
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 580
            }}
            className=" site-layout-background"
          >
            <AssignorDashboard />
          </Content>
        );
      default:
        return (
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 580
            }}
            className="site-layout-background"
          >
            <h1 className="display-4">
              Sorry! Will are not a valid user. You will be logged out. Bye bye
            </h1>
            <Cal />
          </Content>
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
