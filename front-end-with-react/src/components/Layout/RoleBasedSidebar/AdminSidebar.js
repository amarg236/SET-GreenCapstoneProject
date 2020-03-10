import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
            <Link to="/dashboard">Dashboard</Link>
          </span>
        </Menu.Item>

        <Menu.Item key="calander">
          <span>
            <CalendarOutlined />
          </span>
          <span>
            <Link to="/calander">Game Calander</Link>
          </span>
        </Menu.Item>

        <Menu.Item key="createGame">
          <span>
            <FileAddOutlined />
          </span>
          <span>
            <Link to="/createGame">Create Game</Link>
          </span>
        </Menu.Item>
        <Menu.Item key="viewGame">
          <span>
            <EyeOutlined />
          </span>
          <span>
            <Link to="/viewGames">View Game</Link>
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
