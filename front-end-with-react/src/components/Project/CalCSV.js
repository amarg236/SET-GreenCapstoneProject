import React from "react";

import { CSVLink, CSVDownload } from "react-csv";

const CalCSV = (props) => {
  return (
    <CSVLink
      data={props.dataCSV}
      filename={"Schedule.csv"}
      target="_blank"
      className="btn btn-primary"
    >
      Download Schedule
    </CSVLink>
  );
};

export default CalCSV;
