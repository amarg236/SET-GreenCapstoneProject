import React, { Component } from "react";
import { connect } from "react-redux";
import Authtoken from "../../../Utility/AuthToken";
import axios from "axios";
import { gameAction } from "../../../actions/gameAction";
import { Layout } from "antd";
const { Content } = Layout;

// codes written for redux is not being used. will come back later to erase and fix
// @FIXME
class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [],
      currentSchool: JSON.parse(localStorage.getItem("homeSchool"))
        ?.currenthomeSchool,
      // isLoggedIn: AuthToken.getAuthenticationStatus
    };
  }

  async componentDidMount() {
    // this.setState({ schoolId: this.props.mySchool.id });
    const currentSchool = {
      id: this.state.currentSchool.id,
    };

    try {
      const res = await axios.post(
        Authtoken.getBaseUrl() + "/api/game/get/BySchool/all",
        currentSchool,
        {
          headers: {
            Authorization:
              "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
          },
        }
      );

      console.log("current school teams");
      console.log(res.data.result);
      console.log("length here");
      console.log(res.data.result.length);

      localStorage.setItem("games", JSON.stringify(res.data.result));

      this.props.gameAction(JSON.stringify(res.data.result));
    } catch (e) {
      console.error(`Problem fetching data ${e}`);
    }
  }

  render() {
    // return <Cal />;
    //we are gonna put sliders and other contents in front page
    return (
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 580,
        }}
      >
        <div>
          <div className="jumbotron">
            <h1 className="display-4">Hello, USER!</h1>
            <p className="lead">This is a UserDashboard</p>
          </div>
        </div>
      </Content>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    gameAction: (games) => dispatch(gameAction(games)),
  };
};

const mapStatetoProps = (state) => {
  return {
    token: state.userReducer.token,
    school: state.userReducer.mySchool,
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(UserDashboard);
