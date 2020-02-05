import React, { Component } from "react";
import "../../stylesheets/buttons.css";

class NotificationButton extends Component {
  render() {
    return (
        <a className="nav-link dashboardNames" href="/signIn">
                  <img src="https://cdn0.iconfinder.com/data/icons/data-devices/614/19_-_Notification-512.png" alt="Profile logo" />
        </a>
        );
  }
}

export default NotificationButton;