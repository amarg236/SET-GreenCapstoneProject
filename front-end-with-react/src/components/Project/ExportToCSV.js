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
function processData(rawEvents) {
  return rawEvents.map((event) => ({
    GameDate: moment(event.time, "YYYY-MM-DD").format("YYYY/MM/DD"),
    GameTime: moment(event.time, "YYYY-MM-DD HH:mm").format("h:mm A"),
    // Level: findTeamLevel(event.hometeam),
    Level: "Dummy",
    HomeTeam: event.hometeam,
    HomeLevel: "Dummy-Varsity",
    AwayTeam: event.awayteam,
    AwayLevel: "Dummy-JV",
  }));
}

// function findTeamLevel(inputHere) {
//   return "Dummy Level";
//   console.log(inputHere);
// }

class ExportToCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jData: [],
      anoState: [],
      exportTeam: [],
      everyTeams: [],

      mainGate: "",
      readyForExport: false,
      isItSchool: false,
      schoolData: [],
      needTeam: false,
      selectedSchoolId: "",
      teamObjData: [],
      selectedTeamId: "",
      teamSelected: [],
      exportObject: [],
      ifSelectedTeam: false,
    };
  }

  componentDidMount() {}

  headers = [
    { label: "Date", key: "GameDate" },
    { label: "Time", key: "GameTime" },
    { label: "Level", key: "Level" },
    { label: "Home-Team", key: "HomeTeam" },
    { label: "Home-Level", key: "HomeLevel" },
    { label: "Away-Team", key: "AwayTeam" },
    { label: "Away-Level", key: "AwayLevel" },
  ];

  filterByGate = (value) => {
    console.log(value);
    if (value == "all") {
      this.setState({
        readyForExport: true,
        isItSchool: false,
        needTeam: false,
      });
    } else if (value == "school") {
      this.setState({ isItSchool: true });
      this.fetchSchool();
    }
  };

  fetchSchool = () => {
    const emptyBody = {};
    axios
      .post(
        Authtoken.getBaseUrl() + "/api/location/school/get/all",
        emptyBody,
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
          this.setState({ schoolData: res.data.result });
        }
      });
  };

  fetchTeamForSchool = () => {
    const teamObj = {
      id: this.state.selectedSchoolId,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/team/get/bySchool", teamObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        if (res.data.httpStatusCode == 202) {
          console.log(res);
          this.setState({ teamObjData: res.data.result });
        }
      });
  };

  onSelectSchool = (value) => {
    this.setState({
      needTeam: true,
    });
    this.setState({
      selectedSchoolId: value,
    });
    console.log(value);
  };

  onSelectTeam = (value) => {
    const getFromValue = JSON.parse(value);

    this.setState({
      selectedTeamId: getFromValue.id,
      teamSelected: getFromValue,
    });
  };

  finalProcess = () => {
    // const preObj = this.state.
    // allSchedule()
    console.log("I have been triggred");

    const emptyBody = {};
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/get/all", emptyBody, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        if (res.data.httpStatusCode == 202) {
          console.log(res);
          console.log(this.state.selectedTeamId);
          let myData = [];

          myData = res.data.result.filter((myGames) =>
            // console.log(myTeamId.has(myGames.awayteamId));
            this.state.selectedSchoolId
              ? myGames.hometeamId == this.state.selectedTeamId ||
                myGames.awayteamId == this.state.selectedTeamId
              : myGames
          );

          console.log(myData);

          let anotherLevel = myData.sort(
            (a, b) => new Date(b.create_At) - new Date(a.create_At)
          );
          console.log("another level>>");
          console.log(anotherLevel);

          this.setState({
            exportObject: processData(anotherLevel),
            readyForExport: true,
          });
        }

        // this.setState({ teamObjData: res.data.result });
      });
  };

  // alternativeFinalProcess=()=>{

  // }

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
                  <h2 id="header-one">Export to CSV</h2>
                </Form.Item>
                <Form.Item label="Filter by">
                  <Select
                    showSearch
                    onChange={this.filterByGate}
                    style={{ width: "85%" }}
                    placeholder="Select one option"
                  >
                    <Option key="all">Export all</Option>
                    <Option key="school">School</Option>
                    {
                      // <Option key="team">Team</Option>
                    }
                  </Select>
                </Form.Item>

                {this.state.isItSchool ? (
                  <Form.Item label="Select School">
                    <Select
                      showSearch
                      onChange={this.onSelectSchool}
                      style={{ width: "85%" }}
                      placeholder="Select one option"
                    >
                      {this.state.schoolData.map((sc) => (
                        <Option key={sc.id} value={sc.id}>
                          {sc.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : null}

                {this.state.ifSelectedTeam ? (
                  <Form.Item label="Select School">
                    <Select
                      showSearch
                      onChange={this.onSelectSchool}
                      style={{ width: "85%" }}
                      placeholder="Select one option"
                    >
                      {this.state.schoolData.map((sc) => (
                        <Option key={sc.id} value={sc.id}>
                          {sc.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : null}

                {this.state.needTeam ? (
                  <Form.Item label="Select Team">
                    <Select
                      showSearch
                      onChange={this.onSelectTeam}
                      style={{ width: "85%" }}
                      placeholder="Select Team"
                      onFocus={this.fetchTeamForSchool}
                    >
                      <Option key="999" value="999">
                        No Thanks
                      </Option>
                      {this.state.teamObjData.map((sc) => (
                        <Option key={sc.id} value={JSON.stringify(sc)}>
                          {sc.tmName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : null}

                <Form.Item {...buttonLayout}>
                  <Button
                    shape="round"
                    size="large"
                    onClick={() => this.finalProcess()}
                    icon={<DownloadOutlined />}
                  >
                    Process Data For Export
                  </Button>
                </Form.Item>
              </div>
            </Row>
          </form>
        </Form>
        {this.state.readyForExport ? (
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
                  <h2 className="bottom-header">Export into CSV File</h2>
                </Form.Item>

                <Form.Item {...buttonLayout}>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    icon={<DownloadOutlined />}
                    onClick={() => this.setState({ readyForExport: false })}
                  >
                    <CSVLink
                      headers={this.headers}
                      data={this.state.exportObject}
                    >
                      <span className="button-all"> Export All Schedule</span>
                    </CSVLink>
                  </Button>
                </Form.Item>
              </div>
            </Row>
          </Form>
        ) : null}{" "}
      </Content>
    );
  }
}

export default ExportToCSV;
