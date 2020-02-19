import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import ApprovedGames from "./ApprovedGames";
import PendingGame from "./PendingGames";

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
      </div>
    );
  }
}

export default ViewGames;
