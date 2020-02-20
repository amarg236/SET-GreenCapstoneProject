import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import ChooseTime from "./ChooseTime";
import ChooseDate from "./ChooseDate";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import TimePicker from "./ChooseTime";
import { ListGroupItem, ListGroup, Table, Button } from "react-bootstrap";

class GameRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: []
    };
  }

  // whileAccept = () => {
  //   return this.state.game;
  //   console.log(this.state.game);
  // };

  // whileDeny = () => {};

  componentDidMount() {
    const emptyBody = {};
    axios
      .post(
        "http://ec2-3-17-66-87.us-east-2.compute.amazonaws.com:8080/api/game/get/all",
        // "https://d3dqstghi7h8sb.cloudfront.net/",
        emptyBody,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
          }
        }
      )
      .then(res => {
        this.setState({ game: res.data.result, loading: false });
        console.log(res);
        console.log(res.data.result);
      });
  }

  render() {
    return (
      <div>
        <div>
          <Table striped bordered hover size="sm">
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
                    location
                  } = display;
                  return (
                    <tr>
                      <td>{hometeam}</td>
                      <td>{awayteam}</td>
                      <td>{time}</td>
                      <td>{location}</td>
                      <td>
                        <button
                          onClick={this.whileAccept}
                          type="button"
                          className="btn btn-success"
                        >
                          Accept
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={this.whileDeny}
                          type="button"
                          className="btn btn-warning"
                        >
                          Deny
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default GameRequests;
