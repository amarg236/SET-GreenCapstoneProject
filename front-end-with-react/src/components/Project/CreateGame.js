import React, { Component } from "react";
import moment from "moment";
import "../../stylesheets/createGame.css";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";

import { Layout } from "antd";
const { Content } = Layout;

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.onChangeHomeTeam = this.onChangeHomeTeam.bind(this);
    this.onChangeGameDate = this.onChangeGameDate.bind(this);
    this.onChangeGameStartTime = this.onChangeGameStartTime.bind(this);
    this.onChangeGameEndTime = this.onChangeGameEndTime.bind(this);
    this.onChangeGameLocation = this.onChangeGameLocation.bind(this);
    this.onChangeAgainstTeam = this.onChangeAgainstTeam.bind(this);
    this.onChangeAgainstTeamDistrict = this.onChangeAgainstTeamDistrict.bind(
      this
    );
    this.gameSubmit = this.gameSubmit.bind(this);

    this.state = {
      homeTeam: "",
      gameDate: moment().format("YYYY-MM-DD"),
      gameStartTime: moment().format("HH:mm"),
      gameEndTime: moment()
        .add(30, "minute")
        .format("HH:mm"),
      gameLocation: "",
      againstTeam: "",
      againstTeamDistrict: ""
      // timeFinal: ""
    };
  }

  onChangeHomeTeam(e) {
    this.setState({ homeTeam: e.target.value });
  }

  onChangeGameDate(e) {
    console.log(e.target.value);
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

  onChangeAgainstTeamDistrict(e) {
    this.setState({ againstTeamDistrict: e.target.value });
  }

  gameSubmit(e) {
    e.preventDefault();

    // console.log(this.state.homeTeam);
    // console.log(this.state.gameDate);
    const startDate = moment(this.state.gameDate)
      .set("hours", 0)
      .set("minutes", 0);
    const startTime = moment(this.state.gameStartTime, "HH:mm");
    // const endTime = moment(this.state.gameEndTime, "HH:mm");
    const gameStart = moment(startDate)
      .add(startTime.hours(), "hour")
      .add(startTime.minutes(), "minute");

    const gameObject = {
      // approved: false,
      // awayteam: this.state.againstTeam,
      // awaydistrict: this.state.againstTeamDistrict,
      // duration: 30,
      // hometeam: this.state.homeTeam,
      // homedistrict: "Monroe",
      // location: this.state.gameLocation,
      // time: moment(gameStart).format("YYYY-MM-DD HH:mm")

      awayteam: this.state.againstTeam,
      awaydistrict: {
        districtName: "D1",
        id: 1
      },
      duration: 30,
      hometeam: this.state.homeTeam,
      homedistrict: {
        districtName: "D1",
        id: 1
      },
      location: this.state.gameLocation,
      time: moment(gameStart).format("YYYY-MM-DD HH:mm")
    };
    // const fs = require("browserify-fs");
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/save", gameObject, {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        window.alert("The Game has been created successfully!!");
        // window.location.reload();
        console.log(res);
        // console.log(res.data);
      });
  }

  render() {
    return (
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580
        }}
        className="site-layout-background"
      >
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
                <option value="Home Team Jr. Boys">Home Team Jr. Boys</option>
                <option value="Home Team Jr Girls">Home Team Jr Girls</option>
              </select>
            </div>

            <div className="form-inline">
              <div className="form-group mb-2">
                <label>Date: &nbsp;</label>
                <input
                  type="date"
                  className="input-group"
                  value={this.state.gameDate}
                  onChange={this.onChangeGameDate}
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
            <div className="form-group row">
              <div className="form-group">
                <label>Opponent Team</label>

                <select
                  className="form-control"
                  onChange={this.onChangeAgainstTeam}
                  value={this.state.againstTeam}
                >
                  <option>Choose Opponent Team</option>
                  <option value="West Monroe High School">
                    West Monroe High School
                  </option>
                  <option value="Neville High School">
                    Neville High School
                  </option>
                  <option value="Carroll Junior High School">
                    Carroll Junior High School
                  </option>
                  <option value="Lee Junior High School">
                    Lee Junior High School
                  </option>
                  <option value="Wossman High School">
                    Wossman High School
                  </option>
                </select>
              </div>
              <div className="form-group col-sm">
                <label>Opponent Team District</label>
                <input
                  className="form-control"
                  placeholder="Enter P1 , P2, P3"
                  onChange={this.onChangeAgainstTeamDistrict}
                  value={this.state.againstTeamDistrict}
                />
              </div>
            </div>

            <div
              className="pos"
              style={{
                paddingLeft: "10%",
                paddingRight: "10%"
              }}
            >
              <button
                className="btn btn-block btn-success"
                style={{
                  height: "35%",
                  marginTop: "5%",
                  marginBottom: "5%"
                }}
                type="submit"
                onClick={this.gameSubmit}
              >
                REQUEST GAME
              </button>
            </div>
          </form>
        </div>
      </Content>
    );
  }
}

export default CreateGame;
