import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import axios from "axios";
import Authtoken from "../../Utility/AuthToken";
import { Modal, Button, PageHeader, Descriptions } from "antd";
import { connect } from "react-redux";

const renderContent = (details, column = 2) => (
  <Descriptions size="small" column={column}>
    <Descriptions.Item label="User Email">{details.email}</Descriptions.Item>
  </Descriptions>
);

const Content = ({ children, extra }) => {
  return (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );
};

class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: [],
    };
  }

  componentDidMount() {
    console.log(this.props.token);
    const emptyBody = {};
    axios
      .get(Authtoken.getBaseUrl() + "/api/admin/viewUnverifiedUser", {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ users: res.data, loading: false });
      });
  }

  deleteUser(id) {
    console.log("this is my id");
    console.log(id);
    const emptyObj = {
      id: id,
    };

    axios
      .post(Authtoken.getBaseUrl() + "/api/admin/user/remove", emptyObj, {
        headers: {
          Authorization:
            "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
        },
      })
      .then((res) => {
        console.log(res);
        this.deleteSuccess();
      });
  }

  deleteSuccess = () => {
    Modal.success({
      content: "User has been deleted Successfully",
    });
  };

  render() {
    return (
      <div
        style={{
          marginTop: "10px",
          backgroundColor: "#ffff",
          padding: "20px",
          boxShadow: " 0 1px 4px rgba(0, 21, 41, 0.08)",
        }}
      >
        <PageHeader>
          <h4 style={{ textAlign: "center" }}>Unverified Users</h4>
        </PageHeader>

        {this.state.users.map((details) => {
          const { id, email, firstname, lastname } = details;
          if (id) {
            return (
              <PageHeader
                key={id}
                className="site-page-header-responsive"
                // onBack={() => window.history.back()}
                title={firstname.concat(" ").concat(lastname)}
                // subTitle={time}
                extra={[
                  <Button key="1" onClick={() => this.deleteUser(id)}>
                    Delete User
                  </Button>,
                ]}
              >
                <Content>{renderContent(details)}</Content>
              </PageHeader>
            );
          }
        })}

        {
          // Approved Games
        }
      </div>
    );
  }
}

export default ManageUser;
