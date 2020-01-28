import React, { Component } from "react";

class UpcomingGames extends Component {
      render() {
        return (
          <div style={{height: '400px', borderStyle:'solid', borderColor:'#A09C9C',
            width:'700px', fontSize:'35pt', padding:'5px', backgroundColor:'white'}}> 
            <span style={{textDecoration:'underline',}}>Upcoming Games </span>
            <br/>
            <div style={{fontSize:'20pt', textAlign:'left'}}> 
            January 12, 5:00 Salmen J.V @ Home Field <br/>
            January 15, 5:30 Neville @ Neville Stadium
            </div>
          </div>
        );
      }
   
}

export default UpcomingGames;