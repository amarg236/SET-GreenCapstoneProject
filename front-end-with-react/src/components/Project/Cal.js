import React from "react";
import axios from "axios";
import moment from "moment";
import Authtoken from "../../Utility/AuthToken";

import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  ExcelExport,
  ViewsDirective,
  Month,
  ViewDirective
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

  onActionBegin(args) {
    if (args.requestType === "toolbarItemRendering") {
      let exportItem = {
        align: "Right",
        showTextOn: "Both",
        prefixIcon: "e-icon-schedule-excel-export",
        text: "Excel Export",
        cssClass: "e-excel-export",
        click: this.onExportClick.bind(this)
      };
      args.items.push(exportItem);
    }
  }
  onExportClick() {
    this.scheduleObj.exportToExcel();
  }

  // Links that could be helpful
  // https://github.com/syncfusion/ej2-react-samples/blob/master/src/schedule/local-data.jsx

  render() {
    return (
      <ScheduleComponent
        cssClass="excel-export"
        currentView="Month"
        eventSettings={{ dataSource: this.data }}
        id="schedule"
        ref={t => (this.scheduleObj = t)}
        actionBegin={this.onActionBegin.bind(this)}
        style={{
          maxHeight: "80vh",
          minHeight: "70vh",
          minWidth: "40vh"
        }}
      >
        <ViewsDirective>
          <ViewDirective option="Month" />
          <ViewDirective option="Week" />
          <ViewDirective option="Day" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month, ExcelExport]} />
      </ScheduleComponent>
    );
  }
}

export default Cal;
