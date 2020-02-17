import React, {Component} from 'react';
import TimeField from 'react-simple-timefield';
 
class ChooseTime extends React.Component {
  constructor(...args) {
    super(...args);
 
    this.state = {
      time: '00:00'
    };
 
    this.onTimeChange = this.onTimeChange.bind(this);
  }
 
  onTimeChange(event, time) {
    this.setState({time});
  }
 
  render() {
    const {time} = this.state;
 
    return (
      <TimeField style={{width:"20%"}}
      value={time} onChange={this.onTimeChange} />
    );
  }
}

export default ChooseTime;