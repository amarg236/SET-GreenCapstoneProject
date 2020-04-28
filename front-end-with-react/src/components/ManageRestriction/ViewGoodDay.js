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
    team: row.tm.tmName,
    date: moment(row.dte).format("YYYY-MM-DD"),
  }));
}

class ViewGoodDay extends Component {
  state = {
    goodDay: [],
    refresh: false,
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
      .post(Authtoken.getBaseUrl() + "/api/team/day/good/get/all", noticeObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          goodDay: processData(res.data.result),
        });
      });
  };

  deletenotice = (record) => {
    console.log(record.key);
    const deleteObj = {
      id: record.key,
    };
    console.log(deleteObj);
    axios
      .post(Authtoken.getBaseUrl() + "/api/team/day/good/remove", deleteObj, {
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
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Team",
        dataIndex: "team",
        key: "team",
      },

      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Button onClick={() => this.deletenotice(record)}>Delete</Button>
          </span>
        ),
      },
    ];
    return (
      <span>
        <PageHeader
          style={{ border: "1px solid rgb(235, 237, 240)" }}
          title="View Good Days"
          subTitle="To be written later"
        />
        <div
          style={{
            backgroundColor: "#ffff",
            padding: "20px",
            boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
            marginBottom: "10px",
          }}
        >
          <Table columns={columns} dataSource={this.state.goodDay} />
        </div>
      </span>
    );
  }
}

export default ViewGoodDay;
