import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Menu, Layout } from "antd";
import history from "../../../Utility/history";

//components

import Dashboard from "../../Layout/LoggedInUser";

import {
  DashboardOutlined,
  FileAddOutlined,
  DownloadOutlined,
  EyeOutlined,
  LogoutOutlined,
  SettingOutlined,
  CalendarOutlined,
  ApartmentOutlined,
  AppstoreAddOutlined,
  FileDoneOutlined,
  AppstoreOutlined,
  ClockCircleOutlined,
  DeleteRowOutlined,
  CheckOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class UserSidebar extends Component {
  render() {
    const handleClick = (e) => {
      history.push("/".concat(e.key));
    };

    return (
      <Menu
        mode="inline"
        theme="dark"
        className="sidebarProperty"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0, paddingRight: "0", overflow: 'auto' }}
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
            <span>Pending Game</span>
          </Menu.Item>
          <Menu.Item onClick={handleClick} key="requestedGames">
            <span>
              <a href="/requestedGames">
                <ClockCircleOutlined />
              </a>
            </span>
            <span>Requested Games</span>
          </Menu.Item>
          <Menu.Item onClick={handleClick} key="acceptedGame">
            <span>
              <a href="/viewGames">
                <CheckOutlined />
              </a>
            </span>
            <span>Waiting Assignor</span>
          </Menu.Item>
          <Menu.Item onClick={handleClick} key="rejectedGames">
            <span>
              <a href="/rejectedGames">
                <DeleteRowOutlined />
              </a>
            </span>
            <span>Rejected Game</span>
          </Menu.Item>
          <Menu.Item onClick={handleClick} key="approvedGames">
            <span>
              <a href="/approved">
                <CheckOutlined />
              </a>
            </span>
            <span>Approved Game</span>
          </Menu.Item>
        </SubMenu>

        <Menu.Item onClick={handleClick} key="approvedGames" key="exportCSV">
          <span>
            <DownloadOutlined />
          </span>
          <span>Export CSV</span>
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

const mapStatetoProps = (state) => {
  return {
    role: state.userReducer.role,
    toggelState: state.userReducer.sidebarCollapased,
  };
};

export default connect(mapStatetoProps)(UserSidebar);
