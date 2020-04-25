import React, { Component } from "react";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";

import { Form, Input, Button, Layout, Select, Modal, Spin } from "antd";
import debounce from 'lodash/debounce';
const { Content } = Layout;
const { Option } = Select;

class CalFilter extends Component {
    constructor(props) {
        super(props);
        this.lastFetchId = 0;
        this.fetchUser = debounce(this.fetchUser, 800);
    }

    state = {
        value: [],
        data: [],
        fetching: false,
    };

    fetchUser = value => {
        const schoolBody = {};
        console.log('fetching user', value);
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({ data: [], fetching: true });
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
                if (fetchId !== this.lastFetchId) {
                    // for fetch callback order
                    return;
                }
                const data = res.data.result.map(user => ({
                    text: `${user.name}`,
                    value: user.name,
                }));
                this.setState({ data, fetching: false });
            });

    }

    handleChange = (value) => {
        this.setState({
            value,
            data: [],
            fetching: false,
        });
    };


    render() {
        const { fetching, data, value } = this.state;
        return (
            <Select
                mode="multiple"
                labelInValue
                value={value}
                placeholder="Filter"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                style={{ width: "250px", minWidth: "auto" }}
                onChange={this.handleChange}
                onSearch={this.fetchUser}
            >
                {data.map(d => (
                    <Option key={d.value}>{d.text}</Option>
                ))}
            </Select>
        );
    }
}

export default CalFilter;
