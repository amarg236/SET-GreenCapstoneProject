import "../../App.css";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Menu, Layout } from "antd";
import UserSidebar from "./RoleBasedSidebar/UserSiderBar";
import AssignorSidebar from "./RoleBasedSidebar/AssignorSidebar";
import AdminSidebar from "./RoleBasedSidebar/AdminSidebar";
import { toggleAction } from "../../actions/toggleAction";
import { isMobile } from "react-device-detect";
import device from "../../Utility/media";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
const { Sider } = Layout;

class SidebarComp extends Component {
  state = {
    collapsed: false,
    collapsedWidth: 80,
  };

  componentDidMount() {
    if (isMobile) {
      console.log("This is mobile");
      this.setState({ collapsed: true, collapsedWidth: 0 });
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

      case "ASSIGNER":
        return <AssignorSidebar />;

      case "USER":
        return <UserSidebar />;

      default:
        return (
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="home">
              <span>
                <HomeOutlined />
              </span>
              <span>HOME</span>
            </Menu.Item>
          </Menu>
        );
    }
  }

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
          <a href="./">SET GREEN</a>{" "}
        </div>
        {this.renderSwitch(this.props.role)}
      </Sider>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
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
