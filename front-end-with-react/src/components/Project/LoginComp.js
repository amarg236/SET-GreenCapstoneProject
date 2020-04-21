import React from "react";
import { withRouter } from "react-router-dom";
import AuthToken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import { loginAction } from "../../actions/loginAction";
import { Modal, Form, Input, Button, Checkbox } from "antd";

class LoginComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    localStorage.removeItem("userInfo");
  }

  login = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
    if (this.props.message) {
      this.wrongPassword();
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  wrongPassword = () => {
    Modal.error({
      title: "Wrong Credentials",
      content: "The credentials you have entered is worng. Please try again.",
    });
  };

  render() {
    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not validate email!",
        number: "${label} is not a validate number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

    return (
      <div
        style={{
          backgroundColor: "#ffff",
          borderRadius: "7px",
          padding: "10px",
          boxSshadow: "0 2px 6px white",
          marginTop: "10px",
          borderRight: "2px solid #dddd",
          borderTop: "2px solid #dddd",
        }}
      >
        <Form
          {...layout}
          validateMessages={validateMessages}
          name="basic"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Email"
            name="username"
            onChange={(e) => this.setState({ username: e.target.value })}
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter your email!",
              },
            ]}
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
              onChange={(e) => this.setState({ password: e.target.value })}
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

const mapStatetoProps = (state) => {
  return {
    message: state.userReducer.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(loginAction(username, password)),
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withRouter(LoginComp));
