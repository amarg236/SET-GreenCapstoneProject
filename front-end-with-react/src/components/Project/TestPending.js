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
  Statistic,
  Descriptions,
  Input,
  DatePicker,
  Tag,
  Modal,
} from "antd";

import {
  SearchOutlined,
  EditOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function processData(supply) {
  console.log("processData>>");
  console.log(supply);
  return supply.map((row) => ({
    key: row.id,
    homeTeam: row.hometeam,
    awayTeam: row.awayteam,
    location: row.location,
    time: moment(row.time).format("MM/DD HH:mm"),
    rejected: row.rejected,
    awayAccepted: row.awayAccepted,
    selectedKeys: [],
  }));
}

class TestPending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: [],
      school: [],
      isRejected: null,
      bulkAccept: false,
      refresh: false,
      needEdit: false,
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.refresh != this.state.refresh) {
      this.fetchApi();
    }
  }

  fetchApi = () => {
    let myTeamId = new Map();
    this.props.myTeamId.map((row, index) => myTeamId.set(row));

    const currentSchool = {
      id: this.props.mySchool.id,
    };

    axios
      .post(
        Authtoken.getBaseUrl() + "/api/game/get/BySchool/notAccepted",
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
        // console.log(res.data.result);
        // console.log("length here");
        // console.log(res.data.result.length);
        let myData = res.data.result.filter(function (myGames) {
          return myTeamId.has(myGames.awayteamId);
        });
        // console.log(myData);
        this.setState({
          game: processData(myData),
        });
      });
  };

  successMsg = (s_message) => {
    Modal.success({
      content: (
        <div>
          <p>{s_message}</p>
        </div>
      ),
    });
  };

  errorMsg = (e_message) => {
    Modal.error({
      content: (
        <div>
          <p>{e_message}</p>
        </div>
      ),
    });
  };

  // rowSelection objects indicates the need for row selection
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

  sendToState = (array) => {
    console.log(`passing value to state${array}`);
  };

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

  editGame = (record) => {
    this.setState({ needEdit: true });
    console.log(record);
  };

  bulkAccept = (keys) => {
    console.log("i am prining array of keys??");
    // console.log(keys);
    console.log(this.state.selectedKeys);

    const aemptyObj = {
      data: this.state.selectedKeys,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/accept/bulk", aemptyObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log(res);
          this.successMsg("Great! All game has been approved. ");
          this.setState((prevState) => ({
            refresh: !prevState.refresh,
          }));
        } else {
          this.errorMsg("Sorry couldn't accept games.");
        }
      });
  };

  bulkReject = (keys) => {
    console.log("i am prining array of keys??");
    // console.log(keys);
    console.log(this.state.selectedKeys);

    const aemptyObj = {
      data: this.state.selectedKeys,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/deny/bulk", aemptyObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.successMsg("Selected games has been denied. ");
          this.setState((prevState) => ({
            refresh: !prevState.refresh,
          }));
        } else {
          this.errorMsg("Sorry couldn't complete the process.");
        }
      });
  };

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
        if (res.data.httpStatusCode == 202) {
          console.log(res);
          this.successMsg("Great! The game has been approved. ");
          this.setState((prevState) => ({
            refresh: !prevState.refresh,
          }));
        } else {
          this.errorMsg(res.data.message);
        }
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
        if (res.data.httpStatusCode == 202) {
          console.log(res);

          this.successMsg("The game has been denied!");

          this.setState((prevState) => ({
            refresh: !prevState.refresh,
          }));
        } else {
          this.errorMsg(res.data.message);
        }
      });
  };

  render() {
    const { game } = this.state;

    const tableData = game;

    const getFilteredData = (rejected) => columns.filter({});

    const columns = [
      {
        title: "HomeTeam",
        dataIndex: "homeTeam",
        key: "homeTeam",
        ...this.getColumnSearchProps("homeTeam"),
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
        // sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (record) => (
          <span>
            {record.rejected ? <Tag color="red">Rejected</Tag> : null}
            {record.awayAccepted ? <Tag color="green">Accepted</Tag> : null}
            {!record.awayAccepted && !record.rejected ? (
              <span>
                <Button
                  onClick={() => this.approveGame(record)}
                  type="link"
                  style={{ paddingLeft: "5px", paddingRight: "5px" }}
                >
                  Approve
                </Button>
                <Button onClick={() => this.denyGame(record)} type="link">
                  Deny
                </Button>
                <Button onClick={() => this.editGame(record)} type="link">
                  Edit
                </Button>
              </span>
            ) : null}
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

        if (selectedRowKeys.length > 0) {
          // console.log(selectedRowKeys);
          // console.log("Setting value to true");
          this.setState({ bulkAccept: true });
        } else if (selectedRowKeys.length == 0) {
          // console.log("Setting Value to false");
          this.setState({ bulkAccept: false });
        }
        console.log("all keys>>");
        console.log(selectedRowKeys);
        this.setState({ selectedKeys: selectedRowKeys });
      },
      onSelect: (record, selected, selectedRows, selectedRowKeys) => {
        // console.log(record, selected, selectedRows);
        // console.log("all keys>>");
        // console.log(selectedRowKeys);
        // this.setState({ selectedKeys: selectedRows });
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows);
      },
      forSubmit: (selectedRowKeys) => {
        // console.log("on submit");
        // console.log(selectedRowKeys);
        // this.sendToState(selectedRowKeys);
      },
    };

    return (
      <span>
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
            {this.state.bulkAccept ? (
              <span>
                <Button
                  style={{
                    marginRight: "8px",
                    marginLeft: "8px",
                    className: `"${this.state.bulkAccept}"`,
                  }}
                  type="primary"
                  onClick={this.bulkAccept}
                >
                  Accept in Bulk
                </Button>
                <Button
                  style={{
                    marginRight: "8px",
                    marginLeft: "8px",
                    className: `"${this.state.bulkReject}"`,
                  }}
                  type="danger"
                  onClick={this.bulkReject}
                >
                  Deny in Bulk
                </Button>
              </span>
            ) : null}
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={tableData}
            size="small"
          />
          {this.state.needEdit ? (
            <div
              style={{
                backgroundColor: "#ffff",
                padding: 24,
                marginTop: "10px",
              }}
            >
              <Descriptions title="Edit Game">
                <Descriptions.Item label="Home Team">
                  Zhou Maomao
                </Descriptions.Item>
                <Descriptions.Item label="Away Team">
                  1810000000
                </Descriptions.Item>
                <Descriptions.Item label="Location">
                  Hangzhou, Zhejiang
                </Descriptions.Item>
                <Descriptions.Item label="Remark">empty</Descriptions.Item>
                <Descriptions.Item label="Address">
                  No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
              </Descriptions>
            </div>
          ) : null}
          ,
        </Content>
      </span>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    token: state.userReducer.token,
    mySchool: state.userReducer.mySchool,
    schoolDistrict: state.userReducer.schoolDistrict,
    userGameRedux: state.gameReducer.userGame,
    myTeamId: state.gameReducer.myTeam,
  };
};
export default connect(mapStatetoProps, null)(TestPending);
