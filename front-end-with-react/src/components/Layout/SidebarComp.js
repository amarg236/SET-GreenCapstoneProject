import "../../App.css";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Menu, Layout } from "antd";
import UserSidebar from "./RoleBasedSidebar/UserSiderBar";
import AssignorSidebar from "./RoleBasedSidebar/AssignorSidebar";
import AdminSidebar from "./RoleBasedSidebar/AdminSidebar";
import { toggleAction } from "../../actions/toggleAction";

import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SidebarComp extends Component {
  state = {
    collapsed: this.props.toggelState
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

            <Menu.Item key="logOut">
              <span>
                <LogoutOutlined />
              </span>
              <span>Log Out</span>
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
        // collapsible
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
          if (broken == true) {
            this.props.toggle();
          } else if (broken == false) {
            this.props.toggle();
          }
        }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
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
