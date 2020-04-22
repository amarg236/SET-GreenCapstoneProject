import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import history from "../../Utility/history";
import { logoutAction } from "../../actions/loginAction";
import { Menu, Layout } from "antd";

class Header extends Component {
  logout = () => {
    this.props.logout();
  };
  viewProfile = () => {
    console.log("view profile");
    history.push("/userProfile");
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "#ffff",
          borderRadius: "7px",
          padding: "10px",
          marginTop: "10px",
          borderTop: "2px solid #dddd"
        }}
      >
        <Menu>
          <Menu.Item onClick={this.viewProfile}>
            <span>
              <p>View Profile</p>
            </span>
          </Menu.Item>

          <Menu.Item onClick={this.logout} key="logOut">
            <span>
              <p>Log Out</p>
            </span>
          </Menu.Item>
        </Menu>
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
