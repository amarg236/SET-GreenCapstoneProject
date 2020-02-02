import React, { Component } from "react";
import "../../stylesheets/manageBox.css";

class ManageBox extends Component {
    render() {
      return (
            <div className='mngeLayout'>
                <button className='btn btn-block' 
                type='button'
                style={{height:'35%', marginTop:'5%', marginBottom:'0'}}> 
                  MANAGE USER
                </button>
                <br/>
                <button className='btn btn-block' 
                type='button'
                style={{height:'35%', marginTop:'0'}}> 
                  MANAGE TEAM
                </button>

            </div>
      );
    }
  }
  
  export default ManageBox;