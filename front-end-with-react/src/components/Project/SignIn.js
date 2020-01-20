import React, { Component } from "react";
import "../../stylesheets/login.css";
import axios from "axios";

export default class SignIn extends Component {
  // state = {
  //   username: "",
  //   password: ""
  // };

  // handleChangeUsername = event => {
  //   this.setState({ username: event.target.value });
  // };

  // handleChangePassword = event => {
  //   this.setState({ password: event.target.value });
  // };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   console.log(this.state);

  //   const user = {
  //     username: this.state.name,
  //     password: this.state.password
  //   };

  //   axios.post("http://localhost:8080/api/auth/signIn", { user }).then(res => {
  //     console.log(res);
  //     console.log(res.data);
  //   });
  // };

  // render() {
  //   const { username, password } = this.state;
  //   return (
  //     <div className="wrapper">
  //       <form className="form-signin" onSubmit={this.handleSubmit}>
  //         <h2 className="form-signin-heading text-center">Login</h2>

  //         <div className="form-group">
  //           <input
  //             name="username"
  //             type="text"
  //             value={username}
  //             className="form-control"
  //             aria-describedby="emailHelp"
  //             placeholder="Enter username"
  //             required=""
  //             autoFocus=""
  //             onChange={this.handleChangeUsername}
  //           />
  //         </div>

  //         <div className="form-group">
  //           <input
  //             name="password"
  //             type="password"
  //             value={password}
  //             className="form-control"
  //             id="exampleInputPassword1"
  //             placeholder="Password"
  //             required=""
  //             autoFocus=""
  //             onChange={this.handleChangePassword}
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label className="checkbox">
  //             <input
  //               type="checkbox"
  //               value="remember-me"
  //               id="rememberMe"
  //               name="rememberMe"
  //             />{" "}
  //             Remember me
  //           </label>
  //         </div>

  //         <button className="btn btn-lg btn-primary btn-block" type="submit">
  //           Login
  //         </button>
  //       </form>
  //     </div>
  //   );

  render() {
    return (
      <div className="wrapper">
        <form className="form-signin">
          <h2 className="form-signin-heading text-center">Login</h2>

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

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}
