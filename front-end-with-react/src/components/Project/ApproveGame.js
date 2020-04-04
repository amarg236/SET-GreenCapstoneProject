import React, { Component } from "react";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import { Row, Col, Button } from "antd";

class ApproveGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: [],
      school: [],
    };
  }

  componentDidMount() {
    //getting current users team and school

    const currentSchool = {
      id: this.props.mySchool.id,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/team/get/bySchool", currentSchool, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log("current school teams");
        console.log(res.data.result);
        console.log("length here");
        console.log(res.data.result.length);
        for (let index = 0; index < res.data.result.length; index++) {
          console.log("printing uder the loop");
          console.log(res.data.result[index].id);
          const emptyBody = {
            id: res.data.result[index].id,
          };
          axios
            .post(
              Authtoken.getBaseUrl() + "/api/game/get/ByTeamId/all",
              emptyBody,
              {
                headers: {
                  Authorization:
                    "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
                },
              }
            )
            .then((res) => {
              // console.log("i am resut of nested loop");
              // console.log(res.data.result);

              res.data.result.map((gamefromaxio) => {
                this.setState({
                  game: [...this.state.game, gamefromaxio],
                  loading: false,
                });
              });
            });
        }
        // this.setState({ awaySchoolTeamList: res.data.result });
      });
  }

  render() {
    console.log(this.state.game);

    return (
      <div className="mediaAppG" style={{ marginTop: "2%" }}>
        <Row>
          <Col style={{ textAlign: "center" }} span={24}>
            <h4>Approved Games</h4>
          </Col>
        </Row>
        <Row
          style={{
            padding: "10px",
            color: "#006ca1",
            backgroundColor: "#dddd",
          }}
        >
          <Col lg={6} md={5} sm={5} xs={6}>
            Home Team
          </Col>
          <Col lg={6} md={5} sm={5} xs={6}>
            Away Team
          </Col>
          <Col lg={4} md={4} sm={4} xs={4}>
            Time
          </Col>
          <Col lg={4} md={4} sm={4} xs={4}>
            Location
          </Col>
          <Col lg={2} md={3}></Col>
          <Col lg={2} md={3}></Col>
        </Row>
        {this.state.game &&
          this.state.game.map((display) => {
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
              awayAccepted,
            } = display;
            if (awayAccepted) {
              return (
                <Row
                  rowkey={id}
                  style={{
                    padding: "5px",
                    marginTop: "2px",
                    backgroundColor: "#ffff",
                  }}
                >
                  <Col lg={6} md={5} sm={5} xs={6}>
                    {hometeam}
                  </Col>
                  <Col lg={6} md={5} sm={5} xs={6}>
                    {awayteam}
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    {time}
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    {location}
                  </Col>
                  <Col lg={4} sm={4}>
                    <Row justify="center">
                      <Col>
                        <Button type="button" className="btn btn-success">
                          Reschedule
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            }
          })}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    token: state.userReducer.token,
    mySchool: state.userReducer.mySchool,
    schoolDistrict: state.userReducer.schoolDistrict,
  };
};
export default connect(mapStatetoProps, null)(ApproveGame);
