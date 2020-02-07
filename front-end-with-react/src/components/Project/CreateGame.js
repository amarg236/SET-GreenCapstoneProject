import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn"

class CreateGame extends Component {
  render() {
    return (
    <div className='gameLayout'>
      <form className='auth-inner'>
                <h3 style={{textAlign:'center'}}>
                    Create Game</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block"
                style={{border:'nonertfffddddddddddr'}}>
                    Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="./SignIn">sign in?</a>
                </p>
            </form>
            </div>
    );
  }
}

export default CreateGame;
