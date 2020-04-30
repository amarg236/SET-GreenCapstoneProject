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

class SecondaryCreateGame extends Component {
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
    gameLocation: "",
    teamAObj: this.props.teamAData,
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

    const gameObject = {
      hometeam: this.props.previousGameObj.hometeam,
      hometeamId: this.props.previousGameObj.hometeamId,
      homedistrict: this.props.previousGameObj.homedistrict,
      awayteam: this.state.teamAName,
      awayteamId: this.state.teamAId,
      awaydistrict: {
        districtName: this.state.teamADistrictName,
        id: this.state.teamADistrictId,
      },
      location: this.props.previousGameObj.location,
      duration: this.props.previousGameObj.duration,
      time: this.props.previousGameObj.time,
    };
    console.log(this.props.previousGameObj);

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
    console.log(this.state.teamAData);
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
          minHeight: 400,
        }}
      >
        <Row justify="center" style={{ backgroundColor: "#red" }}>
          <Col
            md={{ span: 8, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
            xs={{ span: 24, offset: 0 }}
          ></Col>
          <Col
            md={{ span: 8, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
            xs={{ span: 24, offset: 0 }}
          >
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
          <Col
            md={{ span: 8, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
            xs={{ span: 24, offset: 0 }}
          >
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
    previousGameObj: state.userReducer.createGameObj,
  };
};

export default connect(mapStatetoProps)(SecondaryCreateGame);
