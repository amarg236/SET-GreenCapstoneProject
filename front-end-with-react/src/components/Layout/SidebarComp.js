import "../../App.css";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Menu, Layout } from "antd";
import UserSidebar from "./RoleBasedSidebar/UserSiderBar";
import AssignorSidebar from "./RoleBasedSidebar/AssignorSidebar";
import AdminSidebar from "./RoleBasedSidebar/AdminSidebar";

import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SidebarComp extends Component {
  state = {
    collapsed: this.props.toggelState,
  }
  render() {
    switch (this.props.role) {
      case "ADMIN":
        return (
          <Sider
            //trigger={null}
            //collapsible collapsed={this.props.toggelState}
            breakpoint='md'
            collapsedWidth='0'
          >
            <div className="logo">SET GREEN</div>
            <AdminSidebar />
          </Sider>
        );

      case "ASSIGNOR":
        return (
          <Sider trigger={null} collapsible collapsed={this.props.toggelState}>
            <div className="logo">SET GREEN</div>
            <h3>Hello ASSIGNOR</h3>
          </Sider>
        );

      case "USER":
        return (
          <Sider
            //trigger={null}
            //collapsible collapsed={this.props.toggelState}
            breakpoint='md'
            collapsedWidth='0'
          >
            <div className="logo">SET GREEN</div>
            <UserSidebar />
          </Sider>
        );

      default:
        return (
          <Sider
          breakpoint='md'
          collapsedWidth='0'
          // trigger={null} collapsible collapsed={this.props.toggelState}
          >
            <div className="logo">SET GREEN</div>
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
          </Sider>
        );
    }
  }
}

const mapStatetoProps = state => {
  return {
    role: state.userReducer.role,
    toggelState: state.userReducer.sidebarCollapased
  };
};

export default connect(mapStatetoProps)(SidebarComp);

