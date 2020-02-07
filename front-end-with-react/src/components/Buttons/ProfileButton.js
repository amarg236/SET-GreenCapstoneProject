import React, { Component } from "react";


class ProfileButton extends Component {
  render() {
    return (
        <a className="nav-link dashboardNames" href="/signIn">
                  <img src="https://cdn3.iconfinder.com/data/icons/users-outline/60/50_-Blank_Profile-_user_people_group_team-512.png" alt="Profile logo" />
        </a>
        );
  }
}

export default ProfileButton;