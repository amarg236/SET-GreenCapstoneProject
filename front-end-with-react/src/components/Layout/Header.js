import React, { Component } from "react";
import "../../stylesheets/header.css";
import GreenBackground from "./GreenBackground";
import ProfileButton from "../Buttons/ProfileButton";
import SettingsButton from "../Buttons/SettingsButton";
import NotificationButton from "../Buttons/NotificationButton";

class Header extends Component {
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
            <ul className="navbar-nav mr-auto">
              {/* Request Game link */}
              <li className="nav-item">
                <a className="nav-link dashboardNames" href="/createGame">
                  Create Game{" "}
                </a>
              </li>

              {/* Approve Game link */}
              <li className="nav-item">
                <a className="nav-link dashboardNames" href="/viewApiCall">
                  Approve Game
                </a>
              </li>

              {/* Manage Game link */}
              <li className="nav-item">
                <a className="nav-link dashboardNames" href="/createGame">
                  Manage Game
                </a>
              </li>
            </ul>

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
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
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

export default Header;
