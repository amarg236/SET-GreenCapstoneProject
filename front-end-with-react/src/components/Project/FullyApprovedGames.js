import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";

import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { Table } from "antd";

class FullyApprovedGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: []
    };
  }

  componentDidMount() {
    const emptyBody = {};
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/get/all", emptyBody, {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        this.setState({ game: res.data.result, loading: false });
      });
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Approved Games </h3>
        <Table 
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 3 }}/>
      </div>
    );
  }
}

const dataSource = [
  {
    key: '1',
    playingAgainst: 'Neville High',
    time: '5:00',
    location: 'Home',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Playing Against',
    dataIndex: 'playingAgainst',
    key: 'playingAgainst',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
];

export default FullyApprovedGames;
