import React, { Component } from "react";

class SideBar extends Component {
      render() {
        return (
            <div
            style={{position:'absolute', top:'150px', left:'50px',
            width:'383px', height:'244px'}}> 
              <div
              style={{backgroundColor:'#50A13C', height:'83px',
              borderColor:'none', textAlign:'center', verticalAlign:'middle',
              lineHeight:'83px', fontSize:'28pt', color:'white'}}>
                Welcome!
              </div>

              <div
              style={{backgroundColor:'white', height:'161px',
              borderStyle:'solid', borderColor:'#A09C9C',
              fontSize:'16pt'}}>
                 Check Pending Games <br/>
                 Download .csv File
              </div>
              
            </div>
        );
      }
   
}

export default SideBar;