import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { Table } from "antd";
import { connect } from "react-redux";

class PendingGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: []
    };

    this.approveGame = this.approveGame.bind(this);
    this.denyGame = this.denyGame.bind(this);
  }

  componentDidMount() {
    console.log(this.props.token);
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

  approveGame(
    id,
    hometeam,
    homedistrict,
    awayteam,
    awaydistrict,
    time,
    duration,
    location,
    away_accepted
  ) {
    const aemptyObj = {
      id,
      time,
      away_accepted,
      approved: true,
      awayteam,
      awaydistrict,
      duration,
      hometeam,
      homedistrict,
      location
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/modify", aemptyObj, {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        window.alert("The game has been approved!");
        // window.location.reload();
      });
  }

  denyGame(id) {
    console.log("i am here");
    const emptyObj = {
      data: id
    };

    axios
      .post(Authtoken.getBaseUrl() + "/api/game/delete", emptyObj, {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        window.alert("The game has been denied!");
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        <h3 className='text-center'>Pending Games</h3>
        <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={{pageSize: 3}}/>
      </div>
    );
  }
}

const dataSource = [
  {
    key: '1',
    playingAgainst: 'Neville High',
    time: '5:00 03/25/20',
    location: 'Home',
  },
  {
    key: '2',
    playingAgainst: 'West Monroe High',
    time: '7:00 03/27/20',
    location: 'Home',
  },
  {
    key: '3',
    playingAgainst: 'Salmen High',
    time: '8:00 03/27/20',
    location: 'Salmen Field',
  },
  {
    key: '4',
    playingAgainst: 'New Orleans High',
    time: '7:00 03/28/20',
    location: 'New Orleans',
  },
];

const columns = [
  {
    title: 'Playing Against',
    dataIndex: 'playingAgainst',
    key: 'playingAgainst',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Time and Date',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a style={{ marginRight: 16 }}>Accept {record.playingAgainst}</a>
        <a>Delete</a>
      </span>
    ),
  },
];
export default PendingGame;
