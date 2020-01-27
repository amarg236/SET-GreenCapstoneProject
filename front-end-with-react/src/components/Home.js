import React, { Component } from "react";
import Cal from "./Project/Cal";
import UpcomingGames from "./Project/UpcomingGames";

class Home extends Component {
  render() {
    return (
      <div className="projects text-center"
      style={{position:'absolute', left:'550px', top:'100px'}}>
          <UpcomingGames />
          <br/>
          <br/>
          <Cal />
      </div>
    );
  }
}

export default Home;
