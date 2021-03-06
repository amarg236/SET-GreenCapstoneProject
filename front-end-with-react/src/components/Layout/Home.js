import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import React, { Component } from "react";

import Noticeboard from "../Project/Noticeboard.js";
import "../../App.css";
import "../../stylesheets/layout.css";
import { Layout, Carousel, Card, Typography } from "antd";
const { Meta } = Card;
const { Content } = Layout;
const { Title } = Typography;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: [],
    };
  }

  componentDidMount() {
    const noticeObj = { data: 1 };

    axios
      .post(Authtoken.getBaseUrl() + "/api/notice/get", noticeObj, {
        headers: {},
      })
      .then((res) => {
        if (res.data.httpStatusCode == 202) {
          this.setState({ notice: res.data.result });
          console.log(res);
        }
      });
  }

  render() {
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
            padding: "20px",

            boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              color: "#083045",
            }}
          >
            Anouncement Board
          </h2>
        </div>
        <Noticeboard />
      </Content>
    );
  }
}

export default Home;
