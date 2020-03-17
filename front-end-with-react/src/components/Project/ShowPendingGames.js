import React, { Component } from "react";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import { Row, Col, Button } from "antd";

class ShowPendingGames extends Component {
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

  approveGame(display) {
    console.log(display);
    const aemptyObj = {
      id: display.id
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
          <Col lg={6} md={5} sm={5} xs={6}>Home Team</Col>
          <Col lg={6} md={5} sm={5} xs={6}>Away Team</Col>
          <Col lg={4} md={4} sm={4} xs={4}>Time</Col>
          <Col lg={4} md={4} sm={4} xs={4}>Location</Col>
          <Col lg={2} md={3}></Col>
          <Col lg={2} md={3}></Col>
        </Row>
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
            if (!approved && !awayAccepted) {
              return (
                <Row
                  rowkey={id}
                  style={{
                    padding: "5px",
                    marginTop: "2px",
                    backgroundColor: "#ffff"
                  }}
                >
                  <Col lg={6} md={5} sm={5} xs={6}>{hometeam}</Col>
                  <Col lg={6} md={5} sm={5} xs={6}>{awayteam}</Col>
                  <Col lg={4} md={4} sm={4} xs={4}>{time}</Col>
                  <Col lg={4} md={4} sm={4} xs={4}>{location}</Col>
                  <Col lg={4} sm={4}>
                    <Row justify='center'>
                      <Col>
                        <Button
                          type="button"
                          className="btn btn-success"
                          onClick={() =>
                            this.approveGame(display)
                          }
                        >
                          Approve
                    </Button>
                    <Col></Col>
                    <Col></Col>
                      </Col>
                      <Col>
                        <Button
                          type="button"
                          danger
                          onClick={() => this.denyGame(id)}
                        >
                          Deny
                    </Button>
                      </Col>
                    </Row>
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

const mapStatetoProps = state => {
  return {
    token: state.userReducer.token
  };
};
export default connect(mapStatetoProps, null)(ShowPendingGames);
