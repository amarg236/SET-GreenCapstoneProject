import React from "react";
import "../../stylesheets/cal.css";
import axios from "axios";
import moment from "moment";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { Schedule } from "@syncfusion/ej2-react-schedule";
import debounce from 'lodash/debounce';

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
import { Layout, Spin, Select } from "antd";
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
  }));
}

class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jData: [],
      currentView: "Month",
      value: [],
      data: [],
      fetching: false,
    };
    this.fetchUser = debounce(this.fetchUser, 800);
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
        this.setState({ jData: extend([], processData(res.data), null, true) });
      });
  }

  filter(props) {
    const emptyBody = {};
    axios
      .post(Authtoken.getBaseUrl() + "/api/game/get/all", emptyBody, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        if (props.AwayTeam == "Airline High School-VG") {
          this.setState({ jData: extend([], processData(res.data), null, true) });
        }
      });
  }

  eventTemplate(props) {
    if (props.PartialApproved && props.FullyApproved) {
      return <div className="template-wrap"> {props.Subject} </div>;
    } else if (props.PartialApproved || props.FullyApproved);
    {
      return (
        <div style={{ backgroundColor: "orange", maxHeight: '100px' }} className="template-wrap">
          {" "}
          {props.Subject}{" "}
        </div>
      );
    }
  }

  fetchUser = value => {
    const schoolBody = {};
    this.setState({ data: [], fetching: true });
    axios
      .post(
        Authtoken.getBaseUrl() + "/api/location/school/get/all",
        schoolBody,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        }
      )
      .then((res) => {
        const data = res.data.result.map(user => ({
          text: `${user.name}`,
          value: user.name,
        }));
        this.setState({ data, fetching: false });
      });

  }

  handleChange = (value) => {
    console.log(value)
    this.setState({
      value,
      data: [], 
      fetching: false,
    });
  };
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
        <Select
          mode="multiple"
          labelInValue
          value={value}
          placeholder="Filter"
          allowClear={true}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={true}
          style={{ width: "250px", minWidth: "auto" }}
          onChange={this.handleChange}
          onSearch={this.fetchUser}
        >
          {data.map(d => (
            <Option key={d.value}>{d.text}</Option>
          ))}
        </Select>

        <ScheduleComponent
          currentView={this.state.currentView}
          eventSettings={{
            dataSource: this.state.jData,
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
  };
};

export default connect(mapStatetoProps)(Cal);
