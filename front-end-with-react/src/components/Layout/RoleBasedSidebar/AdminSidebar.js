import { connect } from "react-redux";
import React, { Component } from "react";
import { Menu, Layout } from "antd";

import {
  DashboardOutlined,
  FileAddOutlined,
  EyeOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
  CalendarOutlined
} from "@ant-design/icons";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class AdminSidebar extends Component {
  render() {
    return (
      <Menu
        mode="inline"
        theme="dark"
        className="sidebarProperty"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="home">
          <span>
            <DashboardOutlined />
          </span>
          <span>
            <a href="/dashboard">Dashboard</a>
          </span>
        </Menu.Item>

        <Menu.Item key="calander">
          <span>
            <CalendarOutlined />
          </span>
          <span>
            <a href="/calander">Game Calander</a>
          </span>
        </Menu.Item>

        <Menu.Item key="createGame">
          <span>
            <FileAddOutlined />
          </span>
          <span>
            <a href="/createGame">Create Game</a>
          </span>
        </Menu.Item>
        <Menu.Item key="viewGame">
          <span>
            <EyeOutlined />
          </span>
          <span>
            <a href="/viewGames">View Game</a>
          </span>
        </Menu.Item>

        <Menu.Item key="manageUser">
          <span>
            <TeamOutlined />
          </span>
          <span>Manage User</span>
        </Menu.Item>
        <Menu.Item key="setting">
          <span>
            <SettingOutlined />
          </span>
          <span>Settings</span>
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

const mapStatetoProps = state => {
  return {
    role: state.userReducer.role,
    toggelState: state.userReducer.sidebarCollapased
  };
};

export default connect(mapStatetoProps)(AdminSidebar);
