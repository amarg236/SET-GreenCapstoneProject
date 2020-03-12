import "../../App.css";
import React, { Component } from "react";
import Authtoken from "../../Utility/AuthToken";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LoginComp from "../../components/Project/LoginComp";
import Logout from "../../components/Project/Logout";
import { toggleAction } from "../../actions/toggleAction";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Layout, Menu, Row, Col, Button, Avatar, Dropdown } from "antd";

const { Header } = Layout;

class HeaderRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: this.props.toggelState
    };
  }

  logout = async () => {
    await Authtoken.logOut();
    await this.props.history.push("/");
    // window.location.reload();
  };

  toggle = () => {
    this.props.toggle();
    console.log(this.props.toggelState);
  };

  render() {
    const loginForm = <LoginComp />;
    const logOutForm = <Logout />;
    return (
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <Row justify="space-between" className="nav_bar">
          {
            // <Col lg={4} md={2} xs={1}></Col>
            <Col lg={4} md={2} xs={1}>
              <span className="nav_bar_toggle">
                {React.createElement(
                  this.props.toggelState
                    ? MenuUnfoldOutlined
                    : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: this.toggle
                  }
                )}
              </span>
            </Col>
          }

          <Col lg={10} md={0} xs={0}></Col>
          <Col lg={6} md={10} xs={10}>
            {this.props.username ? (
              <Dropdown overlay={logOutForm} trigger={["click"]}>
                <a className="ant-dropdown-link" href="#">
                  <a href="" style={{ marginRight: "10px" }}>
                    {this.props.username}
                  </a>
                  <Avatar icon={<UserOutlined />} />
                </a>
              </Dropdown>
            ) : (
              <Dropdown overlay={loginForm} trigger={["click"]}>
                <a className="ant-dropdown-link" href="#">
                  <a href="" style={{ marginRight: "10px" }}>
                    Hello, Guest !
                  </a>
                  <Avatar icon={<UserOutlined />} />
                </a>
              </Dropdown>
            )}
          </Col>
        </Row>
      </Header>
    );
  }
}
const mapStatetoProps = state => {
  return {
    username: state.userReducer.username,
    toggelState: state.userReducer.sidebarCollapased
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggle: () => dispatch(toggleAction())
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withRouter(HeaderRoot));
