import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";

import { Table, Tag, Button } from "antd";

const { Column, ColumnGroup } = Table;

class ShowGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {},
      loading: true,
      game: []
    };
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
        //history.push("./viewGames");
        // Need to fix this later on
        // window.location.reload();
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
    return (
      <div>
        <h3 className="text-center">Pending Games</h3>
        <Table dataSource={
          //this.state.game
          data} size="small">
          <Column title="Home Team" dataIndex="hometeam" key="hometeam" />
          <Column title="Away Team" dataIndex="awayteam" key="awayteam" />

          <Column title="Location" dataIndex="location" key="location" />
          <Column title="Time" dataIndex="time" key="time" />

          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                {this.state.game &&
                  this.state.game.map(display => {
                    const {
                      id,
                      approved,
                    } = display;
                    if (!approved) {
                      return (
                        <tr key={id}>
                          <td>
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() =>
                                this.approveGame(
                                  display
                                )
                              }
                            >
                              Approve
                          </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => this.denyGame(id)}
                            >
                              Deny
                          </button>
                          </td>
                        </tr>
                      )
                    }
                  }
                  )
                }


                {/* <Button href="javacsript:;" onClick={() => this.approveGame(display)}>
                </Button> */}
              </span>
            )
          }
          />
        </Table>
      </div>
    );
  }
}

const data =[
  {
    hometeam: 'a1',
    awayteam:'a2',
    location: 'a3',
    time: 'a4'
  }
]

export default ShowGames;
