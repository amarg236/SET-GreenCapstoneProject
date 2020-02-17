import React, { Component } from "react";

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
        <button className="btn btn-block" type="button" href="/createGame">
          CREATE GAME
        </button>
      </div>
    );
  }
}

export default ManageBox;
