import "../../../stylesheets/home.css";
import React, { Component } from "react";
import Cal from "../../Project/Cal";
import Noticeboard from "../../Project/Noticeboard.js";
import { Layout } from "antd";
import { Anchor } from 'antd';

const { Link } = Anchor;
const { Content } = Layout;

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
          <p className="lead">Today is {new Date().toDateString()}</p>
          <Anchor>
          <Link href='http://lhsaa.org/home' title="LHSAA website" />
          </Anchor>
          </div>
          <Noticeboard />
        </div>
      </Content>
    );
  }
}
export default AssignorDashboard;
