import React, { Component } from "react";
import "../../stylesheets/header.css";
import * as ReactBootstrap from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      
        <ReactBootstrap.Navbar sticky="top"className="navbar navbar-expand-sm navbar-light bg-white mb-4">
          

            {/* SET-Green Home link and logo */}
            <a className="navbar-brand nav-link" href="/home"
            style={{fontWeight:'bold', fontSize:'25pt',}}>
              SET-
              <span style={{color:'#67D05E'}}> Green </span>
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

                {/* My Schedule button */}
                <li className="nav-item">
                  <a className="nav-link" href="/mySchedule">
                    My Schedule
                  </a>
                </li>

                {/* Schedule Game button */}
                <li className="nav-item">
                  <a className="nav-link" href="/viewApiCall">
                    Schedule Game
                  </a>
                </li>
              </ul>

              <ul className="navbar-nav ml-auto">
                {/* Login button */}
                <li className="nav-item">
                  <a className="nav-link" href="/signIn">
                    Login
                  </a>
                </li>
              </ul>
            </div>
        </ReactBootstrap.Navbar>
      
      
    );
  }
}

export default Header;
