import React, { Component } from "react";
import Authtoken from "../../Utility/AuthToken";
import { withRouter } from "react-router-dom";
import "../../stylesheets/header.css";
import GreenBackground from "./GreenBackground";
import Header from "./Header";
import { connect } from "react-redux";

class HeaderRoot extends Component {
  // constructor(props) {
  //   super(props);
  //   this.logout = this.logout.bind(this);
  // }

  logout = async () => {
    await Authtoken.logOut();
    await this.props.history.push("/");
    // window.location.reload();
  };

  render() {
    return (
      <div style={{ marginBottom: "5%" }}>
        <nav className="fixed-top navbar navbar-expand-lg navbar-light hdr">
          {/* Brand/logo */}
          <a className="navbar-brand dashboardNames" href="/">
            DASHBOARD <span className="sr-only">(current)</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {this.props.isAuthenticated ? <Header /> : null}
        </nav>
        <GreenBackground />
      </div>
    );
  }
}
const mapStatetoProps = state => {
  return {
    isAuthenticated: state.userReducer.username
  };
};
export default connect(mapStatetoProps)(withRouter(HeaderRoot));
