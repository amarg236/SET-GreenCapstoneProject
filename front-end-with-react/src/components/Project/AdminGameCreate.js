import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import "../../stylesheets/mediaQue.css";

import {
  Form,
  Input,
  Button,
  Layout,
  DatePicker,
  TimePicker,
  Select,
  Row,
  Col,
  Alert,
  Modal,
} from "antd";
const { Content } = Layout;
const { RangePicker } = TimePicker;

class AdminCreateGame extends Component {
  constructor(props) {
    super(props);

    this.onChangeGameDate = this.onChangeGameDate.bind(this);
    this.onChangeGameStartTime = this.onChangeGameStartTime.bind(this);
    this.onChangeGameEndTime = this.onChangeGameEndTime.bind(this);
    this.onChangeGameLocation = this.onChangeGameLocation.bind(this);
    this.onChangeAgainstTeam = this.onChangeAgainstTeam.bind(this);
    this.onChangeAgainstTeamDistrict = this.onChangeAgainstTeamDistrict.bind(
      this
    );
    this.onChangeGameTime = this.onChangeGameTime.bind(this);
    this.gameSubmit = this.gameSubmit.bind(this);
    this.chooseClass = this.chooseClass.bind(this);
  }

  state = {
    homeTeam: "",
    homeTeamId: "",
    homeTeamObj: [],
    awaySchoolObj: [],
    awaySchoolList: [],
    awaySchoolTeamList: [],
    selectedDistrict: {
      id: "",
      districtName: "",
    },
    gameDate: moment().format("YYYY-MM-DD"),
    gameStartTime: moment().format("HH:mm"),
    gameEndTime: moment().format("HH:mm"),
    // gameEndTime: moment()
    //   .add(30, "minute")
    //   .format("HH:mm"),
    gameLocation: "",
    againstTeam: "",
    awayteamId: "",
    againstSchool: "",
    againstTeamDistrict: "",
    againstTeamDistrictId: "",
    gameTime: "",

    fetchedAllTeam: [],
  };

