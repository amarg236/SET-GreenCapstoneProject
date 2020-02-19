import React, { Component } from "react";
import { Link } from "react-router-dom";

class ManageBox extends Component {
  render() {
    return (
      <div className="manageLayout">
        <button className="btn btn-success btn-block" type="button">
          MANAGE USER
        </button>
        <button className="btn btn-success btn-block" type="button">
          <Link to="/userProfile">USER PROFILE</Link>
        </button>
        <button className="btn btn-success btn-block" type="button">
          <Link to="/createGame">CREATE GAME</Link>
        </button>
        <button className="btn btn-success btn-block" type="button">
          <Link to="/viewGames">VIEW GAMES</Link>
        </button>
      </div>
    );
  }
}

export default ManageBox;
