import React, { Component } from "react";
import "../../stylesheets/login.css";

export default class SignIn extends Component {
  render() {
    return (
      <div className="wrapper">
        <form className="form-signin">
          {/*Log in Heading  */}
          <h3
            className="form-signin-heading text-center"
            style={{
              paddingTop: "3%"
            }}
          >
            Login
          </h3>
          <div className="form-group">
            <input
              name="username"
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              required=""
              autoFocus=""
            />
          </div>

          <div className="form-group">
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required=""
              autoFocus=""
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
              className="btn btn-block"
              style={{
                height: "35%",
                marginTop: "5%",
                marginBottom: "5%"
              }}
              type="submit"
            >
              LOGIN
            </button>
          </div>

          <div className="forget">Forget Username/Password?</div>
        </form>
      </div>
    );
  }
}
