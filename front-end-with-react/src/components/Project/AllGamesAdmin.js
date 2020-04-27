import "../../App.css";
import React, { Component } from "react";
import "./SignIn";
import { connect } from "react-redux";
import AdminPendingGames from "./AdminShowGames";
import AdminApprovedGames from "./AdminApprovedGames";
import AdminRejectedGames from "./AdminRejectedGames";

import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleTwoTone,
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

class AllGamesAdmin extends Component {
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
                Pending Games&nbsp;
                <ExclamationCircleTwoTone twoToneColor="#FFA500" />
              </h6>
            }
            key="1"
          >
            <AdminPendingGames />
          </TabPane>

          <TabPane
            tab={
              <h6>
                Approved Games&nbsp;
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              </h6>
            }
            key="2"
          >
            <AdminApprovedGames />
          </TabPane>
          <TabPane
            tab={
              <h6>
                Rejected Games&nbsp;
                <CloseCircleTwoTone twoToneColor="#FF0000" />
              </h6>
            }
            key="3"
          >
            <AdminRejectedGames />
          </TabPane>
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
export default connect(mapStatetoProps, null)(AllGamesAdmin);
