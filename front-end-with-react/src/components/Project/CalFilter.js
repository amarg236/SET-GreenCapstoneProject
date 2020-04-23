import React, { Component } from "react";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";

import { Form, Input, Button, Layout, Select, Modal, Spin } from "antd";
const { Content } = Layout;
const { Option } = Select;

class CalFilter extends Component {
    constructor(props) {
        super(props);
        this.lastFetchId = 0;
    }

    state = {
        value: [],
        data: [],
        initLoading: true,
        fetching: false,
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
                            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                this.setState({
                    initLoading: false,
                    data: res.data.result,
                });
            });
    }

    fetchUser = value => {
        console.log('fetching user', value);
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({ data: [], fetching: true });

    };

    handleChange = (value) => {
        this.setState({ school: value, value, data: [], fetching: false, });
    };

    render() {
        const { fetching, data, value } = this.state;
        return (
            <Select
                mode="multiple"
                placeholder="Filter"
                filterOption={false}
                style={{ width: "250px", minWidth: "auto" }}
                onChange={this.handleChange}
            >
                {this.state.data.map((item) => (
                    <Select.Option
                        key={item.id}
                        value={item.id}
                    >
                        {item.name}
                    </Select.Option>
                ))}
            </Select>
        );
    }
}

export default CalFilter;
