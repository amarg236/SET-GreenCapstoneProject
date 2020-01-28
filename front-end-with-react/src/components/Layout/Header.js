import React, { Component } from "react";
import "../../stylesheets/header.css";

class Header extends Component {
  render() {
    return (
      <div style={{borderBottomStyle:'solid', borderBottomColor:'#3DF42D', height:'70px',}}>
        <nav className="navbar navbar-expand-sm navbar-light bg-white mb-4">
          <div className="container">
            <a className="navbar-brand nav-link" href="/home"
            style={{fontWeight:'bold', fontSize:'20pt'}}>
              SET-
              <span style={{color:'#67D05E'}}> Green </span>
              Capstone Project
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
              </ul>

              <ul className="navbar-nav ml-auto">
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
      
    );
  }
}

export default Header;
