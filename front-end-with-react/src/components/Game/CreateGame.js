import React, { Component } from "react";

class CreateGame extends Component {
  render() {
    return (
      <div className="wrapper">
        <form className="form-signin">
          <h2 className="form-signin-heading text-center">Add Game</h2>

          <div className="form-group">
            <input
              name="gameName"
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter Game Name"
              required=""
              autoFocus=""
            />
          </div>

          <div className="form-group">
            <input
              name="gameLocation"
              type="text"
              className="form-control"
              id="gameName"
              placeholder="Enter Game Location"
              required=""
              autoFocus=""
            />
          </div>

          <div className="form-group">
            <textarea
              name="gameDetails"
              type="textarea"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter Game Details"
              required=""
              autoFocus=""
            />
          </div>

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Add Game
          </button>
        </form>
      </div>
    );
  }
}

export default CreateGame;
