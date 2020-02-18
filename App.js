import React, { Component } from 'react';
import './App.css';
import GameDisplay from './Components/GameDisplay';

class App extends Component{
  render() {
    return (
      <div className="App">
        <GameDisplay home="PS 1" away="PS 27" location="Soccerman Field" date="2/18/2020"/>
        <button > Accept</button>
        <button > Decline </button>  
      </div>
    );
  }
}

export default App;
