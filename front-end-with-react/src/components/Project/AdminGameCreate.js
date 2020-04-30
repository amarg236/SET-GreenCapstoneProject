import React, { Component } from "react";
import { createGameAction } from "../../actions/loginAction";
import moment from "moment";
import { connect } from "react-redux";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import "../../stylesheets/mediaQue.css";
import SecondForm from "./SecondaryCreateGame";

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
  }

  state = {
    teamADistrictName: "",
    teamADistrictId: "",
    teamADistrictObj: [],
    fetchedSchoolObject: [],
    teamAschoolName: "",
    teamASchoolId: "",
    fetchedTeam: [],
    teamAName: "",
    teamAId: "",
    gameTime: "",
    gameDate: moment().format("YYYY-MM-DD"),
    gameStartTime: moment().format("HH:mm"),
    gameEndTime: moment().format("HH:mm"),
    gameLocation: "",
    finalTeamAData: [],
    nextStep: false,
  };

  componentDidMount() {
    this.fetchTeamADistrict();
  }

  fetchTeamADistrict = () => {
    axios
      .post(
        Authtoken.getBaseUrl() + "/api/location/district/get",
        {},
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        }
      )
      .then((res) => {
        this.setState({ teamADistrictObj: res.data.result });
      });
  };

  //added in antdesign
  dateFormat = "YYYY-MM-DD";
  monthFormat = "YYYY/MM";

  onChangeGameTime = (time, timeString) => {
    console.log(time[0]?.format("HH:mm"));
    console.log(time[1]?.format("HH:mm"));
    this.setState({ gameStartTime: time[0]?.format("HH:mm") });
    this.setState({ gameEndTime: time[1]?.format("HH:mm") });
    // console.log(time.format("HH:mm"));
  };

  onChangeGameDate = (date, dateString) => {
    // console.log(date);
    console.log(dateString);
    // this.setState({ gameDate: dateString });
    this.setState({ gameDate: date?.format("YYYY-MM-DD") });
  };

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

  gameSubmit = (e) => {
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

      hometeam: this.state.teamAName,
      hometeamId: this.state.teamAId,
      homedistrict: {
        districtName: this.state.teamADistrictName,
        id: this.state.teamADistrictId,
      },
      duration: gameDuration,
      location: this.state.gameLocation,
    };
    this.setState({
      finalTeamAData: gameObject,
      nextStep: true,
    });
    this.props.createGameAction(gameObject);
    console.log(gameObject);
  };

  handleDistrict = (value) => {
    const dummy = JSON.parse(value);
    console.log("Dummy data result below");
    console.log(dummy.id);
    this.setState({
      teamADistrictName: dummy.districtName,
      teamADistrictId: dummy.id,
    });

    const schoolBody = {
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
        this.setState({ fetchedSchoolObject: res.data.result });
      });
  };

  handleSchool = (value) => {
    const mummy = JSON.parse(value);
    const schoolBody = {
      id: mummy.id,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/team/get/bySchool", schoolBody, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        this.setState({ fetchedTeam: res.data.result });
        console.log(res);
      });
    console.log("I am here in handle");
  };

  handleTeamA = (value) => {
    const teamATeam = JSON.parse(value);
    console.log(teamATeam);
    this.setState({
      teamAId: teamATeam.id,
      teamAName: teamATeam.tmName,
    });
  };

  onChangeGameLocation = (e) => {
    this.setState({ gameLocation: e.target.value });
  };

  render() {
    const layout = {
      labelCol: {
        span: 12,
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
      <span>
        <Content
          className="mediaCG"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 450,
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
                      value={this.state.teamADistrictName}
                      onChange={this.handleDistrict}
                    >
                      {this.state.teamADistrictObj.map((item, index) => (
                        <Select.Option
                          key={this.state.teamADistrictId}
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
                      value={this.state.teamAschoolName}
                      onChange={this.handleSchool}
                    >
                      {this.state.fetchedSchoolObject.map((item, index) => (
                        <Select.Option
                          key={index}
                          // value={index}
                          value={JSON.stringify(item)}
                        >
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Select Team" name="awayTeam">
                    <Select
                      size="large"
                      defaultValue="Select Options"
                      style={{ width: 280 }}
                      value={this.state.teamAName}
                      onChange={this.handleTeamA}
                    >
                      {this.state.fetchedTeam.map((teamMap) => (
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
            <Col span={8} md={8} xs={0}>
              <div
                style={{
                  textAlign: "center",
                  padding: "30px",
                }}
              ></div>
            </Col>
          </Row>
        </Content>
        {this.state.nextStep ? (
          <SecondForm teamAData={this.state.finalTeamAData} />
        ) : null}
      </span>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.userReducer.username,
    token: state.userReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGameAction: (gameObject) => dispatch(createGameAction(gameObject)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(AdminCreateGame);
