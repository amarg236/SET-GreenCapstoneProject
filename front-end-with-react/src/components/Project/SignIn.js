import React, { Component } from "react";
import "../../stylesheets/login.css";


export default class SignIn extends Component {
  render() {
    return (
      <div className='wrapper '>
        <form className="form-signin">
          <h3 className="form-signin-heading text-center webk"
          style={{backgroundColor:'#739608', color:'white',
          height:'7vh'}}>
            Login</h3>

          <div className="form-group"
          style={{paddingLeft:'10px', paddingRight:'10px'}}>
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

          <div className="form-group"
          style={{paddingLeft:'10px', paddingRight:'10px'}}>
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
          <div className="form-group"
          style={{paddingLeft:'10px'}}>
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

          <button className="btn btn-lg btn-block" type="submit"
          style={{backgroundColor:'#739608', color:'white', textAlign:'center', margin:'0', }}>
            LOGIN
          </button>
        </form>
        </div>
    );
  }
}
