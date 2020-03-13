import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { Table } from "antd";
import { connect } from "react-redux";
import reqwest from 'reqwest';

class PendingGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: [],
      school: []
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
    // id,
    // hometeam,
    // homedistrict,
    // awayteam,
    // awaydistrict,
    // time,
    // duration,
    // location,
    // approved,
    // awayAccepted
    display
  ) {
    console.log(display);
    const aemptyObj = {
      // id,
      // time,
      // awayAccepted,
      // approved: true,
      // awayteam,
      // awaydistrict,
      // duration,
      // hometeam,
      // homedistrict,
      // location
      // display
      id: display.id
    };
    // console.log(display.id);
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/accept", display, {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        console.log(res);
        window.alert("The game has been approved!");
        //history.push("./viewGames");
        // Need to fix this later on
        // window.location.reload();
      });
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
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        window.alert("The game has been denied!");
        // This needs fix later on
        window.location.reload();
        // history.push("./viewGames");
      });
  }

  render() {
    console.log(this.state.game);

    return (
      <div>
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
                    approved,
                    awayAccepted
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
                            onClick={() =>
                              this.approveGame(
                                // id,
                                // hometeam,
                                // homedistrict,
                                // awayteam,
                                // awaydistrict,
                                // time,
                                // duration,
                                // location,
                                // approved,
                                // awayAccepted
                                display
                              )
                            }
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

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '20%',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
}];
export default PendingGame;
