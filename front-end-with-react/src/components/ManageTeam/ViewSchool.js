import React, { Component } from "react";

import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { Form, Input, Button, Layout, List, Select, Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { Option } = Select;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
class ViewSchool extends Component {
  state = {
    district: "",
    initLoading: true,
    loading: false,
    data: [],
    list: []
  };

  componentDidMount() {
    const schoolBody = {};
    axios
      .post(
        Authtoken.getBaseUrl() + "/api/location/school/get/all",
        schoolBody,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
          }
        }
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          initLoading: false,
          data: res.data.result,
          list: res.data.result
        });
      });
  }

  onDelete(item) {
    const deleteObject = {
      id: item.id
    };
    axios
      .post(
        Authtoken.getBaseUrl() + "/api/location/school/remove",
        deleteObject,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
          }
        }
      )
      .then(res => {
        window.alert("The school has been deleted successfully!!");
        window.location.reload();
      });
  }

  render() {
    const { initLoading, loading, list } = this.state;

    const layout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 12
      }
    };

    return (
      <Content
        className="mediaVS"
        style={{
          paddingTop: 10,
          margin: 0,
          minHeight: 580
        }}
      >
        <div
          style={{
            backgroundColor: "#ffff",
            padding: "20px",
            boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)"
          }}
        >
          {
            <List
              column="2"
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button type="dashed" onClick={() => this.onDelete(item)}>
                      Remove
                    </Button>
                  ]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      title={item.name}
                      description={item.address}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          }
        </div>
      </Content>
    );
  }
}

export default ViewSchool;
