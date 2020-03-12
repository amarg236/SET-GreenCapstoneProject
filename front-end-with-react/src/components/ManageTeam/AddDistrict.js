import React, { Component } from "react";

import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { Form, Input, Button, Layout, List, Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Content } = Layout;

class AddDistrict extends Component {
  constructor(props) {
    super(props);
    this.onChangeDistrict = this.onChangeDistrict.bind(this);

    this.districtSubmit = this.districtSubmit.bind(this);
  }

  state = {
    district: "",
    initLoading: true,
    loading: false,
    data: [],
    list: []
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

        // this.setState({
        //   myDistrict: res.data.result
        // });
        // myDistrict = {res.data.result};
      });
  }

  onChangeDistrict = e => {
    this.setState({ district: e.target.value });
  };

  districtSubmit(e) {
    e.preventDefault();
    console.log(e);
    console.log(this.state.myDistrict);
    const gameObject = {
      districtName: this.state.district
    };
    axios
      .post(Authtoken.getBaseUrl() + "/api/location/district/add", gameObject, {
        headers: {
          Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
        }
      })
      .then(res => {
        console.log(res);
        // window.alert("The Game has been created successfully!!");
        window.location.reload();
      });
  }
  //   api/location/district/remove

  onDelete(item) {
    const deleteObject = {
      id: item.id
    };
    axios
      .post(
        Authtoken.getBaseUrl() + "/api/location/district/remove",
        deleteObject,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1]
          }
        }
      )
      .then(res => {
        console.log(res);
        window.alert("The district has been deleted successfully!!");
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
    const validateMessages = {
      required: "This field is required!",
      types: {
        email: "Not a validate email!",
        number: "Not a validate number!"
      },
      number: {
        range: "Must be between ${min} and ${max}"
      }
    };

    return (
      <Content
        style={{
          padding: 24,
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
          <Form
            {...layout}
            name="nest-messages"
            onSubmit={this.districtSubmit}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="district"
              rules={[
                {
                  // required: true
                }
              ]}
            >
              <Input
                size="large"
                value={this.state.district}
                onChange={this.onChangeDistrict}
                placeholder="Add District"
                addonAfter={[
                  <Button
                    type="link"
                    onClick={this.districtSubmit}
                    // icon={<PlusOutlined />}
                  >
                    +
                  </Button>
                ]}
              />
            </Form.Item>
          </Form>
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
                  <List.Item.Meta title={item.districtName} />
                </Skeleton>
              </List.Item>
            )}
          />
          {
            // <Table columns={columns} dataSource={this.state.myDistrict}></Table>
          }
        </div>
      </Content>
    );
  }
}

export default AddDistrict;
