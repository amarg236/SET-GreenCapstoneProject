import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import ApprovedGames from "./ApprovedGames";
import PendingGame from "./PendingGames";
import FullyApprovedGames from "./FullyApprovedGames";
import ShowGames from "./ShowGames";
import { Layout } from "antd";
const { Content } = Layout;

class WorkingVersion extends Component {
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
        {
          <div>
            <PendingGame />
            <br />
            <ApprovedGames />
            <br />
            <FullyApprovedGames />
          </div>
        }
        {
          // <h4 style={{ textAlign: "center" }}>View Pending Games</h4>
          // <ShowGames />
        }
      </Content>
    );
  }
}

export default WorkingVersion;
