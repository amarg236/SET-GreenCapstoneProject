import React, { Component } from "react";
import axios from "axios";
import { Button, Radio, Layout } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import Authtoken from "../../Utility/AuthToken";
import moment from "moment";
import "../../stylesheets/exportCSV.css";

//Filter imports
import { Select, Form, DatePicker, PageHeader } from "antd";
import { Row } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Content } = Layout;

// Export Formatted for all data on calender.
function processData(rawEvents) {
  console.log("inside>>", rawEvents);
  return axios.all(
    rawEvents.map((event) => {
      console.log("event>>", event.hometeamId);
      return axios
        .all([
          axios.post(
            Authtoken.getBaseUrl() + "/api/team/get/byId",
            {
              id: event.hometeamId,
            },
            {
              headers: {
                Authorization:
                  "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
              },
            }
          ),
          axios.post(
            Authtoken.getBaseUrl() + "/api/team/get/byId",
            {
              id: event.awayteamId,
            },
            {
              headers: {
                Authorization:
                  "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
              },
            }
          ),
        ])
        .then(([teamData, awayTeam]) => {
          return {
            GameDate: moment(event.time, "YYYY-MM-DD").format("YYYY/MM/DD"),
            GameTime: moment(event.time, "YYYY-MM-DD HH:mm").format("h:mm A"),
            // Level: findTeamLevel(event.hometeam),
            Level: teamData.data.result.tmClass,
            HomeTeam: event.hometeam,
            HomeLevel: teamData.data.result.tmClass,
            AwayTeam: event.awayteam,
            AwayLevel: awayTeam.data.result.tmClass,
          };
        });
    })
  );
}

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
      showTeamForm: false,
      fetchedAllTeam: [],
      showAlternativeButton: false,
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
        showTeamForm: false,
      });
      this.finalProcess();
    } else if (value == "school") {
      this.setState({
        isItSchool: true,
        showTeamForm: false,
        readyForExport: false,
      });
      this.fetchSchool();
    } else if (value == "team") {
      this.setState({
        showTeamForm: true,
        readyForExport: false,
        isItSchool: false,
        needTeam: false,
      });
      console.log("Select Team");
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

  onSelectAllTeam = (value) => {
    const getFromValue = JSON.parse(value);

    this.setState({
      selectedTeamId: getFromValue.id,
      teamSelected: getFromValue,
      showAlternativeButton: true,
    });
  };
  fetchAllTeam = () => {
    function getTeam() {
      const forTeam = {};
      return axios.post(Authtoken.getBaseUrl() + "/api/team/get", forTeam, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      });
    }

    axios.all([getTeam()]).then(
      axios.spread((allTeam) => {
        console.log(allTeam);
        // Both requests are now complete
        console.log(allTeam.data.result);
        this.setState({ fetchedAllTeam: allTeam.data.result });
      })
    );
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
            //  console.log(myTeamId.has(myGames.awayteamId));
            this.state.selectedSchoolId
              ? (myGames.hometeamId == this.state.selectedTeamId ||
                  myGames.awayteamId == this.state.selectedTeamId) &&
                myGames.approved
              : myGames.approved
          );

          console.log(myData);

          let anotherLevel = myData.sort(
            (a, b) => new Date(b.create_At) - new Date(a.create_At)
          );
          console.log("another level>>");
          console.log(anotherLevel);

          processData(anotherLevel).then((processedData) => {
            console.log("I am here");
            this.setState({
              exportObject: processedData,
              readyForExport: true,
            });
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
        <div
          style={{
            alignContent: "center",
            width: "100%",
            backgroundColor: "#ffffff",
            marginBottom: "10px",
            padding: "20px",
            boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
          }}
        >
          <h3>Fully Approved Games</h3>
          <p>
            Following form will help to filter fully approved games for CSV
            export
          </p>
        </div>{" "}
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
                    <Option key="team">Team</Option>
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

                {this.state.needTeam ? (
                  <Form.Item label="Select Team">
                    <Select
                      showSearch
                      onChange={this.onSelectTeam}
                      style={{ width: "85%" }}
                      placeholder="Select Team"
                      onFocus={this.fetchTeamForSchool}
                    >
                      {this.state.teamObjData.map((sc) => (
                        <Option key={sc.id} value={JSON.stringify(sc)}>
                          {sc.tmName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : null}
                {this.state.showTeamForm ? null : (
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
                )}
              </div>
            </Row>
          </form>
        </Form>
        {this.state.showTeamForm ? (
          <Form {...formLayout}>
            <Row>
              {" "}
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
                <Form.Item label="Select Team">
                  <Select
                    showSearch
                    onChange={this.onSelectAllTeam}
                    style={{ width: "85%" }}
                    placeholder="Select Team"
                    onFocus={this.fetchAllTeam}
                  >
                    {this.state.fetchedAllTeam.map((sc) => (
                      <Option key={sc.id} value={JSON.stringify(sc)}>
                        {sc.tmName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Row>
          </Form>
        ) : null}
        {this.state.showAlternativeButton ? (
          <Form {...formLayout}>
            <Row>
              {" "}
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
          </Form>
        ) : null}
        {this.state.readyForExport ? (
          <span>
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
                      onClick={() =>
                        this.setState({
                          readyForExport: false,
                          showTeamForm: false,
                          showAlternativeButton: false,
                          isItSchool: false,
                          needTeam: false,
                        })
                      }
                    >
                      {
                        <CSVLink
                          headers={this.headers}
                          data={this.state.exportObject}
                        >
                          <span className="button-all">
                            {" "}
                            Export All Schedule
                          </span>
                        </CSVLink>
                      }
                    </Button>
                  </Form.Item>
                </div>
              </Row>
            </Form>
          </span>
        ) : null}{" "}
      </Content>
    );
  }
}

export default ExportToCSV;
