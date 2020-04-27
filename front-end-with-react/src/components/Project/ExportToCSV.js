import React, { Component } from "react";
import axios from "axios";
import { Button, Radio, Layout } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import Authtoken from "../../Utility/AuthToken";
import moment from "moment";
import "../../stylesheets/exportCSV.css";

//Filter imports
import { Select, Form } from "antd";
import { Row } from "antd";

const { Option } = Select;
const { Content } = Layout;

// Export Formatted for all data on calender.
function allSchedule(rawEvents) {
  return rawEvents.result.map((event) => ({
    GameDate: moment(event.time, "YYYY-MM-DD").format("YYYY/MM/DD"),
    GameTime: moment(event.time, "YYYY-MM-DD HH:mm").format("h:mm A"),
    Level: "Dummy_L",
    HomeTeam: event.hometeam,
    HomeLevel: "Dummy-Varsity",
    AwayTeam: event.awayteam,
    AwayLevel: "Dummy-JV",
  }));
}

class ExportToCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jData: [],
      team: "",
      exportTeam: "",
      everyTeams: [],
      month: null,
      day: null,
    };
    this.changeFilterOne = this.changeFilterOne.bind(this);
  }

  changeFilterOne(event) {
    this.setState({
      team: event,
    });

    const chosenTeam = event;
    const tmp = this.state.jData;
    const newTmp = [];

    console.log("ss", chosenTeam);
    console.log("tmp", tmp[0]);
    console.log("send", this.state.jData);

    for (let i = 0; i < tmp.length; i++) {
      // console.log(
      //   "what",
      //   tmp[i].HomeTeam === chosenTeam || tmp[i].A === chosenTeam
      // );

      if (tmp[i].HomeTeam === chosenTeam || tmp[i].AwayTeam === chosenTeam) {
        const send = tmp[i];
        newTmp.push(send);
        console.log("another", tmp[i]);
        console.log("sending", send);
        console.log("newTmp", newTmp);
        // return this.setState({ exportTeam: allSchedule(send) });
      } else {
        console.log("Not", tmp[i]);
      }
    }
    console.log("I gotta see", newTmp);
    this.setState({ exportTeam: newTmp });
  }

  componentDidMount() {
    const emptyBody = {};

    axios
      .post(Authtoken.getBaseUrl() + "/api/game/get/all", emptyBody, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log("noway", res);
        this.setState({ jData: allSchedule(res.data) });

        // Getting all teams in one state.
        let tmpArray = [];

        for (let i = 0; i < res.data.result.length; i++) {
          tmpArray.push(res.data.result[i].hometeam);
        }

        for (let i = 0; i < res.data.result.length; i++) {
          tmpArray.push(res.data.result[i].awayteam);
        }

        let allTeams = new Set(tmpArray);
        let teams = [...allTeams];

        this.setState({ everyTeams: teams });
      });
  }

  headers = [
    { label: "Date", key: "GameDate" },
    { label: "Time", key: "GameTime" },
    { label: "Level", key: "Level" },
    { label: "Home-Team", key: "HomeTeam" },
    { label: "Home-Level", key: "HomeLevel" },
    { label: "Away-Team", key: "AwayTeam" },
    { label: "Away-Level", key: "AwayLevel" },
  ];

  render() {
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };

    const buttonLayout = {
      wrapperCol: { span: 14, offset: 4 },
    };

    console.log("final", this.state.exportTeam);

    if (this.state.jData !== []) {
      return (
        <Content
          style={{
            padding: "20px",
            margin: 0,
            minHeight: 580,
          }}
          className="site-layout-background"
        >
          <Form {...formLayout}>
            <Row>
              <div
                style={{
                  alignContent: "center",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
                }}
              >
                <Form.Item>
                  <h2 id="header-one">Schedule Sort By Team</h2>
                </Form.Item>
                <Form.Item label="Listed Teams">
                  <Select
                    showSearch
                    onChange={this.changeFilterOne}
                    style={{ width: "85%" }}
                    placeholder="Choose a Team"
                  >
                    {this.state.everyTeams.map((data) => (
                      <Option key={data}>{data}</Option>
                    ))}
                    );
                  </Select>
                </Form.Item>

                <Form.Item {...buttonLayout}>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    icon={<DownloadOutlined />}
                  >
                    <CSVLink
                      headers={this.headers}
                      data={this.state.exportTeam}
                    >
                      <span className="button-all"> Export</span>
                    </CSVLink>
                  </Button>
                </Form.Item>
              </div>
            </Row>
          </Form>

          {/* FOR ANOTHER FILTER By DATE Option
            <Row>
              <div
                style={{
                  alignContent: "center",
                  marginTop: "15px",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
                }}
              >
                <Form.Item>
                  <h2 className="bottom-header">EXPORT ALL SCHEDULE</h2>
                </Form.Item>

                <Form.Item {...buttonLayout}>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    icon={<DownloadOutlined />}
                  >
                    <CSVLink headers={this.headers} data={this.state.jData}>
                      <span> Export All Schedule</span>
                    </CSVLink>
                  </Button>
                </Form.Item>
              </div>
            </Row> */}

          {/*  FOR ANOTHER FILTER 
            <Row>
              <div
                style={{
                  alignContent: "center",
                  marginTop: "15px",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
                }}
              >
                <Form.Item>
                  <h2 className="bottom-header">EXPORT ALL SCHEDULE</h2>
                </Form.Item>

                <Form.Item {...buttonLayout}>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    icon={<DownloadOutlined />}
                  >
                    <CSVLink headers={this.headers} data={this.state.jData}>
                      <span> Export All Schedule</span>
                    </CSVLink>
                  </Button>
                </Form.Item>
              </div>
            </Row> */}

          <Form {...formLayout}>
            <Row>
              <div
                style={{
                  alignContent: "center",
                  marginTop: "15px",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
                }}
              >
                <Form.Item>
                  <h2 className="bottom-header">EXPORT ALL SCHEDULE</h2>
                </Form.Item>

                <Form.Item {...buttonLayout}>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    icon={<DownloadOutlined />}
                  >
                    <CSVLink headers={this.headers} data={this.state.jData}>
                      <span className="button-all"> Export All Schedule</span>
                    </CSVLink>
                  </Button>
                </Form.Item>
              </div>
            </Row>
          </Form>
        </Content>
      );
    }
  }
}

export default ExportToCSV;
