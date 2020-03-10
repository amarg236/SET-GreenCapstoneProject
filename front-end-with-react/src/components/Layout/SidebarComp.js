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
    collapsed: this.props.toggelState
  };

  renderSwitch(userRole) {
    switch (this.props.role) {
      case "ADMIN":
        return (
          <div>
            <AdminSidebar />
          </div>
        );

      case "ASSIGNOR":
        return (
          <div>
            <AssignorSidebar />
          </div>
        );

      case "USER":
        return (
          <div>
            <UserSidebar />
          </div>
        );

      default:
        return (
          <div>
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
          </div>
        );
    }
  }

  render() {
    return (
      <Sider
        trigger={null}
        breakpoint="md"
        collapsible
        collapsedWidth="0"
        // onBreakpoint={broken => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
        // collapsed={this.props.toggelState}
      >
        {" "}
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

export default connect(mapStatetoProps)(SidebarComp);
