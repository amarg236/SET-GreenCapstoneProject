import axios from "axios";
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

class ViewNOtice extends Component {
  state = {
    notice: [],
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
      });
  };

  deletenotice = (key) => {
    console.log(key);
    const deleteObj = {
      id: key,
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/notice/delete", deleteObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          this.successMsg("The notice has been  has been deleted . ");
          this.setState((prevState) => ({
            refresh: !prevState.refresh,
          }));
        } else {
          this.errorMsg("Sorry notice could not be deleted.");
        }
      });
  };
  render() {
    // const { notice } = this.state.notice;
    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },

      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Button onClick={() => this.deletenotice(record.id)}>Delete</Button>
          </span>
        ),
      },
    ];
    return (
      <span>
        <PageHeader
          style={{ border: "1px solid rgb(235, 237, 240)" }}
          title="ANNOUNCEMENT SECTION"
          subTitle="Following are the list of announcemnt that has been published."
        />
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
      </span>
    );
  }
}

export default ViewNOtice;
