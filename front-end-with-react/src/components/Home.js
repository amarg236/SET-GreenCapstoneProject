import React, { Component } from "react";
import Cal from "./Project/Cal";
import UpcomingGames from "./Project/UpcomingGames";

class Home extends Component {
  render() {
    return (
      //Green Background box
      <div
        style={{backgroundColor:'#00cc00', width:'100%', height:'100px'}}> 
        
        <div className="projects text-center"
          style={{position:'absolute', left:'550px', top:'100px'}}>
            <UpcomingGames />
            <br/>
            <br/>
            <Cal />
        
        </div>
      </div>
    );
  }
}

export default Home;
