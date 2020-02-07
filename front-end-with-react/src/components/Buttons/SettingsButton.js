import React, { Component } from "react";

class SettingsButton extends Component {
  render() {
    return (
        <a className="nav-link dashboardNames" href="/signIn">
                  <img src="https://cdn1.iconfinder.com/data/icons/material-design-icons-light/24/settings-512.png" alt="Profile logo" />
        </a>
        );
  }
}

export default SettingsButton;