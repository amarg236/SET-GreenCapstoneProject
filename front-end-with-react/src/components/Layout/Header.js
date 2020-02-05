import React, { Component } from "react";
import "../../stylesheets/header.css";
import GreenBackground from "./GreenBackground";
import ProfileButton from "../Buttons/ProfileButton";
import SettingsButton from "../Buttons/SettingsButton";
import NotificationButton from "../Buttons/NotificationButton";
import * as ReactBootstrap from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <div>
        <nav class="fixed-top navbar navbar-expand-lg navbar-light hdr">

          {/* Brand/logo */}
          <a class="navbar-brand dashboardNames" href="Dashboard.html">
            DASHBOARD <span class="sr-only">(current)</span></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">

              {/* Request Game link */}
              <li class="nav-item">
                <a class="nav-link dashboardNames"
                  href="/createGame">
                  Create Game </a>
              </li>

              {/* Approve Game link */}
              <li class="nav-item">
                <a class="nav-link dashboardNames"
                  href="/viewApiCall">
                  Approve Game</a>
              </li>

              {/* Manage Game link */}
              <li class="nav-item">
                <a class="nav-link dashboardNames"
                  href="//createGame">
                  Manage Game</a>
              </li>
            </ul>


            <ul className="navbar-nav ml-auto">
              {/* Notification bell icon */}
              <li class="nav-item dropdown">
                <a class="nav-link nav-button" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <NotificationButton />
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li>

              {/* Settings icon */}
              <li class="nav-item dropdown">
                <a class="nav-link nav-button" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <SettingsButton />
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li>

              {/* Userprofile icon */}
              <li class="nav-item dropdown">
                <a class="nav-link nav-button" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <ProfileButton />
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Something else here</a>
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
