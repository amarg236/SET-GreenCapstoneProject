import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import Authtoken from "../../Utility/AuthToken";
import React, { Component } from "react";
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
} from "antd";

import { FormOutlined } from "@ant-design/icons";
// import { PlusOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
class AddGoodDay extends Component {
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
    gameDate: moment().format("YYYY-MM-DD"),
    gameStartTime: moment().format("HH:mm"),
    gameEndTime: moment().format("HH:mm"),
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
  };

  componentDidMount() {
    this.fetchApi();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.refresh != this.state.refresh) {
  //     this.fetchApi();
  //   }
  // }

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
    let ben = this.props.mySchool.id;

    function getTeam() {
      const forTeam = {
        id: ben,
      };
      return axios.post(
        Authtoken.getBaseUrl() + "/api/team/get/bySchool",
        forTeam,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        }
      );
    }

    axios.all([getTeam()]).then(
      axios.spread((getHomeTeamResponse) => {
        // Both requests are now complete

        this.setState({ homeTeamObj: getHomeTeamResponse.data.result });
      })
    );
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
  handleHomeTeam = (value) => {
    const passedValue = JSON.parse(value);
    console.log(passedValue);
    this.setState({ homeTeam: passedValue.tmName });
    this.setState({ homeTeamId: passedValue.id });
  };

  onChangeGameDate(date, dateString) {
    // console.log(date);
    console.log(dateString);
    // this.setState({ gameDate: dateString });
    this.setState({ gameDate: date?.format("YYYY-MM-DD") });
  }

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
          Add Good Days&nbsp;
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
            <Form.Item label="Select Team" name="homeTeam">
              <Select
                size="large"
                defaultValue="Select Options"
                style={{ width: 280 }}
                onChange={this.handleHomeTeam}
              >
                {this.state.homeTeamObj.map((homeTeamDetails) => (
                  <Select.Option
                    key={homeTeamDetails.id}
                    // value={index}
                    value={JSON.stringify(homeTeamDetails)}
                  >
                    {homeTeamDetails.tmName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="gameDate"
              label="Choose Date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                style={{ width: 280 }}
                value={this.state.gameDate}
                onChange={this.onChangeGameDate}
                // defaultValue={moment("2020-03-08", this.dateFormat)}
                format={this.dateFormat}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
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

export default connect(mapStatetoProps)(AddGoodDay);
