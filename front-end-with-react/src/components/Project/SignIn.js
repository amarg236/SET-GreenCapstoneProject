import React, { Component } from "react";
import "../../stylesheets/login.css";
import axios from 'axios';

export default class SignIn extends Component {
  state = { username: '',
            password: ''};

  //prevent auto submission of form
  onFormSubmit = (event) => {
    event.preventDefault();

     console.log(this.state.username);
     console.log(this.state.password);
   }

  render() {
    return (
      <div className='wrapper '>
        <form onSubmit={this.onFormSubmit} className="form-signin">

          {/*Log in Heading  */}
          <h3 className="form-signin-heading text-center">
            Login</h3>

          <div className="form-group">
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={e => this.setState({username: e.target.value})}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              id='usrnme'
            />
          </div>

          <div className="form-group">
            <input 
              name="password"
              type="password"
              autoComplete="on"
              value={this.state.password}
              onChange={e => this.setState({password: e.target.value})}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
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

          <div className='pos'> 
            <button className="btn btn-lg btn-block" type="submit">
              LOGIN
            </button>
          </div>
          
          <div className='forget'> 
            Forget Username/Password?
          </div>
        </form>
        </div>
    );
  }
}
