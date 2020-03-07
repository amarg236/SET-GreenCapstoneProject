import React, { Component } from "react";

import "../../../stylesheets/home.css";

class UserDashboard extends Component {
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
        <h1 className="display-4">Hello, USER!</h1>
        <p className="lead">This is a UserDashboard</p>
      </div>
    );
  }
}

export default UserDashboard;
