import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";

import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { Table } from "react-bootstrap";

class ApprovedGames extends Component {
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
        {
          //Unapproved games
        }
        <div>
          <h3 className="text-center">Approved Games</h3>
          <br />
          <Table className="table-striped hover table-responsive-sm ">
            <thead>
              <tr>
                <th>Home Team</th>
                <th>Playing Against</th>
                <th>Time</th>
                <th>Location</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.game &&
                this.state.game.map(display => {
                  console.log(display);
                  const {
                    id,
                    hometeam,
                    homedistrict,
                    awayteam,
                    awaydistrict,
                    time,
                    duration,
                    location,
                    approved
                  } = display;
                  if (approved) {
                    return (
                      <tr key={id}>
                        <td>{hometeam}</td>
                        <td>{awayteam}</td>
                        <td>{time}</td>
                        <td>{location}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </Table>
        </div>
        {
          // Approved Games
        }
      </div>
    );
  }
}

export default ApprovedGames;
