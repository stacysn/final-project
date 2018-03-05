import React, { Component } from 'react';
import $ from 'jquery'
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import BeachList from './BeachList';
import '../App.css';


class BodyContainer extends Component {
  render(){
    if (!this.props.isLoggedIn) {
      return(
        <div className='about-app center'>
          <div className='details' style={{fontWeight: 'bold', color: 'white'}}>
            <h4> Check out the best conditions in Santa Cruz </h4>
            <h4> Chat with fellow surfers for tips, updates, and meet new surfers </h4>
            <h4> Seas the day </h4>
          </div>
        </div>
      )
  }
    return (
      <BeachList userName={this.props.userName} />
    )
  }
}

export default BodyContainer;
