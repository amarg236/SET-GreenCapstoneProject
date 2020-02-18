import React from 'react'

const GameDisplay = props => {
    console.log(props)
    return(
        <div>
        <h1>Home Team: {props.home} Away Team: {props.away}</h1>
        <h2>Location: {props.location} Date: {props.date}</h2>
        </div>
    ) 
          
} 

export default GameDisplay;
