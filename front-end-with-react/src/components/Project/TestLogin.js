import "../../App.css";
import React from "react";
import { withRouter } from "react-router-dom";
import AuthToken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import { loginAction } from "../../actions/loginAction";
import {
  Modal,
  Result,
  Layout,
  Form,
  Input,
  Button,
  Checkbox,
  message,
} from "antd";
const { Content } = Layout;
class TestLogin extends React.Component {
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
    message.error(
      "The credentials you have entered is worng. Please try again."
    );
    // Modal.error({
    //   title: "Wrong Credentials",
    //   content: "The credentials you have entered is worng. Please try again.",
    // });
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
      wrapperCol: { span: 8 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 8 },
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
        <div
          style={{
            backgroundColor: "#ffff",
            minHeight: "600px",
            padding: "20px",
            boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
            textAlign: "center",
          }}
        >
          <Form
            {...layout}
            validateMessages={validateMessages}
            name="basic"
            initialValues={{ remember: true }}
            style={{ marginTop: "100px" }}
          >
            <h3>LOGIN</h3>
            <br />
            <br />
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
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
      </Content>
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
)(withRouter(TestLogin));
