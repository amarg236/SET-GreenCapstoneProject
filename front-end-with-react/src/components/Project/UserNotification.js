import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import Authtoken from "../../Utility/AuthToken";
import React, { Component } from "react";
import {
  Table,
  Tag,
  Button,
  Form,
  PageHeader,
  Modal,
  Input,
  Layout,
} from "antd";
// import { PlusOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { TextArea } = Input;

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
    urequester: row.urequester,
    hasBeenEdited: row.hasBeenEdited,
  }));
}

class UserNotification extends Component {
  state = {
    goodDay: [],
    refresh: false,
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    const currentSchool = {
      id: this.props.school.id,
    };
    axios
      .post(
        Authtoken.getBaseUrl() + "/api/game/get/BySchoolId/hasNotification",
        currentSchool,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.httpStatusCode == 202) {
          if (res.data.result.length > 0) {
            this.setState({
              isThereNotification: true,
              notificationData: processData(
                res.data.result.sort(
                  (a, b) => new Date(b.create_At) - new Date(a.create_At)
                )
              ),
            });
          }
        }

        // console.log(this.state.inComingNewGameNot);
      });
  };

  deletenotice = (record) => {
    console.log(record.key);
    const deleteObj = {
      id: record.key,
    };
    console.log(deleteObj);
    axios
      .post(Authtoken.getBaseUrl() + "/api/team/day/bad/remove", deleteObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          this.successMsg("The day has been removed from good day list . ");
          this.setState((prevState) => ({
            refresh: !prevState.refresh,
          }));
        } else {
          this.errorMsg("Sorry day  could not be deleted.");
        }
      });
  };
  render() {
    // const { notice } = this.state.notice;
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
        // sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      },
    ];
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
          <div
            style={{
              backgroundColor: "#ffff",
              padding: "20px",

              boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontWeight: "bold",
                color: "#083045",
              }}
            >
              Latest Game Updates
            </h2>
          </div>

          <div
            style={{
              backgroundColor: "#ffff",
              padding: "20px",
              boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
              marginBottom: "10px",
            }}
          >
            <Table columns={columns} dataSource={this.state.notificationData} />
          </div>
        </Content>
      </span>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    token: state.userReducer.token,
    school: state.userReducer.mySchool,
  };
};

export default connect(mapStatetoProps)(UserNotification);
