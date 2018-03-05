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
        <div>
          <div className='about-app center'> 
            <h4 style={{fontWeight: "bold", position: 'relative'}}> Check out the best conditions in Santa Cruz </h4>
            <h4 style={{fontWeight: "bold"}}> Chat with fellow surfers for tips, updates, and meet new surfers </h4>
            <h4 style={{fontWeight: "bold"}}> Seas the day </h4>
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

  // <div>
  // <div className="background-image-container" style={{height: '500px', postition: 'relative', width: '100vw', overflow: "hidden"}}>
  //     <div className="background-image" style={{postion: 'relative', top: '0', bottom: '0', right: '0', left: '0'}}> <img src="https://i.imgur.com/LuiImFf.png"/></div>
  //   </div>
  // </div>
