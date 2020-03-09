import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import ApprovedGames from "./ApprovedGames";
import PendingGame from "./PendingGames";
import FullyApprovedGames from "./FullyApprovedGames";
import { Layout } from "antd";
const { Content } = Layout;

class ViewGames extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580
        }}
        className="site-layout-background"
      >
        <div>
          <PendingGame />
          <br />
          <ApprovedGames />
          <br />
          <FullyApprovedGames />
        </div>
      </Content>
    );
  }
}

export default ViewGames;
