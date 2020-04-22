import "../../App.css";
import React, { Component } from "react";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";

import {
  Row,
  Col,
  Button,
  PageHeader,
  Tabs,
  Statistic,
  Descriptions,
} from "antd";

const { TabPane } = Tabs;

const renderContent = (display, column = 2) => (
  <Descriptions size="small" column={column}>
    <Descriptions.Item label="Home Team">{display.location}</Descriptions.Item>
    <Descriptions.Item label="Away Team">
      <a>{display.awayteam}</a>
    </Descriptions.Item>
    <Descriptions.Item label="Game Duration">
      {display.duration} minutes
    </Descriptions.Item>
  </Descriptions>
);

const Content = ({ children, extra }) => {
  return (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );
};

class ApprovedGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: [],
      school: [],
    };

    this.approveGame = this.approveGame.bind(this);
    this.denyGame = this.denyGame.bind(this);
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
              console.log("i am resut of nested loop");
              console.log(res.data.result);

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

  approveGame(display) {
    console.log(display);
    const aemptyObj = {
      id: display.id,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/accept", aemptyObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res);
        window.alert("The game has been approved!");
      });
  }

  denyGame(id) {
    console.log("this is my id");
    console.log(id);
    const emptyObj = {
      data: id,
    };

    axios
      .post(Authtoken.getBaseUrl() + "/api/game/reject", emptyObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        window.alert("The game has been denied!");
        // This needs fix later on
        // window.location.reload();
        // history.push("./viewGames");
      });
  }

  render() {
    console.log(this.state.game);

    return (
      <div
        style={{
          backgroundColor: "#ffff",
          marginTop: "10px",
          padding: "20px",
          boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
        }}
      >
        <PageHeader>
          <h4 style={{ textAlign: "center" }}>Pending Games</h4>
        </PageHeader>
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
            if (approved) {
              return (
                <PageHeader
                  key={id}
                  className="site-page-header-responsive"
                  // onBack={() => window.history.back()}
                  title={hometeam.concat(" vs ").concat(awayteam)}
                  subTitle={time}
                  extra={[
                    <Button key="2" onClick={() => this.denyGame(id)}>
                      Deny
                    </Button>,
                    <Button
                      key="1"
                      type="primary"
                      onClick={() => this.approveGame(display)}
                    >
                      Accept
                    </Button>,
                  ]}
                >
                  <Content>{renderContent(display)}</Content>
                </PageHeader>
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

const mapStatetoProps = (state) => {
  return {
    token: state.userReducer.token,
    mySchool: state.userReducer.mySchool,
    schoolDistrict: state.userReducer.schoolDistrict,
  };
};
export default connect(mapStatetoProps, null)(ApprovedGame);
