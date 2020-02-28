import React, { Component } from "react";
import Authtoken from "../../Utility/AuthToken";
import { withRouter } from "react-router-dom";
import "../../stylesheets/header.css";
import GreenBackground from "./GreenBackground";
import ProfileButton from "../Buttons/ProfileButton";
import SettingsButton from "../Buttons/SettingsButton";
import NotificationButton from "../Buttons/NotificationButton";

class Header extends Component {
  // constructor(props) {
  //   super(props);
  //   this.logout = this.logout.bind(this);
  // }

  logout = async () => {
    await Authtoken.logOut();
    await this.props.history.push("/");
    window.location.reload();
  };

  render() {
    return (
      <div style={{ marginBottom: "5%" }}>
        <nav className="fixed-top navbar navbar-expand-lg navbar-light hdr">
          {/* Brand/logo */}
          <a className="navbar-brand dashboardNames" href="/">
            DASHBOARD <span className="sr-only">(current)</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

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
        </nav>
        <GreenBackground />
      </div>
    );
  }
}

export default withRouter(Header);
