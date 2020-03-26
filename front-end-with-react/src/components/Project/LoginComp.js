import React from "react";
import { withRouter } from "react-router-dom";
import AuthToken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import { loginAction } from "../../actions/loginAction";
import { Form, Input, Button, Checkbox } from "antd";

class LoginComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    localStorage.removeItem("userInfo");
  }

  login = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 }
    };

    console.log();

    return (
      <div
        style={{
          backgroundColor: "#ffff",
          borderRadius: "7px",
          padding: "10px",
          boxSshadow: "0 2px 6px white",
          marginTop: "10px",
          borderRight: "2px solid #dddd",
          borderTop: "2px solid #dddd"
        }}
      >
        <Form {...layout} name="basic" initialValues={{ remember: true }}>
          <Form.Item
            label="Username"
            name="username"
            onChange={e => this.setState({ username: e.target.value })}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              name="username"
              type="text"
              value={this.state.username}
              autoFocus=""
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              autoFocus=""
              value={this.state.password}
              placeholder="Password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={this.login}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    message: state.userReducer.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(loginAction(username, password))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withRouter(LoginComp));
