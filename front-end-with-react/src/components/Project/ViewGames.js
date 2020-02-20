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
        {
          //   "ADMIN".equals(AuthToken.getUserRole()) ? (
          //   <h1>Hello admin</h1>
          // ) : (
          //   <h1>Hello Non Admin</h1>
          // )
        }

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
