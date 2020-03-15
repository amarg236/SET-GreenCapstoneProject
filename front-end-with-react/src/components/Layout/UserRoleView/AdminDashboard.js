import React, { Component } from "react";
import Cal from "../../Project/Cal";

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
      <div>
        <h1>Hello, ADMIN!</h1>
        <p>This is a Admin Dashboard</p>
      </div>
    );
  }
}

export default AdminDashboard;
