import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../stylesheets/header.css";
import GreenBackground from "./GreenBackground";
import ProfileButton from "../Buttons/ProfileButton";
import SettingsButton from "../Buttons/SettingsButton";
import NotificationButton from "../Buttons/NotificationButton";
import { connect } from "react-redux";
import { logoutAction } from "../../actions/loginAction";

class Header extends Component {
  logout = async () => {
    this.props.logout();
  };

  render() {
    return (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {/* Notification bell icon */}
          <li className="nav-item dropdown">
            <div className="nav-link nav-button">
              <NotificationButton />
            </div>
          </li>

          {/* Settings icon */}
          <li className="nav-item dropdown">
            <div className="nav-link nav-button">
              <SettingsButton />
            </div>
          </li>

          {/* Userprofile icon */}
          <li className="nav-item dropdown">
            <div
              className="nav-link nav-button"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <ProfileButton />
            </div>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <a className="dropdown-item" href="#">
                View Profile
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#" onClick={this.logout}>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutAction())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Header));
