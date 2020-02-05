import React, { Component } from "react";
<<<<<<< HEAD
=======
import "../../stylesheets/header.css";
import GreenBackground from "./GreenBackground";
import ProfileButton from "../Buttons/ProfileButton";
import SettingsButton from "../Buttons/SettingsButton";
import NotificationButton from "../Buttons/NotificationButton";
import * as ReactBootstrap from 'react-bootstrap';
>>>>>>> e505ed2037c1514a6da0dcc3408858c573ca45ef

class Header extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
          <div className="container">
            <a className="navbar-brand" href="Dashboard.html">
              SET-Green Capstone Project
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/viewApiCall">
                    Work with API
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/createGame">
                    Add Game
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/viewGame">
                    View Game
=======
      <sticky >
        <ReactBootstrap.Navbar sticky='top' 
        className="navbar hdr fixed-top navbar-expand-lg mb-4 ">
          
          {/* Brand/logo */}
          <div className='dashboard'>
            <a className="navbar-brand dashboardNames" href="Dashboard.html">
              DASHBOARD
            </a>
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
>>>>>>> e505ed2037c1514a6da0dcc3408858c573ca45ef
                  </a>
                </li>
              </ul>

              <ul className="navbar-nav ml-auto">
<<<<<<< HEAD
                <li className="nav-item">
                  <a className="nav-link " href="register.html">
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signIn">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
=======

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
        </ReactBootstrap.Navbar>
        <GreenBackground />
      </sticky>
>>>>>>> e505ed2037c1514a6da0dcc3408858c573ca45ef
    );
  }
}

export default Header;
