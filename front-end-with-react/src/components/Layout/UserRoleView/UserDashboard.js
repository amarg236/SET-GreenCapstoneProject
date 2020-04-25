import React, { Component } from "react";
import { connect } from "react-redux";
import Authtoken from "../../../Utility/AuthToken";
import axios from "axios";
import { gameAction } from "../../../actions/gameAction";
import { Layout } from "antd";
const { Content } = Layout;

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
        Authtoken.getBaseUrl() + "/api/team/get/bySchool",
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

      const gamesFromAxios = await axios.all(
        res.data.result.map(({ id }) => {
          const emptyBody = {
            id,
          };
          return axios
            .post(
              Authtoken.getBaseUrl() +
                "/api/game/get/ByTeamId/away/notAccepted",
              emptyBody,
              {
                headers: {
                  Authorization:
                    "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
                },
              }
            )
            .then((res) => res.data.result);
        })
      );

      console.log("gameFromAxios>>>");
      console.log(gamesFromAxios.flat());

      this.setState({
        game: this.state.game.concat(gamesFromAxios.flat()),
        loading: false,
      });
    } catch (e) {
      console.error(`Problem fetching data ${e}`);
    }
    console.log("USER>>GAME>>");

    // console.log("USER>>TOKEN>>");
    // console.log(this.props.school);
    // // this.runFunction();
    const toBeSent = this.state.game;
    console.log(toBeSent);
    //adding to local storage
    localStorage.setItem("games", JSON.stringify(toBeSent));
    this.props.gameAction(toBeSent);
  }
  // runFunction = () => {
  //   this.props.gameAction(this.props.token, this.props.school);
  // };
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
