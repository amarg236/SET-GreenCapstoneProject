import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import React, { Component } from "react";
import {Carousel} from "antd";

class Noticeboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: [],
    };
  }

  componentDidMount() {
    const noticeObj = {data:1};

    axios
      .post(Authtoken.getBaseUrl() + "/api/notice/get", noticeObj, {
        headers: {},
      })
      .then((res) => {
        if (res.data.httpStatusCode == 202) {
          this.setState({ notice: res.data.result });
          console.log(res);
        }
      });
  }
render(){
return(
    <Carousel dotPosition="top" autoplay>
      {this.state.notice.map((row, index) => (
        <div style={{ backgroundColor: "#083045" }}>
        <div style={{padding:"5%"}}>
            <h3>{row.title}</h3>
              <span style={{ fontWeight: "normal", color: "white", fontSize:"1em", padding:"0"}}>{row.description.trim()}</span>

        </div>
        </div>
      ))}
    </Carousel>
);
}
}
export default Noticeboard;
