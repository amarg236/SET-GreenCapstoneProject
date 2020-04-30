import React, { Component } from "react";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import "../../App.css";
import "../../stylesheets/layout.css";
import { Layout, Result, Button, Spin } from "antd";
import queryString from "query-string";
import history from "../../Utility/history";
import { LoadingOutlined } from "@ant-design/icons";
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

  async componentDidMount() {
    console.log("I am here");
    console.log(this.props.location.search);

    this.setState({
      username: queryString.parse(this.props.location.search).u,
      password: queryString.parse(this.props.location.search).p,
    });
    if (this.state.username) {
      this.setState({ loading: false });
    }

    try {
      const res = await axios.get(
        Authtoken.getBaseUrl() +
          `/api/auth/login?u=${
            queryString.parse(this.props.location.search).u
          }&p=${queryString.parse(this.props.location.search).p}`
      );

      const saveDatainFormat = {
        username: this.state.username,
        token: res.data.token,
        role: res.data.roles[0].authority,
      };
      localStorage.setItem("userInfo", JSON.stringify(saveDatainFormat));
      window.location = "../../changePassword";
    } catch (e) {
      console.error(`Problem fetching data ${e}`);
    }
  }
  // .then((res) => {
  //   if (res.data.success) {
  //     console.log(res);
  //     console.log("inside >>");
  //     const saveDatainFormat = {
  //       username: this.state.username,
  //       token: res.data.token,
  //       role: res.data.roles[0].authority,
  //     };
  //     localStorage.setItem("userInfo", JSON.stringify(saveDatainFormat));

  //     window.location = "../../changePassword";
  //     // history.push("/changePassword");
  //   }
  // });

  render() {
    console.log(this.state.username);
    console.log(this.state.password);
    if (this.state.username) {
      //
    }

    // const confirmAndProceed = () => {
    //   console.log("clicke>>");
    //   console.log(this.state.username);

    // axios
    //   .get(
    //     `https://d3dqstghi7h8sb.cloudfront.net/api/auth/login?u=${this.state.username}&p=${this.state.password}`
    //   )
    //   .then((res) => {
    //     if (res.data.success) {
    //       console.log(res);
    //       console.log("inside >>");
    //       const saveDatainFormat = {
    //         username: this.state.username,
    //         token: res.data.token,
    //         role: res.data.roles[0].authority,
    //       };
    //       localStorage.setItem("userInfo", JSON.stringify(saveDatainFormat));

    //       window.location = "../../changePassword";
    //       // history.push("/changePassword");
    //     }
    //   })

    //   console.log(res.data);
    //   console.log("in>>");

    //

    // window.location =
    //   "http://setgscheduling.s3-website.us-east-2.amazonaws.com/changePassword";
    // setTimeout(() => {
    //   history.push("./");
    // }, 3000);
    // setTimeout(() => {
    //   history.push("/changePassword");
    // }, 3000);

    // history.push("/changePassword");
    // )
    // .catch((e) => {
    //   console.log(e);
    // });
    // };

    return (
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580,
        }}
      >
        <Result
          icon={<LoadingOutlined />}
          title="Welome to the System"
          subTitle="In order to complete registration, you have to chagne the password. Please click button below to change password."
          extra={[
            <Button
              type="primary"
              // onClick={confirmAndProceed}
              key="console"
            >
              Change Password
            </Button>,
            <Button key="buy">No Thanks, Log me out !</Button>,
          ]}
        />
      </Content>
    );
  }
}

export default VerifyAccount;
