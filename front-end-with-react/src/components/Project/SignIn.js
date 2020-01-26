import React, { Component } from "react";
import "../../stylesheets/login.css";
import axios from "axios";

export default class SignIn extends Component {

  render() {
    return (
      <div className="wrapper">
        <form className="form-signin">
          <h2 className="form-signin-heading text-center">
            SET-
            <span style={{color: "#67D05E"}}>Green </span> </h2>

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

          <button className="btn btn-lg btn-success btn-block" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}
