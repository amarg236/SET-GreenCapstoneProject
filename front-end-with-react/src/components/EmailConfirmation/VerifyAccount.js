import React, { Component } from "react";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import "../../App.css";
import "../../stylesheets/layout.css";
import { Layout } from "antd";
import queryString from "query-string";
import history from "../../Utility/history";
const { Content } = Layout;

class VerifyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      username: "",
      password: "",
    };
  }

  componentDidMount = () => {
    console.log("I am here");
    console.log(this.props.location.search);
    this.setState({
      username: queryString.parse(this.props.location.search).u,
      password: queryString.parse(this.props.location.search).p,
    });
    if (this.state.username) {
      this.setState({ loading: false });
    }
  };

  render() {
    console.log(this.state.username);
    console.log(this.state.password);
    if (this.state.username) {
      axios
        .get(
          Authtoken.getBaseUrl() +
            `/api/auth/login?u=${this.state.username}&p=${this.state.password}`
        )
        .then((res) => {
          console.log(res);

          if (res.data.success) {
            console.log(res.data);

            const saveDatainFormat = {
              username: this.state.username,
              token: res.data.token,
              role: res.data.roles[0].authority,
            };
            localStorage.setItem("userInfo", JSON.stringify(saveDatainFormat));
            // window.location =
            //   "http://setgscheduling.s3-website.us-east-2.amazonaws.com/changePassword";
            setTimeout(() => {
              history.push("./");
            }, 3000);
            setTimeout(() => {
              history.push("/changePassword");
            }, 3000);

            // history.push("/changePassword");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    return (
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580,
        }}
      >
        {this.state.loading ? <h6>Loading ...Please wait...</h6> : null}
      </Content>
    );
  }
}

export default VerifyAccount;
