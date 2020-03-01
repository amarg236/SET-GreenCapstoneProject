import React from "react";
import { withRouter } from "react-router-dom";
import AuthToken from "../../Utility/AuthToken";
import { connect } from "react-redux";
import { loginAction } from "../../actions/loginAction";
import "../../stylesheets/home.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    // localStorage.clear();
  }

  login = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="wrapper">
        <form className="form-signin">
          {/*Log in Heading  */}
          <div className="sign-in-title" style={{ padding: "0" }}>
            <h3
              style={{
                padding: "3%"
              }}
            >
              Login
            </h3>
          </div>

          <div className="form-group">
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              required=""
              autoFocus=""
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <input
              name="password"
              type="password"
              autoComplete="on"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required=""
              autoFocus=""
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label className="checkbox">
              <input
                type="checkbox"
                value="remember-me"
                id="rememberMe"
                name="rememberMe"
              />
              Remember me
            </label>
          </div>

          <div
            className="pos"
            style={{
              paddingLeft: "10%",
              paddingRight: "10%"
            }}
          >
            <button
              className="btn btn-success btn-block"
              style={{
                height: "35%",
                marginTop: "5%",
                marginBottom: "5%"
              }}
              onClick={this.login}
              type="submit"
            >
              LOGIN
            </button>
          </div>

          <div className="forget">Forget Username/Password?</div>

          {this.props.message ? (
            <div className="alert alert-danger">
              Wrong Username or Password!
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    message: state.userReducer.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(loginAction(username, password))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(SignIn));
