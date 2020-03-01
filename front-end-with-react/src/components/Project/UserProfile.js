import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";

import { Card } from "react-bootstrap";
import { connect } from "react-redux";
class UserProfile extends Component {
  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>
              <i>Name of person</i>
            </Card.Title>
            <Card.Text>
              <b>Username:</b> {this.props.username}
            </Card.Text>
            <Card.Text>
              <b>User Role:</b> {this.props.role}
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
    role: state.userReducer.role
  };
};
export default connect(mapStatetoProps)(UserProfile);
