import "../../App.css";
import React, { Component } from "react";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import moment from "moment";
import TestPendingGames from "./TestPending";

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
  // rowSelection objects indicates the need for row selection

  // Approve Games
  approveGame = (display) => {
    console.log(display.key);
    const aemptyObj = {
      id: display.key,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/accept", aemptyObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res);
        window.alert("The game has been approved!");
      });
  };

  // Deny Game function
  denyGame = (display) => {
    console.log(display.key);
    const emptyObj = {
      id: display.key,
      // hometeamId: display.hometeamId,
      // hometeam: display.hometeam,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/reject", emptyObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res);
        window.alert("The game has been denied!");
        // This needs fix later on
        // window.location.reload();
        // history.push("./viewGames");
      });
  };

  render() {
    const { game } = this.state;
    console.log("render>>");
    console.log(game);

    const processedData = game.map((row) => ({
      key: row.id,
      homeTeam: row.hometeam,
      awayTeam: row.awayteam,
      location: row.location,
      time: moment(row.time).format("MM/DD HH:mm"),
    }));
    const tableData = processedData;

    const getFilteredData = (rejected) => columns.filter({});

    const columns = [
      {
        title: "HomeTeam",
        dataIndex: "homeTeam",
        key: "homeTeam",
      },
      {
        title: "AwayTeam",
        dataIndex: "awayTeam",
        key: "awayTeam",
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (record) => (
          <span>
            <Button
              onClick={() => this.approveGame(record)}
              type="link"
              style={{ marginRight: 16 }}
            >
              Approve
            </Button>
            <Button onClick={() => this.denyGame(record)} type="link">
              Deny
            </Button>
          </span>
        ),
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };

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
          <TabPane tab="All Games" key="1">
            <TestPendingGames />
          </TabPane>

          <TabPane tab="Pending Games" key="2"></TabPane>
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
