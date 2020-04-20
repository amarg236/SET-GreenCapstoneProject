import React from "react";
import "../../stylesheets/cal.css";
import axios from "axios";
import moment from "moment";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { Schedule } from "@syncfusion/ej2-react-schedule";
import CalCSV from "./CalCSV";

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
import { Layout } from "antd";
const { Content } = Layout;

function processData(rawEvents) {
  return rawEvents.result.map((event) => ({
    Id: event.id,
    StartTime: moment(event.time, "YYYY-MM-DD HH:mm").toISOString(),
    EndTime: moment(event.time, "YYYY-MM-DD HH:mm")
      .add(event.duration, "minute")
      .toISOString(),
    Subject: `${event.hometeam} vs ${event.awayteam}`,
    Location: event.location,
  }));
}

// function formatData(response) {
//   const result = response.result;
//   let i;

//   for( i=0, i < result.length, i++)
//   {

//   }

//   console.log("formatDate", justDate);
//   return "";
// }

class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jData: [],
      currentView: "Month",
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
      .post(Authtoken.getBaseUrl() + "/api/public/get/game/json", emptyBody, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        this.setState({ jData: extend([], processData(res.data), null, true) });
        // for formatting csv
        // this.setState({ fData: extend([], formatData(res.data), null, true) });
        // console.log("jDATA", this.state.jData);
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
        click: this.onExportClick.bind(this),
      };
      args.items.push(exportItem);
    }
  }

  onExportClick() {
    let exportValues = {
      fields: [
        "Date",
        "Time",
        "Level",
        "Home-Team",
        "Home-Level",
        "Away-Team",
        "Away-Level",
      ],
      exportType: "csv",
    };
    this.scheduleObj.exportToExcel(exportValues);
  }

  eventTemplate(props) {
    // if(approved){
    return <div className="template-wrap"> {props.Subject} </div>;
    //  }
  }

  // Links that could be helpful
  // https://github.com/syncfusion/ej2-react-samples/blob/master/src/schedule/local-data.jsx

  render() {
    return (
      <Content
        style={{
          padding: "10px",
          margin: 0,
          minHeight: 580,
        }}
        className="site-layout-background"
      >
        {/* *download csv file
        <div className="toCSV">
          <CalCSV dataCSV={this.state.jData} />
        </div> */}

        <ScheduleComponent
          cssClass="excel-export"
          currentView={this.state.currentView}
          eventSettings={{
            dataSource: this.state.jData,
            template: this.eventTemplate.bind(this),
          }}
          id="schedule"
          ref={(t) => (this.scheduleObj = t)}
          actionBegin={this.onActionBegin.bind(this)}
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
