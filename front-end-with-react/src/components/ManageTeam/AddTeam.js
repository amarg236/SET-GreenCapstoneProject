import React, { Component } from "react";

import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import {
  Modal,
  Form,
  Input,
  Button,
  Layout,
  List,
  Select,
  Skeleton
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { Option } = Select;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
class AddTeam extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.teamSubmit = this.teamSubmit.bind(this);
  }

  state = {
    selectedD: {
      id: "",
      districtName: ""
    },
    schoolId: "",
    teamClass: "",
    teamName: "",
    district: "",
    schoolAddress: "",
    schoolName: "",
    initLoading: true,
    loading: false,
    data: [],
    list: [],
    school: [],
    internalName: ""
  };

  componentDidMount() {
    const districtBody = {};
    axios
      .post(
        Authtoken.getBaseUrl() + "/api/location/district/get",
        districtBody,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
          }
        }
      )
      .then(res => {
        this.setState({
          initLoading: false,
          data: res.data.result,
          list: res.data.result
        });
      });
  }

  onChangeSchoolName = e => {
    this.setState({ schoolName: e.target.value });
  };
  onChangeTeamName = e => {
    this.setState({ teamName: e.target.value });
  };
  onChangeInternalName = e => {
    this.setState({ internalName: e.target.value });
  };

  success = () => {
    Modal.success({
      content: "Team has been successfully added"
    });
  };

  teamSubmit(e) {
    e.preventDefault();
    const teamObject = {
      internalName: this.state.internalName,
      tmName: this.state.teamName,
      tmClass: this.state.teamClass,
      school: {
        id: this.state.schoolId
      }
    };
    console.log(teamObject);
    axios
      .post(Authtoken.getBaseUrl() + "/api/team/add", teamObject, {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        this.success();
      });
  }
  handleSchool = schoolValue => {
    // const schoolV = JSON.parse(schoolValue);
    console.log(schoolValue);
    this.setState({ schoolId: schoolValue });
  };
  teamClass = teamClass => {
    // console.log(teamClass);
    this.setState({ teamClass: teamClass });
  };

  handleChange(value) {
    const dummy = JSON.parse(value);
    this.setState(prevState => ({
      selectedD: {
        id: dummy.id,
        districtName: dummy.districtName
      }
    }));
    //fetching schools
    const schoolBody = {
      districtName: dummy.districtName,
      id: dummy.id
    };
    axios
      .post(
        Authtoken.getBaseUrl() + "/api/location/school/get/district",
        schoolBody,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
          }
        }
      )
      .then(res => {
        this.setState({ school: res.data.result });
      });
  }

  render() {
    // const { initLoading, loading, list } = this.state;

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
        email: "Not a validate email!",
        number: "Not a validate number!"
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
            onSubmit={this.districtSubmit}
            validateMessages={validateMessages}
          >
            <Form.Item label="Select District" name="districtName">
              <Select
                size="large"
                defaultValue="Select Options"
                style={{ width: 120 }}
                onChange={this.handleChange}
              >
                {this.state.list.map(item => (
                  <Select.Option
                    key={item.id}
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
                style={{ width: 120 }}
                onChange={this.handleSchool}
              >
                {this.state.school.map(schoolMap => (
                  <Select.Option
                    key={schoolMap.id}
                    // value={index}
                    value={schoolMap.id}
                  >
                    {schoolMap.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Team Class" name="teamClass">
              <Select
                size="large"
                defaultValue=""
                style={{ width: 120 }}
                onChange={this.teamClass}
              >
                <Select.Option
                  // value={index}
                  value="Junior Varsity"
                >
                  Junior Varsity
                </Select.Option>
                <Select.Option
                  // value={index}
                  value="Varsity"
                >
                  Varsity
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Internal Name"
              name="internalName"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input
                size="large"
                value={this.state.internalName}
                onChange={this.onChangeInternalName}
                placeholder="Arbitrary Name"
              />
            </Form.Item>

            <Form.Item
              label="Team Name"
              name="teamName"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input
                size="large"
                value={this.state.teamName}
                onChange={this.onChangeTeamName}
                placeholder="Enter Team Name"
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" onClick={this.teamSubmit}>
                Add Team
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    );
  }
}

export default AddTeam;
