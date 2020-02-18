import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import ChooseTime from "./ChooseTime";
import ChooseDate from "./ChooseDate";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import TimePicker from "./ChooseTime";

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  gameSubmit(e) {
    e.preventDefault();

    console.log(this.state.homeTeam);
    console.log(this.state.gameDate);

    axios
      .post(
        "http://ec2-3-17-66-87.us-east-2.compute.amazonaws.com:8080/api/game/save",

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
    return <h1>User Details here</h1>;
  }
}

export default UserProfile;
