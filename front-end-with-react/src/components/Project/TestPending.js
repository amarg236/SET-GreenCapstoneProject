import "../../App.css";
import React, { Component } from "react";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import moment from "moment";

import { Row, Layout, Col, Button, Table, Statistic, Descriptions } from "antd";
const { Content } = Layout;

class TestPending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: [],
      school: [],
    };
  }

  async componentDidMount() {
    //getting current users team and school

    const currentSchool = {
      id: this.props.mySchool.id,
    };

    try {
      const res = await axios.post(
        Authtoken.getBaseUrl() + "/api/team/get/bySchool",
        currentSchool,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        }
      );

      console.log("current school teams");
      console.log(res.data.result);
      console.log("length here");
      console.log(res.data.result.length);

      const gamesFromAxios = await axios.all(
        res.data.result.map(({ id }) => {
          const emptyBody = {
            id,
          };
          return axios
            .post(
              Authtoken.getBaseUrl() +
                "/api/game/get/ByTeamId/away/notAccepted",
              emptyBody,
              {
                headers: {
                  Authorization:
                    "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
                },
              }
            )
            .then((res) => res.data.result);
        })
      );

      console.log("gameFromAxios>>>");
      console.log(gamesFromAxios.flat());

      this.setState({
        game: this.state.game.concat(gamesFromAxios.flat()),
        loading: false,
      });
    } catch (e) {
      console.error(`Problem fetching data ${e}`);
    }
    // this.setState({ awaySchoolTeamList: res.data.result });
  }
  // rowSelection objects indicates the need for row selection

  // Approve Games
  approveGame = (display) => {
    console.log(display);
    const aemptyObj = {
      id: display.id,
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
    console.log(display.id);
    const emptyObj = {
      id: display.id,
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

    const tableData = game.map((row) => ({
      key: row.id,
      homeTeam: row.hometeam,
      awayTeam: row.awayteam,
      location: row.location,
      time: moment(row.time).format("MM/DD HH:mm"),
    }));

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
        <div style={{ marginBottom: "16px" }}>
          <Button
            style={{ marginRight: "8px" }}
            type="primary"
            onClick={this.setAgeSort}
          >
            All Games
          </Button>
          <Button
            style={{ marginRight: "8px" }}
            type="secondary"
            onClick={this.clearFilters}
          >
            Pending Games
          </Button>
          <Button
            type="dashed"
            style={{ marginRight: "8px" }}
            danger
            onClick={this.clearAll}
          >
            Approved Games
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          size="small"
        />
      </Content>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    token: state.userReducer.token,
    mySchool: state.userReducer.mySchool,
    schoolDistrict: state.userReducer.schoolDistrict,
  };
};
export default connect(mapStatetoProps, null)(TestPending);
