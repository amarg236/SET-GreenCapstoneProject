import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import ApprovedGames from "./ApprovedGames";
import PendingGame from "./PendingGames";
import FullyApprovedGames from "./FullyApprovedGames";
import AuthToken from "../../Utility/AuthToken";

class ViewGames extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PendingGame />
        <br />
        <ApprovedGames />
        <br />
        <FullyApprovedGames />
      </div>
    );
  }
}

export default ViewGames;
