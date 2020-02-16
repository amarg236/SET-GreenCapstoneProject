import React, { Component } from "react";
import "../../stylesheets/createGame.css";
import "./SignIn";
import SearchBar from "./SearchBar";
import ChooseDate from "./ChooseDate";

class CreateGame extends Component {

  render() {
    return (
      <div className="gameLayout">
        <form className="auth-inner" >
          {/*Log in Heading  */}
          <div class="form-signin" style={{justifyContent:'center'}}>
            <h3>
              Create New Game
            </h3>
          </div>

          <div className="form-group">
            Home Team: <select>
              <option value="null">Choose a Team</option>
              <option value="teamA">Team A</option>
              <option value="teamB">Team B</option>
            </select>
          </div>

          <div className="form-group">
            Date: <ChooseDate />
          </div>

          <div className="form-group">
            Time: <SearchBar />
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
              CREATE GAME
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateGame;