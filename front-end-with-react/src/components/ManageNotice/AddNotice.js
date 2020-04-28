import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import React, { Component } from "react";
import { Form, Typography, Input, Button, Checkbox, Layout, Modal } from "antd";
import ViewNotice from "./ViewNotice";
import { FormOutlined } from "@ant-design/icons";
// import { PlusOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
class AddNotice extends Component {
  state = {
    title: "",
    description: "",
  };

  onTitleChange = (e) => {
    e.persist();
    this.setState({ title: e.target.value });
    console.log(e);
  };

  onDescriptionChange = (e) => {
    e.persist();
    this.setState({ description: e.target.value });
    console.log(e);
  };

  success = () => {
    Modal.success({
      content: "Notice has been saved",
    });
  };

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
    const tailLayout = {
      wrapperCol: { offset: 10, span: 8 },
    };

    const onFinish = () => {
      //   e.preventDefault();
      console.log("Success:");
      const noticeObj = {
        title: this.state.title,
        description: this.state.description,
      };
      console.log(noticeObj);
      axios
        .post(Authtoken.getBaseUrl() + "/api/notice/add", noticeObj, {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        })
        .then((res) => {
          this.success();
          // window.alert("The notice has been added successfully!!");
          window.location.reload();
        });
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <Content
        className="mediaAS"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580,
        }}
      >
        <Title>
          Publish Notice&nbsp;
          <FormOutlined />
        </Title>
        <div
          style={{
            backgroundColor: "#ffff",
            padding: "20px",
            boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
          }}
        >
          <Form
            {...layout}
            name="notice-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              id="titleInput"
              label="Title"
              name="title"
              rules={[{ required: true, message: "Enter title for notice" }]}
            >
              <Input onChange={this.onTitleChange} value={this.state.title} />
            </Form.Item>

            <Form.Item
              label="Notice"
              name="description"
              rules={[{ required: true, message: "Enter Notice description" }]}
            >
              <TextArea
                onChange={this.onDescriptionChange}
                value={this.state.description}
                rows={4}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <ViewNotice />
      </Content>
    );
  }
}

export default AddNotice;
