import React, { Component } from "react";
import "../../stylesheets/header.css";
import GreenBackground from "./GreenBackground";
import ProfileButton from "../Buttons/ProfileButton";
import SettingsButton from "../Buttons/SettingsButton";
import NotificationButton from "../Buttons/NotificationButton";

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm mb-4">
          
          <div className='dashboard'>
            <a className="navbar-brand dashboardNames" href="Dashboard.html">
              DASHBOARD
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button> 
            </div>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">

                {/* Request Game link */}
                <li className="nav-item">
                  <a className="nav-link dashboardNames dashboardSeperator" href="/createGame">
                    Request Game
                  </a>
                </li>
                
                {/* Approve Game link */}
                <li className="nav-item">
                  <a className="nav-link dashboardNames dashboardSeperator" href="/viewApiCall">
                    Approve Game
                  </a>
                </li>

                {/* Manage Team link */}
                <li className="nav-item">
                  <a className="nav-link dashboardNames" href="/createGame">
                    Manage Team
                  </a>
                </li>
              </ul>

              <ul className="navbar-nav ml-auto">

                {/* Notification bell icon */}
              <li className="nav-item nav-button">
                  <NotificationButton />
                </li>

                {/* Settings icon */}
              <li className="nav-item nav-button">
                  <SettingsButton />
                </li>

                {/* Userprofile icon */}
                <li className="nav-item nav-button">
                  <ProfileButton />
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
