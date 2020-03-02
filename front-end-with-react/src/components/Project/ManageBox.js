import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ManageBox extends Component {
  render() {
    return (
      <div className="manageLayout">
        <div className="alert alert-primary" role="alert">
          <p>
            <i>Username:</i> {this.props.username}
          </p>
          <b>{this.props.role}</b>
        </div>
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
const mapStatetoProps = state => {
  return {
    username: state.userReducer.username,
    role: state.userReducer.role
  };
};
export default connect(mapStatetoProps)(ManageBox);
