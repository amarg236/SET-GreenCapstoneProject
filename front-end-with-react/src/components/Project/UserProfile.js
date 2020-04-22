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
      lastName: "...",
    };
  }

  componentDidMount() {
    const dataBody = {
      data: this.props.username,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/auth/find/email", dataBody, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("userInfo")).token,
        },
      })
      .then((res) => {
        if (res.data.httpStatusCode === 202) {
          console.log(res.data);
          this.setState({
            firstName: res.data.result.firstname,
            lastName: res.data.result.lastname,
          });
        }
      })
      .catch((e) => {
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
            {this.props.mySchool ? (
              <span>
                <Card.Text>
                  <b>School:</b> {this.props.mySchool.name}
                  <span> </span>
                </Card.Text>
                <Card.Text>
                  <b>District:</b> {this.props.schoolDistrict.districtName}
                  <span> </span>
                  {this.state.lastName}
                </Card.Text>
              </span>
            ) : null}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  switch (state.userReducer.role) {
    case "ASSIGNER":
      return {
        username: state.userReducer.username,
        role: state.userReducer.role,
        token: state.userReducer.token,
      };
    case "ADMIN":
      return {
        username: state.userReducer.username,
        role: state.userReducer.role,
        token: state.userReducer.token,
      };
    case "USER":
      return {
        username: state.userReducer.username,
        role: state.userReducer.role,
        token: state.userReducer.token,
        mySchool: state.userReducer.mySchool,
        schoolDistrict: state.userReducer.schoolDistrict,
      };
    default:
      return {
        username: null,
        role: null,
        token: null,
        mySchool: null,
        schoolDistrict: null,
      };
  }
};
export default connect(mapStatetoProps)(UserProfile);
