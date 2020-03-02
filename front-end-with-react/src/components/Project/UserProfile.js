import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import axios from "axios";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import Authtoken from "../../Utility/AuthToken";
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "...",
      lastName: "..."
    };
  }

  componentDidMount() {
    const dataBody = {
      data: this.props.username
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/auth/find/email", dataBody, {
        headers: {
          Authorization: "Bearer " + this.props.token.split(" ")[1]
        }
      })
      .then(res => {
        if (res.data.httpStatusCode === 202) {
          this.setState({
            firstName: res.data.result.firstname,
            lastName: res.data.result.lastname
          });
        }
      })
      .catch(e => {
        console.log("couldn't connect to the server");
      });
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>User Profile</Card.Title>
            <Card.Text>
              <b>Username:</b> {this.props.username}
            </Card.Text>
            <Card.Text>
              <b>User Role:</b> {this.props.role}
            </Card.Text>
            <Card.Text>
              <b>Name:</b> {this.state.firstName}
              <span> </span>
              {this.state.lastName}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
const mapStatetoProps = state => {
  return {
    username: state.userReducer.username,
    role: state.userReducer.role,
    token: state.userReducer.token
  };
};
export default connect(mapStatetoProps)(UserProfile);
