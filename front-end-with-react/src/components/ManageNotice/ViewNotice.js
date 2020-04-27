import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import React, { Component } from "react";
import { Form, Input, Table, Button, Checkbox, Layout } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { TextArea } = Input;

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "Description",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  //   {
  //     title: "Url",
  //     dataIndex: "url",
  //     key: "url",
  //   },
  {
    title: "Delete",
    key: "delete",
    dataIndex: "delete",
    render: () => (
      <span>
        <a>Delete</a>
      </span>
    ),
  },
];

class ViewNOtice extends Component {
  state = {
    notice: [],
  };
  componentDidMount() {
    const noticeObj = {};
    axios
      .post(Authtoken.getBaseUrl() + "/api/notice/get", noticeObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          notice: res.data.result,
        });
        // window.alert("The notice has been added successfully!!");
        // window.location.reload();
      });
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: "#ffff",
          padding: "20px",
          boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
          marginBottom: "10px",
        }}
      >
        <Table columns={columns} dataSource={this.state.notice} />
      </div>
    );
  }
}

export default ViewNOtice;
