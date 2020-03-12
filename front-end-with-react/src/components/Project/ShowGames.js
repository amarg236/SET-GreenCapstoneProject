import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";

import { Table, Tag } from "antd";

const { Column, ColumnGroup } = Table;

class ShowGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {},
      loading: true,
      game: []
    };
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

  render() {
    return (
      <Table dataSource={this.state.game} size="small">
        <Column title="Home Team" dataIndex="hometeam" key="hometeam" />
        <Column title="Away Team" dataIndex="awayteam" key="awayteam" />

        <Column title="Location" dataIndex="location" key="location" />
        <Column title="Time" dataIndex="time" key="time" />

        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a style={{ marginRight: 16 }}>Approve {record.lastName}</a>
              <a>Deny</a>
            </span>
          )}
        />
      </Table>
    );
  }
}

export default ShowGames;
