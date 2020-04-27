import "../../App.css";
import React, { Component } from "react";

import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import moment from "moment";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import {
  Tabs,
  Row,
  Layout,
  Col,
  Button,
  Table,
  Statistic,
  Descriptions,
  Input,
  DatePicker,
  Tag,
  Modal,
  Calendar,
  Alert,
  Form,
  Checkbox,
} from "antd";
const { Content } = Layout;

function onPanelChange(value, mode) {
  console.log(value, mode);
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class AddGoodDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: [],
      school: [],
      isRejected: null,
      bulkAccept: false,
      refresh: false,
      value: moment("2017-01-25"),
      selectedValue: moment("2017-01-25"),
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.refresh != this.state.refresh) {
      this.fetchApi();
    }
  }

  fetchApi = () => {
    let myTeamId = new Map();
    this.props.myTeamId.map((row, index) => myTeamId.set(row));

    const currentSchool = {
      id: this.props.mySchool.id,
    };

    axios
      .post(
        Authtoken.getBaseUrl() + "/api/game/get/BySchool/notAccepted",
        currentSchool,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        }
      )
      .then((res) => {
        // console.log("current school teams");
        // console.log(res.data.result);
        // console.log("length here");
        // console.log(res.data.result.length);
        let myData = res.data.result.filter(function (myGames) {
          return myTeamId.has(myGames.awayteamId);
        });
        // console.log(myData);
        // this.setState({
        //   game: processData(myData),
        // });
      });
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

  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <Content
        className="mediaCG"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580,
        }}
      >
        <Row style={{ backgroundColor: "#ffff" }}>
          <Col span={16}>
            <div
              style={{
                backgroundColor: "#ffff",
                padding: "20px",
                boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
              }}
            >
              <Form {...layout} name="nest-messages" onSubmit={this.gameSubmit}>
                <Form.Item
                  name="gameDate"
                  label="Selected Date"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="gametime"
                  label="Description"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col span={8} md={8} xs={0}>
            <div
              style={{
                textAlign: "center",
                padding: "30px",
              }}
            >
              <Alert message="Choosen Date: YY-MM-DD" type="success" />
              <hr />
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </div>
          </Col>
        </Row>
      </Content>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    token: state.userReducer.token,
    mySchool: state.userReducer.mySchool,
    schoolDistrict: state.userReducer.schoolDistrict,
    userGameRedux: state.gameReducer.userGame,
    myTeamId: state.gameReducer.myTeam,
  };
};
export default connect(mapStatetoProps, null)(AddGoodDay);
