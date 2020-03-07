import React, { Component } from "react";
import "../../../stylesheets/home.css";

class AdminDashboard extends Component {
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
        <h1 className="display-4">Hello, ADMIN!</h1>
        <p className="lead">This is a Admin Dashboard</p>
      </div>
    );
  }
}

export default AdminDashboard;
