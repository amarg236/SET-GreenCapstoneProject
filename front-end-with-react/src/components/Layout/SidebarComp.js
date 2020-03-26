import "../../App.css";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Menu, Layout } from "antd";
import UserSidebar from "./RoleBasedSidebar/UserSiderBar";
import AssignorSidebar from "./RoleBasedSidebar/AssignorSidebar";
import AdminSidebar from "./RoleBasedSidebar/AdminSidebar";
import { toggleAction } from "../../actions/toggleAction";
import styled from "styled-components";
import device from "../../Utility/media";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
const { Sider } = Layout;

class SidebarComp extends Component {
  state = {
    collapsed: false,
    collapsedWidth: 80
  };

  componentDidMount() {
    this.checkWidth();
    window.addEventListener("resize", this.checkWidth());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkWidth());
  }

  checkWidth = () => () => {
    const match = window.matchMedia(`(max-width: 768px)`);
    if (match) {
      this.setState({ collapsed: true, collapsedWidth: 0 });
    } else {
      this.setState({ collapsedWidth: 80 });
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
  // toggle = () => {
  //   this.props.toggle();
  //   console.log(this.props.toggelState);
  // };

  render() {
    return (
      /*
      trigger :  This is for menu icon type. It is to allow use to click on it.
      We are putting it as null because we are using our own trigger symbol.
      */
      <Sider
        trigger={null}
        breakpoint="md"
        collapsible
        collapsed={this.state.collapsed}
        collapsedWidth={this.state.collapsedWidth}
        onBreakpoint={broken => {
          // return `collapsedWidth="0"`;
          // console.log(broken);
          // if (broken == true) {
          //   this.props.toggle();
          // } else if (broken == false) {
          //   this.props.toggle();
          // console.log(broken);
          // }
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        collapsed={this.props.toggelState}
      >
        <div className="logo">SET GREEN</div>
        {this.renderSwitch(this.props.role)}
      </Sider>
    );
  }
}

const mapStatetoProps = state => {
  return {
    role: state.userReducer.role,
    toggelState: state.userReducer.sidebarCollapased
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggle: () => dispatch(toggleAction())
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(SidebarComp);
