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
import { Layout, Button, Spin, Select, PageHeader } from "antd";
const { Content } = Layout;
const { Option } = Select;

function processData(rawEvents) {
  return rawEvents.result.map((event) => ({
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
  }));
}

class GeneralCalendar extends React.Component {
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
    };
  }

  componentDidMount() {
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
        console.log(res.data);
        let pData = processData(res.data);
        console.log(pData);
        console.log("UP>>");
        this.setState({
          jData: extend(
            [],
            pData.filter((Gcal) => Gcal.FullyApproved),
            null,
            true
          ),
        });
      });
  }

  fetchHomeTeam = () => {
    let ben = this.props.mySchool.id;

    function getTeam() {
      const forTeam = {
        id: ben,
      };
      return axios.post(
        Authtoken.getBaseUrl() + "/api/team/get/bySchool",
        forTeam,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        }
      );
    }

    axios.all([getTeam()]).then(
      axios.spread((getHomeTeamResponse) => {
        // Both requests are now complete
        console.log(getHomeTeamResponse.data.result);
        this.setState({ homeTeamObject: getHomeTeamResponse.data.result });
      })
    );
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

  eventTemplate(props) {
    console.log("props>>");
    console.log(props);
    if (props.sender == this.props.username && props.receiver == null) {
      console.log("requsted game found");
      return (
        <div style={{ backgroundColor: "orange" }} className="template-wrap">
          {" "}
          {props.Subject}{" "}
        </div>
      );
    }
    if (props.PartialApproved && props.FullyApproved) {
      return <div className="template-wrap"> {props.Subject} </div>;
    } else if (props.PartialApproved || props.FullyApproved);
    {
      return (
        <div
          style={{ backgroundColor: "#87d068", maxHeight: "100px" }}
          className="template-wrap"
        >
          {" "}
          {props.Subject}{" "}
        </div>
      );
    }
  }

  // Links that could be helpful
  // https://github.com/syncfusion/ej2-react-samples/blob/master/src/schedule/local-data.jsx

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
        <div
          style={{
            backgroundColor: "#ffff",
            padding: "20px",
            boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
            marginBottom: "10px",
          }}
        >
          <PageHeader
            className="site-page-header"
            title="General Calendar"
            subTitle="This calendar view displays all the upcoming scheduled games in the state."
          />
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
    mySchool: state.userReducer.mySchool,
    username: state.userReducer.username,
  };
};

export default connect(mapStatetoProps)(GeneralCalendar);
