import { connect } from "react-redux";
import React, { Component } from "react";
import history from "../../../Utility/history";
import { Menu, Layout } from "antd";

import {
  DashboardOutlined,
  FileAddOutlined,
  EyeOutlined,
  LogoutOutlined,
  TeamOutlined,
  SettingOutlined,
  CalendarOutlined
} from "@ant-design/icons";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class AssignorSidebar extends Component {
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
        style={{ height: "100%", borderRight: 0, overflow: 'auto' }}
      >
        <Menu.Item onClick={handleClick} key="dashboard">
          <span>
            <DashboardOutlined />
          </span>
          <span>Dashboard</span>
        </Menu.Item>

        <Menu.Item onClick={handleClick} key="calander">
          <span>
            <CalendarOutlined />
          </span>
          <span>Game Calendar</span>
        </Menu.Item>

        <Menu.Item onClick={handleClick} key="createGame">
          <span>
            <FileAddOutlined />
          </span>
          <span>Create Game</span>
        </Menu.Item>
        <Menu.Item onClick={handleClick} key="viewGames">
          <span>
            <EyeOutlined />
          </span>
          <span>View Game</span>
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

export default connect(mapStatetoProps)(AssignorSidebar);
