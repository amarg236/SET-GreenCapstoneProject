import React, { Component } from "react";
import "../../stylesheets/login.css";
<<<<<<< HEAD
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
=======
import ProjectItem from './ProjectItem'
import axios from 'axios';

export default class SignIn extends Component {
  render() {
    return (
      <div className='wrapper '>
        <form className="form-signin">

          {/*Log in Heading  */}
          <h3 className="form-signin-heading text-center">
            Login</h3>
>>>>>>> e505ed2037c1514a6da0dcc3408858c573ca45ef

          <div className="form-group">
            <input
              name="username"
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              required=""
              autoFocus=""
<<<<<<< HEAD
=======
              onChange = {(event,newValue) =>
              this.setState({username:newValue})}
>>>>>>> e505ed2037c1514a6da0dcc3408858c573ca45ef
            />
          </div>

          <div className="form-group">
<<<<<<< HEAD
            <input
=======
            <input 
>>>>>>> e505ed2037c1514a6da0dcc3408858c573ca45ef
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required=""
              autoFocus=""
<<<<<<< HEAD
=======
              onChange = {(event,newValue) =>
                this.setState({password:newValue})}
>>>>>>> e505ed2037c1514a6da0dcc3408858c573ca45ef
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

<<<<<<< HEAD
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Login
          </button>
        </form>
      </div>
=======
          <div className='pos'> 
            <button className="btn btn-lg btn-block" type="submit"
            onClick={(event) => this.handleClick(event)}>
              LOGIN
            </button>
          </div>
          
          <div className='forget'> 
            Forget Username/Password?
          </div>
        </form>
        </div>
>>>>>>> e505ed2037c1514a6da0dcc3408858c573ca45ef
    );
  }
}
