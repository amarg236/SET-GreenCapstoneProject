import React from "react";
import "../../stylesheets/cal.css";
import axios from "axios";
import moment from "moment";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { Schedule } from "@syncfusion/ej2-react-schedule";

import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  ViewsDirective,
  Month,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";

import { extend } from "@syncfusion/ej2-base";
import { Layout, Button, Spin, Select, Switch, Row, Col } from "antd";
const { Content } = Layout;
const { Option } = Select;

function processData(rawEvents) {
  return rawEvents.map((event) => ({
    Id: event.id,
    StartTime: moment(event.time, "YYYY-MM-DD HH:mm").toISOString(),
    EndTime: moment(event.time, "YYYY-MM-DD HH:mm")
      .add(event.duration, "minute")
      .toISOString(),
    Subject: `${event.hometeam} vs ${event.awayteam}`,
    Location: event.location,
    PartialApproved: event.awayAccepted,
    FullyApproved: event.approved,
    AwayTeam: event.awayteam,
    HomeTeam: event.hometeam,
    homeTeamId: event.hometeamId,
    receiver: event.uacceptor,
    sender: event.urequester,
    rejected: event.rejected,
  }));
}

class AdminCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jData: [],
      currentView: "Month",
      value: [],
      data: [],
      fetching: false,
      filterSelectedTeamId: "",
      homeTeamObject: [],
      alternative: false,
      alternativeData: [],
      refresh: false,
      showButton: true,
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.refresh != this.state.refresh) {
      this.fetchApi();
    }
    console.log("after CDU");
    console.log(this.state.onlyIncoming);
  }
  fetchApi = () => {
    // Changing the view for mobile when opened with mobile
    // Changin to weekly view for mobile
    if (isMobile) {
      this.setState({ currentView: "Week" });
    }

    const emptyBody = {};
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/get/all", emptyBody, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        // let myData = res.data.result.filter((myGames) =>
        //   // console.log(myTeamId.has(myGames.awayteamId));
        //   this.state.onlyIncoming
        //     ? myTeamId.has(myGames.awayteamId)
        //     : !myTeamId.has(myGames.awayteamId)
        // );

        this.setState({
          jData: extend([], processData(res.data.result), null, true),
        });
      });
  };

  onChangeFilterByTeam = (value) => {
    console.log(value);
    this.setState({ filterSelectedTeamId: value, alternative: true });
  };

  onClickFilterByHomteTeam = () => {
    const filtered = this.state.jData.filter(
      (myFilter) => myFilter.homeTeamId == this.state.filterSelectedTeamId
    );
    this.setState({ alternativeData: filtered });
    console.log(this.state.alternativeData);
    console.log(this.state.jData);
    // this.setState({});
  };

  onClickPendingGames = () => {
    this.setState({ alternative: true });
    const pendingG = this.state.jData.filter(
      (myFilter) =>
        myFilter.sender == this.props.username && myFilter.receiver == null
    );
    this.setState({ alternativeData: pendingG });
    console.log(this.state.alternativeData);
    console.log(this.state.jData);
    // this.setState({});
  };

  onClickApprovedGames = () => {
    this.setState({ alternative: true });
    const pendingG = this.state.jData.filter(
      (myFilter) => myFilter.PartialApproved && myFilter.FullyApproved
    );
    this.setState({ alternativeData: pendingG });
    console.log(this.state.alternativeData);
    console.log(this.state.jData);
    // this.setState({});
  };
  onToggleOutGoing = () => {
    // this.setState({ onlyIncoming: false });
    this.setState((prevState) => ({
      refresh: !prevState.refresh,
      onlyIncoming: !prevState.onlyIncoming,
      showButton: !prevState.showButton,
    }));
    console.log("after toggle");
    console.log(this.state.onlyIncoming);
    console.log(this.state.jData);
  };

  eventTemplate(props) {
    console.log("props>>");
    console.log(props);
    //Request made by me

    // if pending
    if (!props.PartialApproved && !props.rejected) {
      return (
        <div style={{ backgroundColor: "orange" }} className="template-wrap">
          {props.Subject}
        </div>
      );
    } else if (props.PartialApproved && props.FullyApproved) {
      return (
        <div
          style={{ backgroundColor: "#108ee9", maxHeight: "100px" }}
          className="template-wrap"
        >
          {props.Subject}
        </div>
      );
    } else if (props.PartialApproved || props.rejected) {
      return (
        <div style={{ backgroundColor: "#87d068" }} className="template-wrap">
          {props.Subject}
        </div>
      );
    }
  }

  // Links that could be helpful
  // https://github.com/syncfusion/ej2-react-samples/blob/master/src/schedule/local-data.jsx

  fetchHomeTeam = () => {
    function getTeam() {
      const forTeam = {};
      return axios.post(Authtoken.getBaseUrl() + "/api/team/get", forTeam, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      });
    }

    axios.all([getTeam()]).then(
      axios.spread((getHomeTeamResponse) => {
        // Both requests are now complete
        console.log(getHomeTeamResponse.data.result);
        this.setState({ homeTeamObject: getHomeTeamResponse.data.result });
      })
    );
  };

  render() {
    const { fetching, data, value } = this.state;

    return (
      <Content
        style={{
          padding: "10px",
          margin: 0,
          minHeight: 580,
        }}
        className="site-layout-background"
      >
        {" "}
        <div
          style={{
            backgroundColor: "#ffff",
            padding: "20px",
            boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
            marginBottom: "10px",
          }}
        >
          <Row justify="center">
            <Col style={{ textAlign: "left" }} md={12} lg={12} xs={24}>
              <Select
                // mode="multiple"
                // labelInValue

                placeholder="Select School Team"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                // filterOption={true}
                style={{ padding: "10px", width: "250px", minWidth: "auto" }}
                onChange={this.onChangeFilterByTeam}
                onFocus={this.fetchHomeTeam}
              >
                {this.state.homeTeamObject.map((d) => (
                  <Option value={d.id} key={d.id}>
                    {d.tmName}
                  </Option>
                ))}
              </Select>
              <span style={{ padding: "10px" }}>
                <Button
                  style={{ marginLeft: "8px" }}
                  type="primary"
                  onClick={this.onClickFilterByHomteTeam}
                >
                  Filter By Team
                </Button>

                <Button
                  style={{ marginLeft: "8px" }}
                  type="secondary"
                  onClick={() => this.setState({ alternative: false })}
                >
                  Reset
                </Button>
              </span>
            </Col>

            <Col style={{ textAlign: "right" }} md={12} lg={12} xs={24}>
              <span style={{ padding: "10px" }}>
                <Button
                  type="primary"
                  style={{
                    padding: "5px",
                    width: "30%",
                    background: "orange",
                    borderColor: "white",
                  }}
                  // onClick={this.onClickPendingGames}
                >
                  Undecided
                </Button>
                <Button
                  type="primary"
                  style={{
                    padding: "5px",
                    width: "30%",
                    background: "#108ee9",
                    borderColor: "white",
                  }}
                  // onClick={this.onClickPendingGames}
                >
                  Decided
                </Button>
                <Button
                  type="primary"
                  style={{
                    padding: "5px",
                    width: "30%",
                    background: "#87d068",
                    borderColor: "white",
                  }}
                  // onClick={this.onClickApprovedGames}
                >
                  Final
                </Button>
              </span>
            </Col>
          </Row>
        </div>
        <ScheduleComponent
          currentView={this.state.currentView}
          eventSettings={{
            dataSource: this.state.alternative
              ? this.state.alternativeData
              : this.state.jData,
            template: this.eventTemplate.bind(this),
          }}
          id="schedule"
          readonly={true}
          style={{
            maxHeight: "55%",
            minHeight: "100%",
            minWidth: "46vh",
            marginLeft: "0",
          }}
        >
          {
            <ViewsDirective>
              <ViewDirective option="Month" />
              <ViewDirective option="Week" />
              <ViewDirective option="Day" />
            </ViewsDirective>
          }

          <Inject services={[Day, Week, Month]} />
        </ScheduleComponent>
      </Content>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    token: state.userReducer.token,

    username: state.userReducer.username,
  };
};

export default connect(mapStatetoProps)(AdminCalendar);
