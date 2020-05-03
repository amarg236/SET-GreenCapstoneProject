import "../../App.css";
import React, { Component } from "react";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import moment from "moment";
import TestPendingGames from "./TestPending";
import UnfilteredGames from "./UnfilteredGames";
import RequestedGames from "./RequestedGame";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
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

class AllGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: [],
      school: [],
      isRejected: null,
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
        <Tabs defaultActiveKey="1" onChange={callback} size="large">
          <TabPane
            tab={
              <h6>
                All Games <ArrowUpOutlined />
                <ArrowDownOutlined />
              </h6>
            }
            key="1"
          >
            <UnfilteredGames />
          </TabPane>

          <TabPane
            tab={
              <h6>
                Pending Games
                <ArrowDownOutlined />
              </h6>
            }
            key="2"
          >
            <TestPendingGames />
          </TabPane>
          <TabPane
            tab={
              <h6>
                Requested Games
                <ArrowUpOutlined />
              </h6>
            }
            key="3"
          >
            <RequestedGames />
          </TabPane>
        </Tabs>
      </Content>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    token: state.userReducer.token,
    mySchool: state.userReducer.mySchool,
    schoolDistrict: state.userReducer.schoolDistrict,
    userGameRedux: state.gameReducer.userGame,
  };
};
export default connect(mapStatetoProps, null)(AllGames);
