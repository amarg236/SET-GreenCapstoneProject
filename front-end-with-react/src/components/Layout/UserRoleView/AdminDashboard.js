import React, { Component } from "react";
import Cal from "../../Project/Cal";
import { Layout } from "antd";
const { Content } = Layout;
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
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580,
        }}
      >
        <div>
          <div className="jumbotron">
            <h1 className="display-4">Hello, ADMIN!</h1>
            <p className="lead">This is a Admin Dashboard</p>
          </div>
        </div>
      </Content>
    );
  }
}

export default AdminDashboard;
