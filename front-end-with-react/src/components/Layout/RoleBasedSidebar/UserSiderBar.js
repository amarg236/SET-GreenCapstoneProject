import "../../../App.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Menu, Layout, Badge } from "antd";
import history from "../../../Utility/history";
import { logoutAction } from "../../../actions/loginAction";

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
  UserOutlined,
  SolutionOutlined,
  MailTwoTone,
  BellTwoTone,
  NotificationOutlined,
  TeamOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class UserSidebar extends Component {
  render() {
    const handleClick = (e) => {
      history.push("/".concat(e.key));
    };
    const logOut = () => {
      this.props.logout();
    };
    return (
      <Menu
        mode="inline"
        theme="dark"
        className="sidebarProperty"
        defaultSelectedKeys={["dashboard"]}
        defaultOpenKeys={["dashboard"]}
        style={{ height: "100%", borderRight: 0, paddingRight: "0" }}
      >
        <Menu.Item onClick={handleClick} key="dashboard">
          <span>
            <a href="/dashboard">
              <DashboardOutlined />
            </a>
          </span>
          <span>Dashboard</span>
        </Menu.Item>
        <Menu.Item onClick={handleClick} key="Notification">
          <span>
            <a href="/notification">
              <NotificationOutlined />
            </a>
          </span>
          <Badge count={1} dot>
            <span>Notification </span>
          </Badge>
        </Menu.Item>
        <SubMenu
          key="calendarP"
          title={
            <span>
              <AppstoreOutlined />
              <span>Calendar</span>
            </span>
          }
        >
          <Menu.Item onClick={handleClick} key="calendarP">
            <span>
              <a href="/calendarP">
                <TeamOutlined />
              </a>
            </span>
            <span>Personalized Calendar</span>
          </Menu.Item>
          <Menu.Item onClick={handleClick} key="calendarG">
            <span>
              <a href="/calendarG">
                <CalendarOutlined />
              </a>
            </span>
            <span>General Calendar</span>
          </Menu.Item>
        </SubMenu>

        <Menu.Item onClick={handleClick} key="createGame">
          <span>
            <a href="/createGame">
              <FileAddOutlined />
            </a>
          </span>
          <span>Create Game</span>
        </Menu.Item>
        <Menu.Item onClick={handleClick} key="viewAllGames">
          <span>
            <a href="/viewGames">
              <EyeOutlined />
            </a>
          </span>
          <span>View All Game</span>
        </Menu.Item>

        <SubMenu
          key="sub1"
          title={
            <span>
              <AppstoreOutlined />
              <span>Restriction</span>
            </span>
          }
        >
          <Menu.Item onClick={handleClick} key="addGoodDay">
            <span>
              <a href="/addGoodDay">
                <CheckOutlined />
              </a>
            </span>
            <span>Add Good Day</span>
          </Menu.Item>
          <Menu.Item onClick={handleClick} key="addBadDay">
            <span>
              <a href="/addBadDay">
                <ClockCircleOutlined />
              </a>
            </span>
            <span>Add Bad Day</span>
          </Menu.Item>
        </SubMenu>

        <Menu.Item onClick={handleClick} key="approvedGames" key="exportCSV">
          <DownloadOutlined />

          <span>Export CSV</span>
        </Menu.Item>
        <Menu.Item onClick={handleClick} key="userProfile">
          <span>
            <SolutionOutlined />
          </span>
          <span>User Profile</span>
        </Menu.Item>
        <Menu.Item onClick={logOut} key="logout">
          <LogoutOutlined />

          <span>Log Out</span>
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(UserSidebar);
