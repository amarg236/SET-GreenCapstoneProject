import React, { Component } from "react";

import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import ViewSchool from "./ViewSchool";
import { Form, Input, Button, Layout, List, Select, Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { Option } = Select;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
class AddSchool extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.schoolSubmit = this.schoolSubmit.bind(this);
  }

  state = {
    selectedD: {
      id: "",
      districtName: "",
    },
    district: "",
    schoolAddress: "",
    schoolName: "",
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
    const districtBody = {};
    axios
      .post(
        Authtoken.getBaseUrl() + "/api/location/district/get",
        districtBody,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        }
      )
      .then((res) => {
        this.setState({
          initLoading: false,
          data: res.data.result,
          list: res.data.result,
        });
      });
  }

  onChangeSchoolName = (e) => {
    this.setState({ schoolName: e.target.value });
  };
  onChangeSchoolAddress = (e) => {
    this.setState({ schoolAddress: e.target.value });
  };

  schoolSubmit(e) {
    e.preventDefault();
    const schoolObj = {
      address: this.state.schoolAddress,
      name: this.state.schoolName,
      district: {
        id: this.state.selectedD.id,
        districtName: this.state.selectedD.districtName,
      },
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/location/school/add", schoolObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        window.alert("The School has been added successfully!!");
        window.location.reload();
      });
  }

  handleChange(value) {
    const dummy = JSON.parse(value);
    this.setState((prevState) => ({
      selectedD: {
        id: dummy.id,
        districtName: dummy.districtName,
      },
    }));
  }

  render() {
    const { initLoading, loading, list } = this.state;

    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 12,
      },
    };
    const validateMessages = {
      required: "This field is required!",
      types: {
        email: "Not a validate email!",
        number: "Not a validate number!",
      },
      number: {
        range: "Must be between ${min} and ${max}",
      },
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
        <div
          style={{
            backgroundColor: "#ffff",
            padding: "20px",
            boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
          }}
        >
          <Form
            {...layout}
            name="nest-messages"
            onSubmit={this.districtSubmit}
            validateMessages={validateMessages}
          >
            <Form.Item
              label="School Name"
              name="schoolName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                size="large"
                value={this.state.schoolName}
                onChange={this.onChangeSchoolName}
                placeholder="Enter School Name"
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="schoolAddress"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                size="large"
                value={this.state.schoolAddress}
                onChange={this.onChangeSchoolAddress}
                placeholder="Enter School Name"
              />
            </Form.Item>
            <Form.Item label="Select District" name="districtName">
              <Select
                size="large"
                defaultValue="Select Options"
                style={{ width: 120 }}
                onChange={this.handleChange}
              >
                {this.state.list.map((item) => (
                  <Select.Option
                    key={item.id}
                    // value={index}
                    value={JSON.stringify(item)}
                  >
                    {item.districtName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" onClick={this.schoolSubmit}>
                Add School
              </Button>
            </Form.Item>
          </Form>
        </div>
        <ViewSchool />
      </Content>
    );
  }
}

export default AddSchool;
