import React, { Component } from "react";
import "../../stylesheets/manageBox.css";

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
      </div>
    );
  }
}

export default ManageBox;
