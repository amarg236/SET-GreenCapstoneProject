import "../../App.css";
import React, { Component } from "react";
import "./SignIn";
import { connect } from "react-redux";
import PersonalizedCal from "./Cal";

import {
  CalendarTwoTone,
  CalendarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Tabs,
  Row,
  Layout,
  Col,
  Button,
  Table,
  Statistic,
  Descriptions,
} from "antd";
const { Content } = Layout;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class CalendarCover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({
      game: this.props.userGameRedux,
    });
  }

  render() {
    return (
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580,
        }}
      >
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane
            tab={
              <h6>
                Personalized Calendar &nbsp;
                <TeamOutlined />
              </h6>
            }
            key="1"
          >
            <PersonalizedCal />
          </TabPane>

          <TabPane
            tab={
              <h6>
                General Calendar&nbsp;
                <CalendarOutlined />
              </h6>
            }
            key="2"
          ></TabPane>
        </Tabs>
      </Content>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    token: state.userReducer.token,
  };
};
export default connect(mapStatetoProps, null)(CalendarCover);
