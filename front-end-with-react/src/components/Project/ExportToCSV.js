import React, { Component } from "react";
import axios from "axios";
import { Button, Radio, Layout } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { CSVLink, CSVDownload } from "react-csv";
import Authtoken from "../../Utility/AuthToken";
import moment from "moment";
const { Content } = Layout;

function processData(rawEvents) {
  return rawEvents.result.map((event) => ({
    GameDate: moment(event.time, "YYYY-MM-DD").format("YYYY/MM/DD"),
    GameTime: moment(event.time, "YYYY-MM-DD HH:mm").format("h:mm A"),
    Level: "Dummy_L",
    HomeTeam: event.hometeam,
    HomeLevel: "Dummy-Varsity",
    AwayTeam: event.awayteam,
    AwayLevel: "Dummy-JV",
  }));
}

class ExportToCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jData: [],
      size: "large",
    };
  }

  componentDidMount() {
    const emptyBody = {};
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/get/all", emptyBody, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        this.setState({ jData: processData(res.data) });
        // for formatting csv
        // this.setState({ fData: extend([], formatData(res.data), null, true) });
        // console.log("jDATA", this.state.jData);
      });
  }
  headers = [
    { label: "Date", key: "GameDate" },
    { label: "Time", key: "GameTime" },
    { label: "Level", key: "Level" },
    { label: "Home-Team", key: "HomeTeam" },
    { label: "Home-Level", key: "HomeLevel" },
    { label: "Away-Team", key: "AwayTeam" },
    { label: "Away-Level", key: "AwayLevel" },
  ];
  render() {
    console.log(this.state.jData);
    return (
      <Content
        style={{
          padding: "10px",
          margin: 0,
          minHeight: 580,
        }}
        className="site-layout-background"
      >
        <Button block type="dashed" icon={<DownloadOutlined />}>
          <CSVLink headers={this.headers} data={this.state.jData}>
            Click here to export into CSV file
          </CSVLink>
        </Button>
      </Content>
    );
  }
}

export default ExportToCSV;
