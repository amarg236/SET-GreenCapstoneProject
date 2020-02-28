import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { Card } from "react-bootstrap";

class UserProfile extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    axios
      .get(Authtoken.getBaseUrl() + "/api/user/showUser", {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(Authtoken.getUserInfo);
      });
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Name of person</Card.Title>
            <Card.Text></Card.Text>
            <Card.Text>More descriptions here</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default UserProfile;
