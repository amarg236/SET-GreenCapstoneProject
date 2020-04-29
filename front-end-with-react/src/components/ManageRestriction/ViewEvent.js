import axios from "axios";
import moment from "moment";

import Authtoken from "../../Utility/AuthToken";
import React, { Component } from "react";
import {
  Table,
  Tag,
  Button,
  Form,
  PageHeader,
  Modal,
  Input,
  Layout,
} from "antd";
// import { PlusOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { TextArea } = Input;

function processData(supply) {
  console.log("processData>>");
  console.log(supply);
  return supply.map((row) => ({
    key: row.id,
    starDate: moment(row.dte).format("YYYY-MM-DD"),
    endDate: moment(row.endDate).format("YYYY-MM-DD"),
    reason: row.reason,
  }));
}

class ViewEvent extends Component {
  state = {
    goodDay: [],
    refresh: false,
    eventDay: [],
  };

  componentDidMount() {
    this.fetchApi();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.refresh != this.state.refresh) {
      this.fetchApi();
    }
  }

  successMsg = (s_message) => {
    Modal.success({
      content: (
        <div>
          <p>{s_message}</p>
        </div>
      ),
    });
  };

  errorMsg = (e_message) => {
    Modal.error({
      content: (
        <div>
          <p>{e_message}</p>
        </div>
      ),
    });
  };

  fetchApi = () => {
    const noticeObj = {};
    axios
      .post(Authtoken.getBaseUrl() + "/api/team/day/event/get/all", noticeObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          eventDay: processData(res.data.result),
        });
      });
  };

  deletEvents = (record) => {
    console.log(record.key);
    const deleteObj = {
      id: record.key,
    };
    console.log(deleteObj);
    axios
      .post(Authtoken.getBaseUrl() + "/api/team/day/bad/remove", deleteObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          this.successMsg("The day has been removed from good day list . ");
          this.setState((prevState) => ({
            refresh: !prevState.refresh,
          }));
        } else {
          this.errorMsg("Sorry day  could not be deleted.");
        }
      });
  };
  render() {
    // const { notice } = this.state.notice;
    const columns = [
      {
        title: "Start Date",
        dataIndex: "starDate",
        key: "starDate",
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
      },
      {
        title: "Descreption",
        dataIndex: "reason",
        key: "reason",
      },

      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Button onClick={() => this.deletEvents(record)}>Delete</Button>
          </span>
        ),
      },
    ];
    return (
      <span>
        <PageHeader
          style={{ border: "1px solid rgb(235, 237, 240)" }}
          title="View Bad Days"
          subTitle="Following days are block for scheduling games for opponent team."
        />
        <div
          style={{
            backgroundColor: "#ffff",
            padding: "20px",
            boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
            marginBottom: "10px",
          }}
        >
          <Table columns={columns} dataSource={this.state.eventDay} />
        </div>
      </span>
    );
  }
}

export default ViewEvent;
