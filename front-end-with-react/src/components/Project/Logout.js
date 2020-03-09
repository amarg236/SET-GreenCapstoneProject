import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../../actions/loginAction";

class Header extends Component {
  logout = async () => {
    this.props.logout();
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "#ffff",
          borderRadius: "7px",
          padding: "10px",
          boxSshadow: "0 2px 6px white",
          marginTop: "10px",
          borderRight: "2px solid #dddd",
          borderTop: "2px solid #dddd"
        }}
      >
        <a className="dropdown-item" href="#">
          View Profile
        </a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#" onClick={this.logout}>
          Logout
        </a>
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
