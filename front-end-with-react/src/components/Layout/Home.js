import React, { Component } from "react";
import Cal from "../Project/Cal";
import "../../App.css";
import "../../stylesheets/layout.css";
import { Layout, Carousel } from "antd";

const { Content } = Layout;

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
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580
        }}
      >
        <Carousel autoplay>
          <div>
            <h3>Welcome to the Home Page</h3>
          </div>
          <div>
            <h3>These slides are just for demo</h3>
          </div>
          <div>
            <h3>These slides are just for demo</h3>
          </div>
          <div>
            <h3>These slides are just for demo</h3>
          </div>
        </Carousel>
      </Content>
    );
  }
}

export default Home;
