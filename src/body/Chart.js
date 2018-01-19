import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'
import $ from 'jquery'

class Chart extends Component{
  render(){
    return (
      <div className="chart">
        <Bar
          ref='chart'
        	data={this.props.data}
        	options={{
            title: {
              display: true,
              text: 'Predicted Surf Height',
              fontSize: 25,
            },
            maintainAspectRatio: false,
            legend: {
              display: true,
              position: 'right'
            }
        	}}
        redraw />
      </div>
    )
  }
}

export default Chart;

//redraw in line 24 redraws the chart each time page is rendered 
