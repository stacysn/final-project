import React, { Component } from 'react';
import $ from 'jquery'
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import BeachList from './BeachList'


class BodyContainer extends Component {
  render(){
    if (!this.props.isLoggedIn) {
      return(
        <div className='about-app center' >
          <h4 style={{fontWeight: "bold"}}> Check out the best conditions in Santa Cruz </h4>
          <h4 style={{fontWeight: "bold"}}> Chat with fellow surfers for tips, updates, and meet new surfers </h4>
          <h4 style={{fontWeight: "bold"}}> Seas the day </h4>
        </div>
      )
  }
    return (
      <BeachList userName={this.props.userName} />
    )
  }
}

export default BodyContainer;
