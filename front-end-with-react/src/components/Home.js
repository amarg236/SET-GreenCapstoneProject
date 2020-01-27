import React, { Component } from "react";
import Cal from "./Project/Cal";

class Home extends Component {
  render() {
    return (
      <div className="projects">
        <div class="cal-pos">
                <Cal />
        </div>
      </div>
    );
  }
}

export default Home;
