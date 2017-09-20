import React, { Component } from 'react';
import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import Chart from './Chart';
import update from 'immutability-helper'
import ChatApp from './ChatApp'

class BeachPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm',
        '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', 'midnight'],
        datasets: [
          {
            label: 'Size of Waves in Feet',
            data: []
          }
        ]
      }
    }
  }

  componentDidMount(){
    // var dis = this;
    let beachURL = `http://api.spitcast.com/api/spot/forecast/${this.props.selectedBeachNumber}`
    $.get(beachURL)
    .done((res) => {
      console.log("RESSSSSSSSSS", res);
      let sizeArr = []
      for (let i = 0; i < res.length; i++){
        sizeArr.push(res[i].size_ft)
      }
      let currentState = this.state;
      currentState.chartData.datasets[0].data = sizeArr
      console.log("CURRENT STATE", currentState);
      this.setState(
        { chartData: update(this.state.chartData, {datasets: {data: {$set: sizeArr}}})
      })
    console.log("THIS.STATE.CHARTDATA", this.state.chartData);
    })
  }

  render(){
    console.log("Chart Data", this.state.chartData);
    return(
      <div className="beach-info teal lighten-2">
          <h1> {this.props.beachSpotList} </h1>
          <h4> Date: {this.props.date} </h4>
          <h4> Current Time: {this.props.currentTime} </h4>
        <div>
          <Chart data={this.state.chartData} redraw/>
        </div>
        <div>
          <ChatApp userName={this.props.userName}/>
        </div>
      </div>
    )
  }
}

export default BeachPage;
