import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import React, { Component } from "react";
import Cal from "../Project/Cal";
import "../../App.css";
import "../../stylesheets/layout.css";
import { Layout, Carousel, Card } from "antd";
const { Meta } = Card;
const { Content } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: [],
    };
  }

  componentDidMount() {
    const noticeObj = {};

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
        <Carousel autoplay>
          {this.state.notice.map((row, index) => (
            <div>
              <span>
                <br />
                <h3>{row.title}</h3>
              </span>

              <span>
                <p> {row.description}</p>
              </span>
            </div>
          ))}
        </Carousel>
      </Content>
    );
  }
}

export default Home;
