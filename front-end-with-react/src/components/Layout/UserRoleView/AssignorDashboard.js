import "../../../stylesheets/home.css";
import React, { Component } from "react";

class AssignorDashboard extends Component {
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
        <h1 className="display-4">Hello, ASSIGNOR!</h1>
        <p className="lead">This is a Assignor Dashboard</p>
      </div>
    );
  }
}

export default AssignorDashboard;
