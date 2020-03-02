import "../../stylesheets/home.css";
import React, { Component } from "react";
import Cal from "../Project/Cal";
import "../../stylesheets/home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoggedIn: AuthToken.getAuthenticationStatus
    };
  }

  render() {
    return <Cal />;
  }
}

export default Home;
