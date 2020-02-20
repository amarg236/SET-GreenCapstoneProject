import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import ChooseTime from "./ChooseTime";
import ChooseDate from "./ChooseDate";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import TimePicker from "./ChooseTime";
import { ListGroupItem, ListGroup, Table, Button } from "react-bootstrap";

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
    const emptyBody = {};
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/get/all", emptyBody, {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        this.setState({ game: res.data.result, loading: false });
        // console.log(res);
        // console.log(res.data.result);
      });
  }

  approveGame(id) {
    const emptyObj = {
      id
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/get/all", emptyObj, {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        window.alert("The game has been approved!");
        window.location.reload();
      });
  }
  denyGame(id) {
    const emptyObj = {
      id
    };

    axios
      .post(Authtoken.getBaseUrl() + "/api/game/delete", emptyObj, {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        if (res.data.success) {
          window.alert("The game has been denied!");
          window.location.reload();
        }
      });
  }

  render() {
    return (
      <div>
        {
          //Unapproved games
        }
        <div>
          <h3 className="text-center">Pending Games</h3>
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
                  if (!approved) {
                    return (
                      <tr key={id}>
                        <td>{hometeam}</td>
                        <td>{awayteam}</td>
                        <td>{time}</td>
                        <td>{location}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => this.approveGame(id)}
                          >
                            Approve
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => this.denyGame(id)}
                          >
                            Deny
                          </button>
                        </td>
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

export default PendingGame;
