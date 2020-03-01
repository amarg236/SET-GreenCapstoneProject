import React from "react";
import * as dataSource from "../dummy.json";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month
} from "@syncfusion/ej2-react-schedule";
import { extend } from "@syncfusion/ej2-base";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.data = extend([], dataSource.EventsData, null, true);
  }

  // Links that could be helpful
  // https://github.com/syncfusion/ej2-react-samples/blob/master/src/schedule/local-data.jsx

  // data = new DataManager([], dataSource.eventsData, null, true);
  // Schedule remote data
  // remoteData = new DataManager({
  //   dataSource: "../dummy.json"
  //   // url: " ",
  //   // adaptor: new WebApiAdaptor(),
  //   // crossDomain: true
  // });

  render() {
    return (
      <ScheduleComponent
        currentView="Month"
        eventSettings={{ dataSource: this.data }}
        // selectedDate={new Date(2020, 2, 20)}
        style={{ maxHeight: "200vh", minHeight: "80vh",
                 minWidth: '40vh'}}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    );
  }
}

export default Cal;
