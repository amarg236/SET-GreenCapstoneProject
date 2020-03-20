import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import history from "../../../Utility/history";
import { Menu, Layout } from "antd";
import AddSchool from "../../ManageTeam/AddSchool";

import {
  DashboardOutlined,
  FileAddOutlined,
  EyeOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  UserAddOutlined
} from "@ant-design/icons";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const handleClick = e => {
  history.push("/".concat(e.key));
};

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
        <SubMenu
          key="sub1"
          title={
            <span>
              <AppstoreOutlined />
              <span>Manage Game</span>
            </span>
          }
        >
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
        </SubMenu>

        <SubMenu
          key="sub2"
          title={
            <span>
              <ApartmentOutlined />
              <span>Manage Team</span>
            </span>
          }
        >
          <Menu.Item onClick={handleClick} key="addDistrict">
            <span>
              <FileAddOutlined />
            </span>
            <span>Add District</span>
          </Menu.Item>
          <Menu.Item onClick={handleClick} key="addSchool">
            <span>
              <FileAddOutlined />
            </span>
            <span>Add School</span>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="manageUser"
          title={
            <span>
              <TeamOutlined />
              <span>Manage User</span>
            </span>
          }
        >
          <Menu.Item onClick={handleClick} key="inviteToSystem">
            <span>
              <UserAddOutlined />
            </span>
            <span>Invite User</span>
          </Menu.Item>
        </SubMenu>
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
