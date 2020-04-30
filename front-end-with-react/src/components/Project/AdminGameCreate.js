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
  }

  state = {
    teamADistrictName: "",
    teamADistrictId: "",
    teamADistrictObj: [],
    fetchedSchoolObject: [],
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

  onChangeGameTime(time, timeString) {
    console.log(time[0]?.format("HH:mm"));
    console.log(time[1]?.format("HH:mm"));
    this.setState({ gameStartTime: time[0]?.format("HH:mm") });
    this.setState({ gameEndTime: time[1]?.format("HH:mm") });
    // console.log(time.format("HH:mm"));
  }

  onChangeGameDate(date, dateString) {
    // console.log(date);
    console.log(dateString);
    // this.setState({ gameDate: dateString });
    this.setState({ gameDate: date?.format("YYYY-MM-DD") });
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
  }

  handleDistrict = (value) => {
    const dummy = JSON.parse(value);
    console.log("Dummy data result below");
    console.log(dummy);
    this.setState({
      teamADistrictName: dummy.districtName,
      teamADistrictId: dummy.id,
    });
  };

  fetchSchoolList = () => {
    const schoolBody = {
      id: this.state.teamADistrictId,
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

  render() {
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
                {
                  <Form.Item label="Select District" name="districtName">
                    <Select
                      size="large"
                      defaultValue="Select Options"
                      style={{ width: 280 }}
                      value={this.state.againstTeamDistrict}
                      onChange={this.handleDistrict}
                    >
                      {this.state.teamADistrictObj.map((item, index) => (
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
                }
                <Form.Item label="Select School" name="schoolName">
                  <Select
                    size="large"
                    defaultValue="Select Options"
                    style={{ width: 280 }}
                    value={this.state.againstSchool}
                    onFocus={this.fetchSchoolList}
                    // onChange={this.handleSchool}
                  >
                    {this.state.fetchedSchoolObject.map((schoolMap, index) =>
                      schoolMap.id != this.props.mySchool.id ? (
                        <Select.Option
                          key={index}
                          value={JSON.stringify(schoolMap)}
                        >
                          {schoolMap.name}
                        </Select.Option>
                      ) : null
                    )}
                  </Select>
                </Form.Item>

                <Form.Item label="Select Team" name="awayTeam">
                  <Select
                    size="large"
                    defaultValue="Select Options"
                    style={{ width: 280 }}
                    value={this.state.againstTeam}
                    // onChange={this.handleAwayTeam}
                  >
                    {
                      //   this.state.awaySchoolTeamList.map((teamMap) => (
                      //   <Select.Option
                      //     key={teamMap.id}
                      //     // value={index}
                      //     value={JSON.stringify(teamMap)}
                      //   >
                      //     {teamMap.tmName}
                      //   </Select.Option>
                      // ))
                    }
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
