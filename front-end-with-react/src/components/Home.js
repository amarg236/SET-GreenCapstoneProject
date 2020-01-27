import React, { Component } from "react";
import Cal from "./Project/Cal";
import UpcomingGames from "./Project/UpcomingGames";

class Home extends Component {
  render() {
    return (
      <div className="projects"
      style={{position:'absolute', left:'500px'}}>
          <UpcomingGames />
          <br/>
          <br/>
          <Cal />
      </div>
    );
  }
}

export default Home;
