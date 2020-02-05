import React, { Component } from "react";
import "../../stylesheets/manageBox.css";

class ManageBox extends Component {
    render() {
      return (
        <div className='wrapper'>
        <form className="mngeLayout" style={{width:'80%', marginLeft:'10%'}}>

          <div className='pos' style={{marginBottom:'5%'}}> 
            <button className="btn btn-lg btn-block" type="submit">
              MANAGE USER
            </button>
          </div>
        
          <div className='pos'> 
            <button className="btn btn-lg btn-block" type="submit">
              MANAGE TEAM
            </button>
          </div>
        </form>
        </div>
    );
  }
}

  
  export default ManageBox;