import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import "../../stylesheets/layout.css";
import { logoutAction } from "../../actions/loginAction";
import { Layout } from "antd";
import { Modal, message, Form, Input, Button, Checkbox } from "antd";

import { connect } from "react-redux";
const { Content } = Layout;

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
    };
  }

  login = (e) => {
    e.preventDefault();
    console.log(Authtoken.getBaseUrl());
    const pwObj = {
      email: this.props.username,
      password: this.state.password,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/auth/setPassword", pwObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res);
        this.success();

        setTimeout(() => {
          this.logout();
        }, 3000);
      });
  };

  destroyModal = () => {
    Modal.destroy();
  };

  success = () => {
    // Modal.success({
    //   content: "Password has been changed successfully",
    // });
    const hide = message.loading("Password has been changed successfully..", 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 2500);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  logout = () => {
    this.props.logout();
  };

  render() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 6 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    return (
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580,
        }}
      >
        <Form
          {...layout}
          name="changePassword"
          initialValues={{ remember: true }}
        >
          <Form.Item label="Username" name="username">
            <Input
              name="username"
              type="text"
              disabled
              placeholder={this.props.username}
            />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password
              autoFocus=""
              value={this.state.password}
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={this.login}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    username: state.userReducer.username,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(ChangePassword);
