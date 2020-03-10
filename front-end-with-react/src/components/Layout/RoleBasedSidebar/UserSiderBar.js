import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Menu, Layout } from "antd";
import history from "../../../Utility/history";
import Dashboard from "../../Layout/LoggedInUser";

import {
  DashboardOutlined,
  FileAddOutlined,
  EyeOutlined,
  LogoutOutlined,
  SettingOutlined,
  CalendarOutlined
} from "@ant-design/icons";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class UserSidebar extends Component {
  render() {
    const handleClick = e => {
      history.push("/".concat(e.key));
    };

    return (
      <Menu
        mode="inline"
        theme="dark"
        className="sidebarProperty"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0,
                 paddingRight: "0" }}
      >
        <Menu.Item onClick={handleClick} key="dashboard">
          <span>
            <a href="/dashboard">
              <DashboardOutlined />
            </a>
          </span>
          <span>Dashboard</span>
        </Menu.Item>

        <Menu.Item onClick={handleClick} key="calander">
          <span>
            <a href="/calander">
              <CalendarOutlined />
            </a>
          </span>
          <span>Game Calendar</span>
        </Menu.Item>

        <Menu.Item onClick={handleClick} key="createGame">
          <span>
            <a href="/createGame">
              <FileAddOutlined />
            </a>
          </span>
          <span>Create Game</span>
        </Menu.Item>
        <Menu.Item onClick={handleClick} key="viewGames">
          <span>
            <a href="/viewGames">
              <EyeOutlined />
            </a>
          </span>
          <span>View Game</span>
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

export default connect(mapStatetoProps)(UserSidebar);
