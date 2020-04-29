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

class ViewGoodDay extends Component {
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

  deletenotice = (record) => {
    console.log(record.key);
    this.props.deleteNotice(record).then((res) => {
      if (res.status == 200) {
        console.log(res);
        this.successMsg("The day has been removed from good day list . ");
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
          subTitle="Respective team has no problem scheduling game on following days."
        />
        <div
          style={{
            backgroundColor: "#ffff",
            padding: "20px",
            boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
            marginBottom: "10px",
          }}
        >
          <Table columns={columns} dataSource={this.props.goodDay} />
        </div>
      </span>
    );
  }
}

export default ViewGoodDay;
