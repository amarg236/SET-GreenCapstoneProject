import "../../App.css";
import moment from "moment";
import React, { Component } from "react";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";

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
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

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
      monthSelected: moment(),
      filter: false,
      dateFiltered: [],
      // MonthFilter: moment.format("MM/DD HH:mm"),
    };
  }

  componentDidMount() {
    // let myTeamId = new Map();
    // this.props.myTeamId.map((row, index) => myTeamId.set(row));

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
        // console.log("current school teams");
        console.log(res.data.result);
        // console.log("length here");
        // console.log(res.data.result.length);
        // let myData = res.data.result.filter(function (myGames) {
        //   return myTeamId.has(myGames.awayteamId);
        // });

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
      <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
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

  onMonthSelected = (date, dateString) => {
    console.log("month has been selected");
    let mySelectedMonth = moment(date, "M")?.format("M");
    // this.setState({ monthSelected: dateString });
    // console.log(moment(date, "M")?.format("M"));
    // console.log(mySelectedMonth);
    this.setState({ monthSelected: date, filter: true });
    const toBePassed = this.state.game.filter(function (filtered) {
      console.log(filtered.time);
      let passedDate = moment(filtered.time, "MM/DD HH:mm").format("M");
      console.log(passedDate);
      console.log(mySelectedMonth);
      if (passedDate == mySelectedMonth) {
        console.log("both are same month");
      }
      return passedDate == mySelectedMonth;
      // console.log(passedDate.format("M"));
      // // if (this.state.monthSelected) {
      // //   let myDate = this.state.monthSelected?.format("M");
      // // }
      // return filtered;
    });
    console.log(this.state.game);
    console.log("Month picked<<");
    console.log(toBePassed);
    this.setState({ game: toBePassed });
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
    // this.setState({MonthFilter:})
    let date = moment("02/06 02:35", "MM/DD HH:mm");

    // moment.format("MM/DD HH:mm");
    console.log(">game");
    console.log(game);
    console.log(date.format("M"));

    console.log(this.state.monthSelected?.format("M"));

    const tableData = game;
    //   console.log(compareDate.time);
    //   let passedDate = moment(compareDate.time, "MM/DD HH:mm");
    //   console.log(passedDate.format("M"));
    //   // if (this.state.monthSelected) {
    //   //   let myDate = this.state.monthSelected?.format("M");
    //   // }

    //   // console.log(myDate);
    //   return compareDate;
    // });

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
          <DatePicker
            value={this.state.monthSelected}
            format="MM"
            picker="month"
            bordered={true}
            onChange={this.onMonthSelected}
          />
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
    myTeamId: state.gameReducer.myTeam,
  };
};
export default connect(mapStatetoProps, null)(UnfilteredGames);
