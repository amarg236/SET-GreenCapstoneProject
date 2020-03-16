import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";

import {
  Form,
  Input,
  InputNumber,
  Button,
  Layout,
  DatePicker,
  TimePicker
} from "antd";
const { Content } = Layout;
const { RangePicker } = TimePicker;

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.onChangeHomeTeam = this.onChangeHomeTeam.bind(this);
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
  }

  state = {
    homeTeam: "",
    gameDate: moment().format("YYYY-MM-DD"),
    gameStartTime: moment().format("HH:mm"),
    gameEndTime: moment().format("HH:mm"),
    // gameEndTime: moment()
    //   .add(30, "minute")
    //   .format("HH:mm"),
    gameLocation: "",
    againstTeam: "",
    againstTeamDistrict: "",
    gameTime: ""
    // timeFinal: ""
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

  onChangeHomeTeam = e => {
    this.setState({ homeTeam: e.target.value });
  };

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

  gameSubmit(e) {
    e.preventDefault();
    // console.log();

    // console.log(this.state.homeTeam);
    // console.log(this.state.gameDate);
    const startDate = moment(this.state.gameDate)
      .set("hours", 0)
      .set("minutes", 0);
    const startTime = moment(this.state.gameStartTime, "HH:mm");
    const endTime = moment(this.state.gameEndTime, "HH:mm");
    // moment(this.state.gameStartTime, "HH:mm");
    // const endTime = moment(this.state.gameEndTime, "HH:mm");
    const gameStart = moment(startDate)
      .add(startTime.hours(), "hour")
      .add(startTime.minutes(), "minute");

    const gameDuration = moment.duration(endTime.diff(startTime)).as("minutes");
    console.log(gameDuration);

    const gameObject = {
      // approved: false,
      // awayteam: this.state.againstTeam,
      // awaydistrict: this.state.againstTeamDistrict,
      // duration: 30,
      // hometeam: this.state.homeTeam,
      // homedistrict: "Monroe",
      // location: this.state.gameLocation,
      time: moment(gameStart).format("YYYY-MM-DD HH:mm"),

      awayteam: this.state.againstTeam,
      awaydistrict: {
        districtName: "D1",
        id: 1
      },
      duration: gameDuration,
      hometeam: this.state.homeTeam,
      homedistrict: {
        districtName: "D1",
        id: 1
      },
      location: this.state.gameLocation
      //time: moment(this.gameDate).format("YYYY-MM-DD HH:mm")
    };
    // const fs = require("browserify-fs");
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/save", gameObject, {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        window.alert("The Game has been created successfully!!");
        window.location.reload();
        // console.log(res);
        // console.log(res.data);
      });
  }

  render() {
    const layout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 12
      }
    };
    const validateMessages = {
      required: "This field is required!",
      types: {
        email: "Not a valid email!",
        number: "Not a valid number!"
      },
      number: {
        range: "Must be between ${min} and ${max}"
      }
    };

    return (
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580
        }}
      >
        <div
          style={{
            backgroundColor: "#ffff",
            padding: "20px",
            boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)"
          }}
        >
          <Form
            {...layout}
            name="nest-messages"
            onSubmit={this.gameSubmit}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="hometeam"
              label="Home Team"
              rules={[
                {
                  // required: true
                }
              ]}
            >
              <Input
                value={this.state.homeTeam}
                onChange={this.onChangeHomeTeam}
                placeholder="Enter Home Team"
              />
            </Form.Item>
            <Form.Item
              name="gameDate"
              label="Choose Date"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <DatePicker
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
                  required: true
                }
              ]}
            >
              <RangePicker
                minuteStep={5}
                format="HH:mm"
                value={this.state.gameTime}
                onChange={this.onChangeGameTime}
              />
            </Form.Item>

            <Form.Item name="location" label="Location" rules={[{}]}>
              <Input
                onChange={this.onChangeGameLocation}
                value={this.state.gameLocation}
                placeholder="Location"
              />
            </Form.Item>

            <Form.Item name="awayschool" label="Away School">
              <Input
                onChange={this.onChangeAgainstTeam}
                value={this.state.againstTeam}
                placeholder="Away School"
              />
            </Form.Item>
            <Form.Item
              placeholder="Away Team"
              name="awayteam"
              label="Away Team"
            >
              <Input
                onChange={this.onChangeAgainstTeamDistrict}
                value={this.state.againstTeamDistrict}
                placeholder="Away Team"
              />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
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
      </Content>
    );
  }
}

const mapStatetoProps = state => {
  return {
    token: state.userReducer.token
  };
};
export default connect(mapStatetoProps)(CreateGame);
