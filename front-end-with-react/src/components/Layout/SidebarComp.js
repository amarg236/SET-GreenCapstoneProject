import "../../App.css";

import logo from "../../assets/website-logo.png";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Menu, Layout, Typography, Tag } from "antd";
import UserSidebar from "./RoleBasedSidebar/UserSiderBar";
import AssignorSidebar from "./RoleBasedSidebar/AssignorSidebar";
import AdminSidebar from "./RoleBasedSidebar/AdminSidebar";
import { toggleAction } from "../../actions/toggleAction";
import { isMobile, isTablet } from "react-device-detect";
import device from "../../Utility/media";
import history from "../../Utility/history";
import { HomeOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
const { Sider, Content } = Layout;
const { Text } = Typography;

class SidebarComp extends Component {
  state = {
    collapsed: false,
    collapsedWidth: 80,
  };

  componentDidMount() {
    if (isMobile) {
      this.setState({ collapsed: true, collapsedWidth: 0 });
    } else if (isTablet) {
      this.setState({ collapsed: true, collapsedWidth: 10 });
    }
    this.checkWidth();
    window.addEventListener("resize", this.checkWidth());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkWidth());
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  checkWidth = () => () => {
    if (window.matchMedia(device.mobileL).matches) {
      if (window.matchMedia(device.tablet).matches) {
        console.log("desktop or laptop view");
        this.setState({ collapsed: false, collapsedWidth: 80 });
      } else {
        //for tabletview
        console.log("tablet view");
        this.setState({ collapsed: true, collapsedWidth: 0 });
      }
    } else {
      console.log("mobile view");

      this.setState({ collapsed: true, collapsedWidth: 0 });
    }
  };

  renderSwitch(userRole) {
    switch (this.props.role) {
      case "ADMIN":
        return <AdminSidebar />;

      case "ASSIGNOR":
        return <AssignorSidebar />;

      case "USER":
        return <UserSidebar />;

      default:
        return (
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["home"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item onClick={() => this.homeRedirect} key="home">
              <HomeOutlined />

              <span>HOME</span>
            </Menu.Item>

            {
              <Menu.Item onClick={this.handleClick} key="login">
                <LoginOutlined />
                <span>LOG IN</span>
              </Menu.Item>
            }
          </Menu>
        );
    }
  }
  handleClick = (e) => {
    history.push("/".concat(e.key));
  };

  homeRedirect = (e) => {
    history.push("/");
  };
  render() {
    return (
      /*
      trigger :  This is for menu icon type. It is to allow use to click on it.
      We are putting it as null because we are using our own trigger symbol.
      */
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        collapsedWidth={this.state.collapsedWidth}
      >
        <div className="logo">
          <a href="./">
            <img src={logo} style={{ width: "60px", height: "60px" }} />
          </a>{" "}
        </div>

        {this.renderSwitch(this.props.role)}
      </Sider>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    username: state.userReducer.username,
    role: state.userReducer.role,
    toggelState: state.userReducer.sidebarCollapased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: (argument) => dispatch(toggleAction(argument)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(SidebarComp);
