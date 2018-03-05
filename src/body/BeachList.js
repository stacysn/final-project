import React, { Component } from 'react';
import $ from 'jquery'
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import BeachPage from './BeachPage'


class BeachList extends Component {
  constructor(props){
    super(props)
    this.state = {
      beachName: '',
      beachLat: '',
      beachLong: '',
      date: [],
      hour: [],
      currentTime: [],
      beachSpotList: [],
      selectedBeach:null,
      size_ft: [],
      selectedBeachNumber: null
    }
    this.loadBeaches = this.loadBeaches.bind(this);
  }

    componentWillMount(){
      this.loadBeaches()
    }

    loadBeaches() {
      [1,2,3,4].forEach( (beach) => {
        let beachURL = `https://cors-anywhere.herokuapp.com/http://api.spitcast.com/api/spot/forecast/${beach}`
         $.get(beachURL, (res) => {
           let currentTime = new Date(new Date().getTime()).toLocaleTimeString()
           console.log("RES", res)
            this.setState({ beachSpotList : [...this.state.beachSpotList, res[0].spot_name] })
            this.setState({ date: res[0].date })
            this.setState({ hour: res[0].hour })
            this.setState({ currentTime: currentTime})
            console.log("time:", currentTime);
          });
      });
    }

    selectedPleasurePoint = (event) => {
      this.setState({selectedBeach:0})
      this.setState({selectedBeachNumber: 1})
    }

    selectedSteamers = (event) => {
      this.setState({selectedBeach:1})
      this.setState({selectedBeachNumber: 2})
    }

    selectedCowells = (event) => {
      this.setState({selectedBeach:2})
      this.setState({selectedBeachNumber: 3})
    }

    selected38th = (event) => {
      this.setState({selectedBeach:3})
      this.setState({selectedBeachNumber: 4})
    }

    backToList = (event) => {
      this.setState({selectedBeach: null})
      this.setState({selectedBeachNumber: null})
    }

    render(){
      if (this.state.selectedBeach === null) {
        return (
        <div className="list-group center">
            <h1> Santa Cruz Popular Beaches </h1>
              <h3><a href="#" className="waves-effect waves-light btn-large list-group-item-action black lighten-2" id="pleasure-point" onClick={this.selectedPleasurePoint}>{this.state.beachSpotList[0]}</a></h3>
              <h3><a href="#" className="waves-effect waves-light btn-large list-group-item-action black lighten-2" id="steamer-lane" onClick={this.selectedSteamers}>{this.state.beachSpotList[1]}</a></h3>
              <h3><a href="#" className="waves-effect waves-light btn-large list-group-item-action black lighten-2" id="cowells" onClick={this.selectedCowells}>{this.state.beachSpotList[2]}</a></h3>
              <h3><a href="#" className="waves-effect waves-light btn-large list-group-item-action black lighten-2" id="38th-ave" onClick={this.selected38th}>{this.state.beachSpotList[3]}</a></h3>
          </div>
        )
      } else if (this.state.selectedBeach === 0) {
        return (
          <BeachPage backToList={(event)=>this.backToList(event)} selectedBeachNumber={this.state.selectedBeachNumber} userName={this.props.userName} beachSpotList={this.state.beachSpotList[0]} date={this.state.date} currentTime={this.state.currentTime}/>
        );
      } else if (this.state.selectedBeach === 1) {
          return(
          <BeachPage backToList={(event)=>this.backToList(event)} selectedBeachNumber={this.state.selectedBeachNumber} userName={this.props.userName} beachSpotList={this.state.beachSpotList[1]} date={this.state.date} currentTime={this.state.currentTime}/>
          )
      }
        else if (this.state.selectedBeach === 2) {
        return (
          <BeachPage backToList={(event)=>this.backToList(event)} selectedBeachNumber={this.state.selectedBeachNumber} userName={this.props.userName} beachSpotList={this.state.beachSpotList[2]} date={this.state.date} currentTime={this.state.currentTime}/>
        )
      }
        else if (this.state.selectedBeach === 3) {
        return (
          <BeachPage backToList={(event)=>this.backToList(event)} selectedBeachNumber={this.state.selectedBeachNumber} userName={this.props.userName} beachSpotList={this.state.beachSpotList[3]} date={this.state.date} currentTime={this.state.currentTime}/>
        )
      }
    }
}

export default BeachList;
