import React from "react";
import axios from "axios";
import moment from "moment";
import Authtoken from "../../Utility/AuthToken";

import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month
} from "@syncfusion/ej2-react-schedule";
import { extend } from "@syncfusion/ej2-base";
// import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

function processData(rawEvents) {
  return rawEvents.map(event => ({
    Id: event.id,
    StartTime: moment(event.time, "YYYY-MM-DD HH:mm").toISOString(),
    EndTime: moment(event.time, "YYYY-MM-DD HH:mm")
      .add(event.duration, "minute")
      .toISOString(),
    Subject: `${event.hometeam} vs ${event.awayteam}`,
    Location: event.location
  }));
}
class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jData: []
    };
    // this.data = extend([], localStorage.getItem("jsonFeed"), null, true);
  }

  componentDidMount() {
    axios
      .get(Authtoken.getBaseUrl() + "/api/auth/jsonData")

      .then(res => {
        // this.setState({ jData: res.data });
        // console.log(res.data, processData(res.data));
        this.setState({ jData: extend([], processData(res.data), null, true) });
      });
  }

  async fetchData() {}

  // Links that could be helpful
  // https://github.com/syncfusion/ej2-react-samples/blob/master/src/schedule/local-data.jsx

  // data = new DataManager([], dataSource.eventsData, null, true);
  // Schedule remote data
  // remoteData = new DataManager({
  //  dataSource: "../dummy.json",
  // url: "http://localhost:8080/api/auth/jsonData",
  // adaptor: new WebApiAdaptor(),
  // crossDomain: true
  // });

  render() {
    return (
      <ScheduleComponent
        currentView="Month"
        eventSettings={{ dataSource: this.state.jData }}
        // selectedDate={new Date(2020, 2, 20)}
        style={{ maxHeight: "200vh", minHeight: "80vh" }}
      >
        {console.log("i am good")}
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    );
  }
}

export default Cal;