  componentDidMount() {
    this.fetchAllTeam();
  }
  fetchAllTeam = () => {
    const emptyobj = {};
    axios
      .post(Authtoken.getBaseUrl() + "/api/team/get", emptyobj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          fetchedAllTeam: res.data.result,
        });
      });
  };
  //added in antdesign
  dateFormat = "YYYY-MM-DD";
  monthFormat = "YYYY/MM";

  onChangeGameTime(time, timeString) {
    console.log(time[0]?.format("HH:mm"));
    console.log(time[1]?.format("HH:mm"));
    this.setState({ gameStartTime: time[0]?.format("HH:mm") });
    this.setState({ gameEndTime: time[1]?.format("HH:mm") });
    // console.log(time.format("HH:mm"));
  }

  // onChangeHomeTeam = value => {
  //   // this.setState({ homeTeam: e.target.value });
  //   console.log(value);
  // };

  onChangeGameDate(date, dateString) {
    // console.log(date);
    console.log(dateString);
    // this.setState({ gameDate: dateString });
    this.setState({ gameDate: date?.format("YYYY-MM-DD") });
  }

  onChangeGameStartTime(e) {
    this.setState({ gameStartTime: e.target.value });
  }

  onChangeGameEndTime(e) {
    this.setState({ gameEndTime: e.target.value });
  }
  onChangeGameLocation(e) {
    this.setState({ gameLocation: e.target.value });
  }
  onChangeAgainstTeam(e) {
    this.setState({ againstTeam: e.target.value });
  }

  onChangeAgainstTeamDistrict(e) {
    this.setState({ againstTeamDistrict: e.target.value });
  }

  chooseClass() {
    const ch = this.props.ifcollapsed;
    if (!ch) {
      return "`CGForm`";
    } else {
      return "`xform`";
    }
  }

  successMsg = () => {
    Modal.success({
      content: (
        <div>
          <p>Great ! Game has been saved.</p>
        </div>
      ),
    });
  };

  errorMsg = (error) => {
    Modal.error({
      content: (
        <div>
          <p>Sorry ! Game couldn't be saved.</p>
          <p>Reason: {error}</p>
        </div>
      ),
    });
  };

  gameSubmit(e) {
    e.preventDefault();
    const startDate = moment(this.state.gameDate)
      .set("hours", 0)
      .set("minutes", 0);
    const startTime = moment(this.state.gameStartTime, "HH:mm");
    const endTime = moment(this.state.gameEndTime, "HH:mm");

    const gameStart = moment(startDate)
      .add(startTime.hours(), "hour")
      .add(startTime.minutes(), "minute");

    const gameDuration = moment.duration(endTime.diff(startTime)).as("minutes");
    console.log(gameDuration);

    const gameObject = {
      time: moment(gameStart).format("YYYY-MM-DD HH:mm"),

      awayteam: this.state.againstTeam,
      awayteamId: this.state.awayteamId,
      awaydistrict: {
        districtName: this.state.againstTeamDistrict,
        id: this.state.againstTeamDistrictId,
      },
      duration: gameDuration,
      hometeam: this.state.homeTeam,
      hometeamId: this.state.homeTeamId,
      homedistrict: {
        districtName: this.props.schoolDistrict.districtName,
        id: this.props.schoolDistrict.id,
      },
      location: this.state.gameLocation,
    };

    console.log(gameObject);
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/save", gameObject, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.httpStatusCode == 409) {
          this.errorMsg(res.data.message);
          console.log("Time Conflict");
          console.log(res.data.message);
        } else if (res.data.httpStatusCode == 202) {
          console.log("Game Saved");
          this.successMsg();
        }
        // window.alert("The Game has been created successfully!!");
        // window.location.reload();
      });
  }
  handleHomeTeam = (value) => {
    const passedValue = JSON.parse(value);
    // console.log(passedValue);
    this.setState({ homeTeam: passedValue.tmName });
    this.setState({ homeTeamId: passedValue.id });
  };
  handleAwayTeam = (value) => {
    const getFromValue = JSON.parse(value);
    console.log(getFromValue);
    this.setState({ againstTeam: getFromValue.tmName });
    this.setState({ awayteamId: getFromValue.id });
  };

  handleSchool = (value) => {
    const schoolV = JSON.parse(value);
    console.log(schoolV);
    console.log("I got printed here");
    console.log(schoolV.name);
    this.setState({ againstSchool: schoolV.name });

    // this.setState({ schoolId: schoolValue.id });
    const awayTeamBody = {
      id: schoolV.id,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/team/get/bySchool", awayTeamBody, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        // console.log("i am team  by school id");
        console.log(res.data.result);
        this.setState({ awaySchoolTeamList: res.data.result });
      });
  };
  teamClass = (teamClass) => {
    console.log(teamClass);
    // this.setState({ teamClass: teamClass });
  };

  handleDistrict = (value) => {
    console.log("I have been executed");
    const dummy = JSON.parse(value);
    console.log("Dummy data result below");
    console.log(dummy);
    this.setState({ againstTeamDistrict: dummy.districtName });
    this.setState({ againstTeamDistrictId: dummy.id });
    this.setState({
      selectedDistrict: {
        id: dummy.id,
        districtName: dummy.districtName,
      },
    });

    // console.log("I have been executed");
    //fetching school depending upon the value of district
    const schoolBody = {
      districtName: dummy.districtName,
      id: dummy.id,
    };
    axios
      .post(
        Authtoken.getBaseUrl() + "/api/location/school/get/district",
        schoolBody,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        }
      )
      .then((res) => {
        // console.log("i am school by district");
        // console.log(res.data.result);
        this.setState({ awaySchoolList: res.data.result });
      });
    //fetching away school team depending upon the value of school
  };

  render() {
    // console.log("school here");
    // console.log(this.state.awaySchoolList);
    // console.log("school here");
    // console.log("typee", this.props.ifcollapsed);
    const layout = {
      labelCol: {
        span: 10,
      },
      wrapperCol: {
        span: 10,
      },
    };
    const validateMessages = {
      required: "This field is required!",
      types: {
        email: "Not a valid email!",
        number: "Not a valid number!",
      },
      number: {
        range: "Must be between ${min} and ${max}",
      },
    };
    // console.log("thi sis new schoo list");
    // console.log(this.state.awaySchoolList);

    return (
      <Content
        className="mediaCG"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580,
        }}
      >
        <Row style={{ backgroundColor: "#ffff" }}>
          <Col span={16}>
            <div
              style={{
                backgroundColor: "#ffff",
                padding: "20px",
                boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
              }}
            >
              <Form
                {...layout}
                name="nest-messages"
                onSubmit={this.gameSubmit}
                validateMessages={validateMessages}
              >
                <Form.Item label="Select District" name="teamADistrict">
                  <Select
                    size="large"
                    defaultValue="Select Options"
                    style={{ width: 280 }}
                    onChange={this.handleHomeTeam}
                  >
                    {this.state.fetchedAllTeam.map((homeTeamDetails) => (
                      <Select.Option
                        key={homeTeamDetails.id}
                        // value={index}
                        value={JSON.stringify(homeTeamDetails)}
                      >
                        {homeTeamDetails.tmName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Select Home Team" name="homeTeam">
                  <Select
                    size="large"
                    defaultValue="Select Options"
                    style={{ width: 280 }}
                    onChange={this.handleHomeTeam}
                  >
                    {this.state.fetchedAllTeam.map((homeTeamDetails) => (
                      <Select.Option
                        key={homeTeamDetails.id}
                        // value={index}
                        value={JSON.stringify(homeTeamDetails)}
                      >
                        {homeTeamDetails.tmName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="gameDate"
                  label="Choose Date"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: 280 }}
                    value={this.state.gameDate}
                    onChange={this.onChangeGameDate}
                    // defaultValue={moment("2020-03-08", this.dateFormat)}
                    format={this.dateFormat}
                  />
                </Form.Item>
                <Form.Item
                  name="gametime"
                  label="Choose Time"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <RangePicker
                    style={{ width: 280 }}
                    minuteStep={5}
                    format="HH:mm"
                    value={this.state.gameTime}
                    onChange={this.onChangeGameTime}
                  />
                </Form.Item>
                <Form.Item name="location" label="Location" rules={[{}]}>
                  <Input
                    style={{ width: 280 }}
                    onChange={this.onChangeGameLocation}
                    value={this.state.gameLocation}
                    placeholder="Location"
                  />
                </Form.Item>
                <Form.Item label="Select District" name="districtName">
                  <Select
                    size="large"
                    defaultValue="Select Options"
                    style={{ width: 280 }}
                    value={this.state.againstTeamDistrict}
                    onChange={this.handleDistrict}
                  >
                    {this.state.awaySchoolObj.map((item, index) => (
                      <Select.Option
                        key={index}
                        // value={index}
                        value={JSON.stringify(item)}
                      >
                        {item.districtName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Select School" name="schoolName">
                  <Select
                    size="large"
                    defaultValue="Select Options"
                    style={{ width: 280 }}
                    value={this.state.againstSchool}
                    onChange={this.handleSchool}
                  >
                    {this.state.awaySchoolList.map((schoolMap, index) => (
                      <Select.Option
                        key={index}
                        value={JSON.stringify(schoolMap)}
                      >
                        {schoolMap.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Select Team" name="awayTeam">
                  <Select
                    size="large"
                    defaultValue="Select Options"
                    style={{ width: 280 }}
                    value={this.state.againstTeam}
                    onChange={this.handleAwayTeam}
                  >
                    {this.state.awaySchoolTeamList.map((teamMap) => (
                      <Select.Option
                        key={teamMap.id}
                        // value={index}
                        value={JSON.stringify(teamMap)}
                      >
                        {teamMap.tmName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.gameSubmit}
                  >
                    Request Game
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.userReducer.username,
    token: state.userReducer.token,
  };
};
export default connect(mapStatetoProps)(AdminCreateGame);
