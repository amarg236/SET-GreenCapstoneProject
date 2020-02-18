import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import ChooseTime from "./ChooseTime";
import ChooseDate from "./ChooseDate";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import TimePicker from "./ChooseTime";

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.onChangeHomeTeam = this.onChangeHomeTeam.bind(this);
    this.onChangeGameDate = this.onChangeGameDate.bind(this);
    this.onChangeGameStartTime = this.onChangeGameStartTime.bind(this);
    this.onChangeGameEndTime = this.onChangeGameEndTime.bind(this);
    this.onChangeGameLocation = this.onChangeGameLocation.bind(this);
    this.onChangeAgainstTeam = this.onChangeAgainstTeam.bind(this);
    this.gameSubmit = this.gameSubmit.bind(this);

    this.state = {
      homeTeam: "",
      gameDate: new Date(),
      gameStartTime: "",
      gameEndTime: "",
      gameLocation: "",
      againstTeam: ""
    };
  }
  onChangeHomeTeam(e) {
    this.setState({ homeTeam: e.target.value });
  }

  onChangeGameDate(e) {
    this.setState({ gameDate: e.target.value });
  }

  onChangeGameStartTime(e) {
    this.setState({ gameStartTime: e.target.value });
  }

  onChangeGameEndTime(e) {
    this.setState({ gameEndTime: e.target.value });
  }
  onChangeGameLocation(e) {
    this.setState({ gameLocation: e.target.value });
  }
  onChangeAgainstTeam(e) {
    this.setState({ againstTeam: e.target.value });
  }

  gameSubmit(e) {
    e.preventDefault();

    console.log(this.state.homeTeam);
    console.log(this.state.gameDate);
    const gameObject = {
      // // hometeam: this.state.homeTeam,
      // hometeam: "teamA",
      // time: this.state.gameDate,
      // // gameStartTime: this.state.gameStartTime,
      // // gameEndTime: this.state.gameEndTime,
      // duration: 30,
      // location: this.state.gameLocation,
      // approve: true
      approved: true,
      awayteam: this.state.againstTeam,
      // awaydistrict: "P1",
      duration: 30,
      hometeam: this.state.homeTeam,
      // homedistrict: "P1",
      location: this.state.gameLocation,
      time: this.state.gameDate
      // approved: true,
      // awayteam: "test1",
      // awaydistrict: "P1",
      // duration: 0,
      // hometeam: "test2",
      // homedistrict: "P1",
      // location: "string",
      // time: "string"
    };

    axios
      .post(
        "http://ec2-3-17-66-87.us-east-2.compute.amazonaws.com:8080/api/game/save",
        gameObject,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
          }
        }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  render() {
    return (
      <div className="gameLayout">
        <form className="form-group " onSubmit={this.gameSubmit}>
          <div className="form-signin" style={{ justifyContent: "center" }}>
            <h3>Create New Game</h3>
          </div>

          <div className="form-group">
            <label>Home Team</label>

            <select
              className="form-control"
              value={this.state.homeTeam}
              onChange={this.onChangeHomeTeam}
            >
              <option>Choose Home Team</option>
              <option value="teamA">Team A</option>
              <option value="teamB">Team B</option>
            </select>
          </div>

          <div className="form-inline">
            <div className="form-group mb-2">
              <label>Date: &nbsp;</label>
              <ChooseDate
                className="input-group"
                value={this.state.gameDate}
                onChange={this.onChangeGameDate}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <label>Start Time: &nbsp;</label>
              <input
                type="text"
                className="form-control"
                onChange={this.onChangeGameStartTime}
                value={this.state.gameStartTime}
                placeholder="HH:MM"
              />
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <label>End Time: &nbsp;</label>
              <input
                type="text"
                className="form-control"
                onChange={this.onChangeGameEndTime}
                value={this.state.gameEndTime}
                placeholder="HH:MM"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Game Location</label>
            <input
              className="form-control"
              placeholder="Enter Game Location"
              onChange={this.onChangeGameLocation}
              value={this.state.gameLocation}
            />
          </div>
          <div className="form-group">
            <label>Opponent Team</label>
            <input
              className="form-control"
              placeholder="Enter Opponent Team"
              onChange={this.onChangeAgainstTeam}
              value={this.state.againstTeam}
            />
          </div>

          <div
            className="pos"
            style={{
              paddingLeft: "10%",
              paddingRight: "10%"
            }}
          >
            <button
              className="btn btn-block"
              style={{
                height: "35%",
                marginTop: "5%",
                marginBottom: "5%"
              }}
              type="submit"
            >
              REQUEST GAME
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateGame;
