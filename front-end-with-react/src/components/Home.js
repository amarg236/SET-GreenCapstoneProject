import React, { Component } from "react";
import Cal from "./Project/Cal";
import UpcomingGames from "./Project/UpcomingGames";
import SideBar from "./Project/SideBar";

class Home extends Component {
  render() {
    return (
      //Green Background box
      <div
        style={{backgroundColor:'#00cc00', width:'100%', height:'254px'}}> 
        
        {/* Insert Welcome side bar */}
        <div className="projects">
            <SideBar />
        </div>

        {/* Insert Upcoming games component and calendar */}
        <div className="projects text-center"
          style={{position:'absolute', left:'525px', top:'150px'}}>
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
