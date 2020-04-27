import "../../App.css";
import React, { Component } from "react";

import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import moment from "moment";

import { Row, Layout, Col, Button, Table, Statistic, Descriptions } from "antd";
const { Content } = Layout;

function callback(key) {
  console.log(key);
}

class ViewTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      team: [],
      school: [],
      isRejected: null,
    };
  }

  async componentDidMount() {
    //getting current users team and school

    const emptyObj = {};

    try {
      const res = await axios.post(
        Authtoken.getBaseUrl() + "/api/team/get/",
        emptyObj,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        }
      );

      console.log("current school teams");
      console.log(res.data.result);

      this.setState({
        team: res.data.result,
        loading: false,
      });
    } catch (e) {
      console.error(`Problem fetching data ${e}`);
    }
  }

  // Deny Game function
  deleteTeam = (display) => {
    console.log(display);
    const emptyObj = {
      id: display.key,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/team/delete", emptyObj, {
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
    const { team } = this.state;
    console.log("render>>");

    const processedData = team.map((row) => ({
      key: row.id,
      teamName: row.tmName,
      teamClass: row.tmClass,
      teamGender: row.teamGender,
      school: row.school.name,
    }));
    const tableData = processedData;
    console.log("tableData>>");

    console.log(tableData);
    const getFilteredData = (rejected) => columns.filter({});

    const columns = [
      {
        title: "TeamName",
        dataIndex: "teamName",
        key: "teamName",
      },
      {
        title: "TeamClass",
        dataIndex: "teamClass",
        key: "teamClass",
      },
      {
        title: "TeamGender",
        dataIndex: "teamGender",
        key: "teamGender",
      },
      {
        title: "School",
        dataIndex: "school",
        key: "school",
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (record) => (
          <span>
            <Button
              onClick={() => this.deleteTeam(record)}
              type="link"
              style={{ marginRight: 16 }}
            >
              Delete
            </Button>
          </span>
        ),
      },
    ];

    console.log(tableData);
    return (
      <Content
        className="site-layout-background"
        style={{
          marginTop: "10px",
          minHeight: 580,
        }}
      >
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
  };
};
export default connect(mapStatetoProps, null)(ViewTeam);
