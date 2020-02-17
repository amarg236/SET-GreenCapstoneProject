import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import SearchBar from "./SearchBar";
import ChooseDate from "./ChooseDate";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.onChangeHomeTeam = this.onChangeHomeTeam.bind(this);
    this.onChangeGameDate = this.onChangeGameDate.bind(this);
    this.onChangeGameStartTime = this.onChangeGameStartTime.bind(this);
    this.onChangeGameEndTime = this.onChangeGameEndTime.bind(this);
    this.onChangeGameLocation = this.onChangeGameLocation.bind(this);

    this.state = {
      homeTeam: "",
      gameDate: "",
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

  onChangegAinstTeam(e) {
    this.setState({ againstTeam: e.target.value });
  }

  gameSubmit(event) {
    event.preventDefault();

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
      awayteam: "test1",
      awaydistrict: "P1",
      duration: 0,
      hometeam: "test2",
      homedistrict: "P1",
      location: "string",
      time: "string"
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
          // Authtoken.getAuthHeader()
        }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  render() {
    {
      console.log(Authtoken.getUserInfo().token.split(" ")[1]);
    }
    return (
      <div className="gameLayout">
        <form className="auth-inner" onSubmit={this.gameSubmit}>
          {/*Log in Heading  */}
          <div className="form-signin" style={{ justifyContent: "center" }}>
            <h3>Create New Game</h3>
          </div>

          <div className="form-group">
            Home Team:{" "}
            <select>
              <option value="null">Choose a Team</option>
              <option value="teamA">Team A</option>
              <option value="teamB">Team B</option>
            </select>
          </div>

          <div className="form-group" onChange={this.onChangeGameDate}>
            Date: <ChooseDate />
          </div>

          <div className="form-group">
            Time: <SearchBar />
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
              CREATE GAME
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateGame;
