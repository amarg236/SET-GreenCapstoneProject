import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import history from "../../../Utility/history";
import { logoutAction } from "../../../actions/loginAction";
import { Menu, Layout } from "antd";

// components

import AddSchool from "../../ManageTeam/AddSchool";

import {
  DashboardOutlined,
  FileAddOutlined,
  DownloadOutlined,
  EyeOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  UserAddOutlined,
  InsertRowBelowOutlined,
  SolutionOutlined,
  CheckOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const handleClick = (e) => {
  history.push("/".concat(e.key));
};

class AdminSidebar extends Component {
  render() {
    const logOut = () => {
      this.props.logout();
    };
    return (
      <Menu
        mode="inline"
        theme="dark"
        className="sidebarProperty"
        defaultSelectedKeys={["dashboard"]}
        // defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item onClick={handleClick} key="dashboard">
          <span>
            <DashboardOutlined />
          </span>
          <span>Dashboard</span>
        </Menu.Item>

        <Menu.Item onClick={handleClick} key="adminCalendar">
          <span>
            <CalendarOutlined />
          </span>
          <span>Game Calendar</span>
        </Menu.Item>
        <SubMenu
          title={
            <span>
              <AppstoreOutlined />
              <span>Manage Game</span>
            </span>
          }
        >
          {
            //   <Menu.Item onClick={handleClick} key="createGame">
            //   <span>
            //     <FileAddOutlined />
            //   </span>
            //   <span>Create Game</span>
            // </Menu.Item>
          }
          <Menu.Item onClick={handleClick} key="adminCreateGame">
            <span>
              <FileAddOutlined />
            </span>
            <span>Create Game</span>
          </Menu.Item>
          <Menu.Item onClick={handleClick} key="adminGameView">
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
          <Menu.Item onClick={handleClick} key="addTeam">
            <span>
              <FileAddOutlined />
            </span>
            <span>Add Team</span>
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
          <Menu.Item onClick={handleClick} key="manageUser">
            <span>
              <UserAddOutlined />
            </span>
            <span>Unverified User</span>
          </Menu.Item>
          <Menu.Item onClick={handleClick} key="allUsers">
            <span>
              <UserAddOutlined />
            </span>
            <span>Verified User</span>
          </Menu.Item>
          <Menu.Item onClick={handleClick} key="inviteToSystem">
            <span>
              <UserAddOutlined />
            </span>
            <span>Invite User</span>
          </Menu.Item>
          <Menu.Item onClick={handleClick} key="inviteAssignor">
            <span>
              <UserAddOutlined />
            </span>
            <span>Invite Assignor</span>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="manageNotice"
          title={
            <span>
              <InsertRowBelowOutlined />
              <span>Manage Notice</span>
            </span>
          }
        >
          <Menu.Item onClick={handleClick} key="addNotice">
            <span>
              <FileAddOutlined />
            </span>
            <span>Add Notice</span>
          </Menu.Item>
        </SubMenu>

        <Menu.Item onClick={handleClick} key="addEventDay">
          <span>
            <a href="/addEventDay">
              <CheckOutlined />
            </a>
          </span>
          <span>Block Days</span>
        </Menu.Item>
        <SubMenu
          key="manageNotice"
          title={
            <span>
              <InsertRowBelowOutlined />
              <span>Manage Notice</span>
            </span>
          }
        ></SubMenu>
        <SubMenu
          key="exportCSV"
          title={
            <span>
              <TeamOutlined />
              <span>Export CSV</span>
            </span>
          }
        >
          <Menu.Item onClick={handleClick} key="exportCSVGeneral">
            <span>
              <DownloadOutlined />
            </span>
            <span>General Export</span>
          </Menu.Item>

          <Menu.Item onClick={handleClick} key="exportCSV">
            <span>
              <DownloadOutlined />
            </span>
            <span>Fully Approved</span>
          </Menu.Item>
        </SubMenu>

        <Menu.Item onClick={handleClick} key="userProfile">
          <span>
            <SolutionOutlined />
          </span>
          <span>User Profile</span>
        </Menu.Item>
        <Menu.Item onClick={logOut} key="logout">
          <span>
            <SettingOutlined />
          </span>
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

export default connect(mapStatetoProps, mapDispatchToProps)(AdminSidebar);
