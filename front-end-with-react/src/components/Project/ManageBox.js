import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthToken from "../../Utility/AuthToken";

class ManageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: AuthToken.getUserRole()
    };
  }

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
