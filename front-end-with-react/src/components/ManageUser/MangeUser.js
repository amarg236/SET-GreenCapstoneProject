import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";

class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: []
    };
  }

  componentDidMount() {
    console.log(this.props.token);
    const emptyBody = {};
    axios
      .get(Authtoken.getBaseUrl() + "/api/admin/viewUnverifiedUser", {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data, loading: false });
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col style={{ textAlign: "center" }} span={24}>
            <h4>Pending Games</h4>
          </Col>
        </Row>
        <Row
          style={{
            padding: "10px",
            color: "#006ca1",
            backgroundColor: "#dddd"
          }}
        >
          <Col lg={6} md={5} sm={5} xs={6}>
            Id
          </Col>
          <Col lg={6} md={5} sm={5} xs={6}>
            Email
          </Col>
          <Col lg={4} md={4} sm={4} xs={4}>
            First Name
          </Col>
          <Col lg={4} md={4} sm={4} xs={4}>
            Last Name
          </Col>
        </Row>
        {this.state.users.map(details => {
          const { id, email, firstname, lastname } = details;
          if (id) {
            return (
              <Row
                rowkey={id}
                style={{
                  padding: "5px",
                  marginTop: "2px",
                  backgroundColor: "#ffff"
                }}
              >
                <Col lg={6} md={5} sm={5} xs={6}>
                  {id}
                </Col>
                <Col lg={6} md={5} sm={5} xs={6}>
                  {email}
                </Col>
                <Col lg={6} md={5} sm={5} xs={6}>
                  {firstname}
                </Col>
                <Col lg={4} md={4} sm={4} xs={4}>
                  {lastname}
                </Col>
              </Row>
            );
          }
        })}

        {
          // Approved Games
        }
      </div>
    );
  }
}

export default ManageUser;
