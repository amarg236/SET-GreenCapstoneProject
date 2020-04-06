import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../stylesheets/header.css";
import SettingsButton from "../Buttons/SettingsButton";
import NotificationButton from "../Buttons/NotificationButton";
import history from "../../Utility/history";
import { connect } from "react-redux";
import { logoutAction } from "../../actions/loginAction";
import { Menu, Dropdown } from "antd";

class Header extends Component {
  logout = async () => {
    this.props.logout();
  };
  viewProfile = () => {
    console.log("view profile");
    history.push("/".concat(e.key));
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
            <Menu>
              <Menu.Item onClick={this.viewProfile()}>
                <span>
                  <a href="/userProfile">View Profile</a>
                </span>
              </Menu.Item>
              <Menu.Item onClick={this.logout()} key="logOut">
                <span>
                  <p>User Profile</p>
                </span>
              </Menu.Item>
            </Menu>
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
