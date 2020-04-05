import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import AssignorGames from "./AssignorGames";
import PendingGame from "./PendingGames";
import ShowUserPendingGames from "./ShowUserPendingGames";
import AdminShowGames from "./AdminShowGames";
import AcceptedGame from "./AcceptedGame";
import { connect } from "react-redux";
import { Layout } from "antd";
const { Content } = Layout;

class ViewGames extends Component {
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
            className="AdminMediaVG"
            style={{
              padding: 5,
              margin: 0,
              minHeight: 580,
            }}
            className=" site-layout-background"
          >
            <AdminShowGames />
            <AcceptedGame />
          </Content>
        );

      case "USER":
        return (
          <Content
            className="UserMediaVG"
            style={{
              padding: 5,
              margin: 0,
              minHeight: 580,
            }}
          >
            <PendingGame />
          </Content>
        );

      case "ASSIGNOR":
        return (
          <Content
            className="AssignorMediaVG"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 580,
            }}
            className=" site-layout-background"
          >
            <ShowUserPendingGames />
            <AcceptedGame />
          </Content>
        );
      default:
        return (
          <Content
            className="DefaultMediaVG"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 580,
            }}
            className="site-layout-background"
          >
            <h1 className="display-4">
              Sorry! Will are not a valid user. You will be logged out. Bye bye
            </h1>
          </Content>
        );
    }
  }
}

const mapStatetoProps = (state) => {
  return {
    role: state.userReducer.role,
    mySchool: state.userReducer.mySchool,
    schoolDistrict: state.userReducer.schoolDistrict,
  };
};

export default connect(mapStatetoProps)(ViewGames);
