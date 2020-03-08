import "../../stylesheets/home.css";
import React, { Component } from "react";

import "../../stylesheets/home.css";

class Home extends Component {
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
        <div className="jumbotron">
          <h1 className="display-4">Hello, Everybody!</h1>
          <p className="lead">
            This is a sample home page . We will add sliders and other contains
            in days to come.
          </p>
          <hr className="my-4" />
          <p>Click on the button below to go to the documentation Link.</p>
          <p className="lead">
            <a
              className="btn btn-primary btn-lg"
              href="https://d3dqstghi7h8sb.cloudfront.net/swagger-ui.html"
              target="_blank"
              role="button"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
