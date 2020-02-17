import React, { Component } from "react";
import { Link } from "react-router-dom";

class ManageBox extends Component {
  render() {
    return (
      <div className="manageLayout">
        <button className="btn btn-block" type="button">
          MANAGE USER
        </button>
        <br />
        <button className="btn btn-block" type="button">
          MANAGE TEAM
        </button>
        <button className="btn btn-block" type="button">
          <Link to="/createGame">CREATE GAME</Link>
        </button>
      </div>
    );
  }
}

export default ManageBox;
