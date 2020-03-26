import React, { Component } from "react";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";

import { Form, Input, Button, Layout, Select } from "antd";
const { Content } = Layout;

class InviteToSystem extends Component {
  constructor(props) {
    super(props);
    // this.inviteUser = this.inviteUser.bind(this);
  }

  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    school: "",
    data: [],
    initLoading: true
  };

  componentDidMount() {
    const schoolBody = {};
    axios
      .post(
        Authtoken.getBaseUrl() + "/api/location/school/get/all",
        schoolBody,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
          }
        }
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          initLoading: false,
          data: res.data.result
        });
      });
  }

  onChangeFirstName = e => {
    this.setState({ firstname: e.target.value });
  };

  onChangeLastName = e => {
    this.setState({ lastname: e.target.value });
  };
  onChangeEmail = e => {
    this.setState({ email: e.target.value });
  };
  onChangePassword = e => {
    this.setState({ password: e.target.value });
  };

  onChangeSchool = e => {
    this.setState({ school: e.target.value });
  };

  inviteUser = values => {
    // console.log(values);
    const school = {
      id: this.state.school
    };
    const role = {
      role: this.state.role,
      school
    };

    const objCreate = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      role
    };

    axios
      .post(Authtoken.getBaseUrl() + "/api/auth/createuser", objCreate, {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        // window.alert("User has been invited successfully!!");
        // window.location.reload();
        console.log(res);
        // console.log(res.data);
      });
  };

  handleChange = value => {
    // console.log(value);
    // const dummy = JSON.parse(value);
    this.setState({ school: value });
  };

  chooseRole = pick => {
    this.setState({ role: pick });
  };

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
        email: "Not a validate email!",
        number: "Not a validate number!"
      },
      number: {
        range: "Must be between ${min} and ${max}"
      }
    };

    return (
      <Content
        className="mediaIU"
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
            name="inviteUser"
            onFinish={this.inviteUser}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="firstname"
              label="First Name"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input
                value={this.state.firstname}
                onChange={this.onChangeFirstName}
                placeholder="Enter First Name"
              />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Last Name"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input
                value={this.state.lastname}
                onChange={this.onChangeLastName}
                placeholder="Enter Last Name"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input
                type="email"
                onChange={this.onChangeEmail}
                value={this.state.email}
                placeholder="Enter Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.Password
                onChange={this.onChangePassword}
                value={this.state.password}
                placeholder="Enter Password"
              />
            </Form.Item>

            <Form.Item label="Role" size="large" name="role">
              <Select
                defaultValue="Select Role"
                onChange={this.chooseRole}
                value={this.state.role}
                style={{ width: "250px", minWidth: "auto" }}
              >
                <Select.Option value="USER">USER</Select.Option>

                <Select.Option value="ASSIGNOR">ASSIGNOR</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Select School" size="large" name="school">
              <Select
                defaultValue="Select Options"
                style={{ width: "250px", minWidth: "auto" }}
                onChange={this.handleChange}
              >
                {this.state.data.map(item => (
                  <Select.Option
                    key={item.id}
                    // value={index}
                    // value={JSON.stringify(item)}
                    value={item.id}
                  >
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Invite
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    );
  }
}

export default InviteToSystem;
