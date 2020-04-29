import "../../App.css";
import React, { Component } from "react";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import moment from "moment";

import {
  Row,
  Layout,
  Col,
  Button,
  Table,
  Input,
  DatePicker,
  Modal,
  Tag,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Content } = Layout;

function callback(key) {
  console.log(key);
}

class AdminRejectedGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: [],
      school: [],
      isRejected: null,
      refresh: false,
    };
  }

  componentDidMount() {
    //getting current users team and school
    this.fetchApi();
    // this.setState({ awaySchoolTeamList: res.data.result });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.refresh != this.state.refresh) {
      this.fetchApi();
    }
  }

  fetchApi = () => {
    const emptyObj = {};

    axios
      .post(Authtoken.getBaseUrl() + "/api/game/get/all", emptyObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.httpStatusCode == 202) {
          console.log("res>>");
          console.log(res.data.result);
          const myData = res.data.result.filter(function (adminViewGames) {
            return adminViewGames.rejected && adminViewGames.awayAccepted;
          });
          console.log("myData>>");
          console.log(myData);
          this.setState({
            game: myData,
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.errorMsg(`Problem fetching data ${error}`);
      });
  };

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
      rejected: row.rejected,
      awayAccepted: row.awayAccepted,
      alreadyDecided: row.uapprover,
    }));
    const tableData = processedData;

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
        ...this.getColumnSearchProps("awayTeam"),
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
        title: "Status",
        dataIndex: "",
        key: "x",
        render: (record) => (
          <span>
            <Tag color="red">Rejected</Tag>
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

    console.log(tableData);
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
        <Table
          hideOnSinglePage
          //   rowSelection={rowSelection}
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
  };
};
export default connect(mapStatetoProps, null)(AdminRejectedGames);
