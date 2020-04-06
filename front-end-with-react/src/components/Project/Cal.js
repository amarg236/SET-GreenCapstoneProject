import React from "react";
import "../../stylesheets/cal.css";
import axios from "axios";
import moment from "moment";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";

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
import { Layout } from "antd";
const { Content } = Layout;

function processData(rawEvents) {
  console.log(rawEvents.result);
  return rawEvents.result.map(event => ({
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
      jData: [],
      game: []
    };
  }

  componentDidMount() {
    const emptyBody = {};
    axios
      .post(Authtoken.getBaseUrl() + "/api/public/get/game/json", emptyBody, {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        console.log(res.data.result);
        this.setState({ jData: extend([], processData(res.data), null, true), game: res.data.result });
      });
  }

  async fetchData() {}

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
    let exportValues = {
      //fields: ['Date', 'Time', 'Level', 'Home-Team', 'Home-Level', 'Away-Team', 'Away-Level'],
      exportType: "csv"
    };
    this.scheduleObj.exportToExcel(exportValues);
  }

  eventTemplate(props){
      return(<div className='template-wrap'> {props.Subject} </div>);
    }
    

  // Links that could be helpful
  // https://github.com/syncfusion/ej2-react-samples/blob/master/src/schedule/local-data.jsx

  render() {
    return (
      <Content
        style={{
          padding: "10px",
          margin: 0,
          minHeight: 580
        }}
        className="site-layout-background"
      >
        <ScheduleComponent
          cssClass="excel-export"
          currentView="Month"
          eventSettings={{ dataSource: this.state.jData, template: this.eventTemplate.bind(this) }}
          id="schedule"
          ref={t => (this.scheduleObj = t)}
          actionBegin={this.onActionBegin.bind(this)}
          readonly={true}
          style={{
            maxHeight: "55%",
            minHeight: "100%",
            minWidth: "46vh",
            marginLeft: "0"
          }}
        >
          {
            <ViewsDirective>
              <ViewDirective option="Month" />
              <ViewDirective option="Week" />
              <ViewDirective option="Day" />
            </ViewsDirective>
          }

          <Inject services={[Day, Week, Month, ExcelExport]} />
        </ScheduleComponent>
      </Content>
    );
  }
}
const mapStatetoProps = state => {
  return {
    token: state.userReducer.token
  };
};

export default connect(mapStatetoProps)(Cal);
