import React, { Component } from "react";
import axios from "axios";
import { Button, Radio, Layout } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import Authtoken from "../../Utility/AuthToken";
import moment from "moment";
import "../../stylesheets/exportCSV.css";

//Filter imports
import { Select, Form, DatePicker } from "antd";
import { Row } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;
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
      anoState: [],
      exportTeam: [],
      everyTeams: [],

      preDate: "",
      postDate: "",

      preDateY: "",
      postDateY: "",

      preDateM: "",
      postDateM: "",

      preDateD: "",
      postDateD: "",
    };
    this.changeFilterOne = this.changeFilterOne.bind(this);
    this.calenderChange = this.calenderChange.bind(this);
    this.sortByTeam = this.sortByTeam.bind(this);
  }

  changeFilterOne(event) {
    const chosenTeam = event;
    const tmp = this.state.jData;

    const newTmp = [];

    console.log("ss", chosenTeam);
    console.log("tmp", tmp[0]);
    console.log("date", this.state.preDate);

    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].HomeTeam === chosenTeam || tmp[i].AwayTeam === chosenTeam) {
        const send = tmp[i];
        newTmp.push(send);
      } else {
        console.log("changeFilterOne - else");
      }
    }

    this.setState({
      anoState: newTmp,
    });

    console.log("I gotta see", newTmp);
  }

  // for preDate
  calenderChange(date) {
    console.log("this is it ", date);
    // if (date != null) {
    if (date[1] != null && date[0] != null) {
      const postD = date[1]?.format("MM/DD/YYYY");

      const preD = date[0]?.format("MM/DD/YYYY");

      //------------
      console.log(":HERE:");

      const startDate = moment(preD);
      const endDate = moment(postD);
      const currentDate = moment("05/03/2020");

      console.log("start", startDate, "end", endDate, "current", currentDate);
      if (startDate <= currentDate && currentDate <= endDate) {
        console.log("is it", currentDate);
        return currentDate;
      }

      //-------------

      this.setState({
        preDate: preD,

        postDate: postD,
      });
    }
  }

  sortByTeam(event) {
    console.log("im here");
    const teamFinal = [];

    const totalData = this.state.anoState;

    const startDate = this.state.preDate;
    const endDate = this.state.postDate;

    console.log("check", startDate, "");

    const start = startDate;
    const end = endDate;

    if (totalData != null) {
      for (let i = 0; i < totalData.length; i++) {
        console.log("TTTTTTTTTTESSSTT", totalData[i]);
        const current = moment(totalData[i].GameDate);

        console.log("s", start, "e", end, "c", current);
        console.log(start <= current && current <= end);

        if (start <= current && current <= end) {
          console.log("answer", current);
        }
      }

      // for (let i = 0; i < totalData.length; i++) {
      //   const valueY = parseInt(
      //     moment(totalData[i].GameDate, "YYYY-MM-DD").format("YYYY")
      //   );

      //   const valueM = parseInt(
      //     moment(totalData[i].GameDate, "YYYY-MM-DD").format("MM")
      //   );
      //   const valueD = parseInt(
      //     moment(totalData[i].GameDate, "YYYY-MM-DD").format("DD")
      //   );

      //   console.log("ohhhhhhhhh", valueM);

      //   console.log("testing", prD <= valueD && valueD <= poD);

      //   if (prY <= valueY && valueY <= poY) {
      //     console.log("Year's good");
      //     if (prM <= valueM && valueM <= poM) {
      //       console.log("month's good");
      //       if (prD <= valueD && valueD <= poD) {
      //         console.log("day's good", totalData[i]);
      //         const send = totalData[i];
      //         teamFinal.push(send);
      //       } else {
      //         console.log("Days cancelled");
      //       }
      //     } else {
      //       console.log("Months cancelled");
      //     }
      //   } else {
      //     console.log("No games on these range of dates");
      //   }
      // }

      // console.log("xmxm", teamFinal);

      // this.setState({
      //   exportTeam: teamFinal,
      // });
    }

    event.preventDefault();
  }

  // checkDate() {

  //     for (let i = 0; i < dataL.length; i++) {
  //       const valueY = parseInt(
  //         moment(dataL[i].GameDate, "YYYY-MM-DD").format("YYYY")
  //       );

  //       const valueM = parseInt(
  //         moment(dataL[i].GameDate, "YYYY-MM-DD").format("MM")
  //       );
  //       const valueD = parseInt(
  //         moment(dataL[i].GameDate, "YYYY-MM-DD").format("DD")
  //       );

  //       console.log("ohhhhhhhhh", valueM);

  //       console.log("testing", preM <= valueM && valueM <= postM);
  //       if (preY <= valueY) {
  //         console.log("Year's good");
  //         if (preM <= valueM && valueM <= postM) {
  //           console.log("month's good");
  //           if (preD <= valueD && valueD <= postD) {
  //             const send = dataL[i];
  //             newDate.push(send);
  //           }
  //         }
  //       } else {
  //         console.log("No games on these range of dates");
  //       }
  //     }
  //     this.setState({ exportTeam: newDate });
  //   }
  // }

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

    console.log(
      "final",
      this.state.preDateY,
      this.state.preDateM,
      this.state.preDateD,
      this.state.postDateY,
      this.state.postDateM,
      this.state.postDateD,
      this.state.anoState,
      "needed",
      this.state.exportTeam
    );

    if (this.state.jData !== []) {
      return (
        <Content
          style={{
            padding: "20px",
            marginTop: "20px",
            minHeight: 580,
          }}
          className="site-layout-background"
        >
          <Form {...formLayout}>
            <form onSubmit={this.sortByTeam}>
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

                  <Form.Item label="Select Date">
                    <RangePicker
                      format="MM/DD/YYYY"
                      onCalendarChange={this.calenderChange}
                    />
                  </Form.Item>

                  <Form.Item {...buttonLayout}>
                    <button
                      type="submit"
                      shape="round"
                      size="large"
                      // icon={<DownloadOutlined />}
                    >
                      Send to Process
                    </button>
                  </Form.Item>
                </div>
              </Row>
            </form>
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
