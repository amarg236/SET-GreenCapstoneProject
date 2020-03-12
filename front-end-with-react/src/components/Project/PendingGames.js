import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import history from "../../Utility/history";

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
      display
    };
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
    // for (let [key, value] of Object.entries(this.state.game)) {
    //   // console.log("I am under render");
    //   // console.log(`${key}:${value}`);
    // }
    // console.log("I am above return");
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

const mapStatetoProps = state => {
  return {
    token: state.userReducer.token
  };
};
export default connect(mapStatetoProps, null)(PendingGame);
