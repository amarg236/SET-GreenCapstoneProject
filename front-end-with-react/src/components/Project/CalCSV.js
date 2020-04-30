import React from "react";

import { CSVLink, CSVDownload } from "react-csv";
import { calExport } from "../../actions/export";
import { connect } from "react-redux";
import { Menu, Layout } from "antd";

import "../../stylesheets/cal.css";

class CalCSV extends React.Component {
  constructor(props) {
    super(props);
    this.props.calExport();
  }

  render() {
    if (this.props.user) {
      // const a = this.props.csvInfo;
      // console.log("on", a);
      return (
        <CSVLink
          data={this.props.user}
          filename={"Schedule.csv"}
          target="_blank"
          className="none"
        >
          Download Schedule
        </CSVLink>
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.getGames.two,
  };
};

export default connect(mapStateToProps, { calExport })(CalCSV);
