import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import Authtoken from "../../Utility/AuthToken";
import React, { Component } from "react";
import ViewEvent from "./ViewEvent";

import {
  Form,
  Typography,
  Input,
  Button,
  DatePicker,
  Checkbox,
  Select,
  Layout,
  Modal,
  TimePicker,
} from "antd";
import { FormOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";
const { RangePicker } = TimePicker;

// import { PlusOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
class AddEventDay extends Component {
  formRef = React.createRef();
  state = {
    homeTeam: "",
    homeTeamId: "",
    homeTeamObj: [],
    awaySchoolObj: [],
    awaySchoolList: [],
    awaySchoolTeamList: [],
    selectedDistrict: {
      id: "",
      districtName: "",
    },
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    // gameStartTime: moment().format("HH:mm"),
    // gameEndTime: moment().format("HH:mm"),
    // gameEndTime: moment()
    //   .add(30, "minute")
    //   .format("HH:mm"),
    gameLocation: "",
    againstTeam: "",
    awayteamId: "",
    againstSchool: "",
    againstTeamDistrict: "",
    againstTeamDistrictId: "",
    gameTime: "",
    reason: "",
    refresh: false,
  };

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

  onReset = () => this.formRef.current.resetFields();

  onReasonChange = (e) => {
    e.persist();
    this.setState({ reason: e.target.value });
  };

  dateFormat = "YYYY-MM-DD";

  onChangeStartDate = (date, dateString) => {
    // console.log(date);
    // console.log(dateString);
    console.log(date?.format("YYYY-MM-DD"));
    this.setState({ startDate: date?.format("YYYY-MM-DD") });
  };

  onChangeEndDate = (date, dateString) => {
    // console.log(date);
    // console.log(dateString);
    console.log(date?.format("YYYY-MM-DD"));
    this.setState({ endDate: date?.format("YYYY-MM-DD") });
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
      console.log("Success:");
      const eventObj = {
        dte: moment(this.state.startDate).format("YYYY-MM-DD HH:mm"),
        endDate: moment(this.state.endDate).format("YYYY-MM-DD HH:mm"),
        reason: this.state.reason,
      };
      console.log(eventObj);
      axios
        .post(Authtoken.getBaseUrl() + "/api/admin/day/ban", eventObj, {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        })
        .then((res) => {
          this.onReset();
          if (res.data.httpStatusCode == 202) {
            console.log(res);
            this.successMsg("Event Days has been added to the system.");

            this.setState((prevState) => ({
              refresh: !prevState.refresh,
            }));
          } else {
            this.errorMsg("Sorry date could not be saved in the system.");
          }
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
          Add Block Days&nbsp;
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
            ref={this.formRef}
            name="notice-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                style={{ width: 280 }}
                value={this.state.gameDate}
                onChange={this.onChangeStartDate}
                // defaultValue={moment("2020-03-08", this.dateFormat)}
                format={this.dateFormat}
              />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="End Date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                style={{ width: 280 }}
                value={this.state.gameDate}
                onChange={this.onChangeEndDate}
                // defaultValue={moment("2020-03-08", this.dateFormat)}
                format={this.dateFormat}
              />
            </Form.Item>
            <Form.Item
              label="Reason"
              name="reason"
              rules={[
                {
                  required: true,
                  message: "Enter the reason for blocking day",
                },
              ]}
            >
              <TextArea
                onChange={this.onReasonChange}
                value={this.state.reason}
                rows={3}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <ViewEvent />
      </Content>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.userReducer.username,
    token: state.userReducer.token,
    ifcollapsed: state.userReducer.sidebarCollapased,
    mySchool: state.userReducer.mySchool,
    schoolDistrict: state.userReducer.schoolDistrict,
  };
};

export default connect(mapStatetoProps)(AddEventDay);
