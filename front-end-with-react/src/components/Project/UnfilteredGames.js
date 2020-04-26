import "../../App.css";
import React, { Component } from "react";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import moment from "moment";

import {
  Tabs,
  Row,
  Layout,
  Col,
  Button,
  Table,
  Input,
  Statistic,
  Descriptions,
  DatePicker,
} from "antd";

// import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { TabPane } = Tabs;
let justForData = [
  { text: "Alexandria ", value: "Alexandria " },
  { text: "Bera", value: "Linda" },
];

function callback(key) {
  console.log(key);
}

function processData(supply) {
  return supply.map((row) => ({
    key: row.id,
    homeTeam: row.hometeam,
    awayTeam: row.awayteam,
    location: row.location,
    time: moment(row.time).format("MM/DD HH:mm"),
  }));
}
class UnfilteredGames extends Component {
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
    const currentSchool = {
      id: this.props.mySchool.id,
    };

    axios
      .post(
        Authtoken.getBaseUrl() + "/api/game/get/BySchool/all",
        currentSchool,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        }
      )
      .then((res) => {
        console.log("current school teams");
        console.log(res.data.result);
        console.log("length here");
        console.log(res.data.result.length);

        this.setState({
          game: processData(res.data.result),
        });
      });
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    // render: (text) =>
    //   this.state.searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
    //       searchWords={[this.state.searchText]}
    //       autoEscape
    //       textToHighlight={text.toString()}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

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
        window.location.reload();
        // history.push("./viewGames");
      });
  };

  render() {
    const { game } = this.state;

    const tableData = game;

    const getFilteredData = (rejected) => columns.filter({});
    console.log(tableData);
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
        ...this.getColumnSearchProps("awayTeam"),
        // filters: [
        //   {
        //     text: "Alexandria ",
        //     value: "Alexandria ",
        //   },

        // ],
        // onFilter: (value, record) => record.awayTeam.includes(value),
        // render: (record) => (
        //   <span>
        //     <a>{console.log(justForData.pl)}</a>
        //   </span>
        // ),
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
    ];

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
            Filter By Month
          </Button>
          <DatePicker picker="month" bordered={true} />
        </div>

        <Table columns={columns} dataSource={tableData} size="small" />
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
export default connect(mapStatetoProps, null)(UnfilteredGames);
