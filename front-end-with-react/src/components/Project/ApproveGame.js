import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";

import { Table, Tag, Button } from "antd";

const { Column, ColumnGroup } = Table;

class ApproveGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          game: []
        };
      }
    
      componentDidMount() {
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
      
    render() {
        return (
            <div>
                <h3 className="text-center">Approved Games</h3>
                <Table dataSource={
                    this.state.game
                    //data
                } size="small">
                    <Column title="Home Team" dataIndex="hometeam" key="hometeam" />
                    <Column title="Away Team" dataIndex="awayteam" key="awayteam" />

                    <Column title="Location" dataIndex="location" key="location" />
                    <Column title="Time" dataIndex="time" key="time" />

                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <span>
                                <Button href="javacsript:;" 
                                //onClick={() =>}
                                >
                                </Button>
                            </span>
                        )
                        }
                    />
                </Table>
            </div>
        );
    }
}

const data = [
    {
        hometeam: 'a1',
        awayteam: 'a2',
        location: 'a3',
        time: 'a4'
    }
]

export default ApproveGame;
