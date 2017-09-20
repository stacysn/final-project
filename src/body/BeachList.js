import React, { Component } from 'react';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
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
      shapeDetail: [],
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
            // this.setState({ shapeDetail: res[0].shape_detail})
            // console.log("SHAPE DETAIL", this.state.tide);
            this.setState({ currentTime: currentTime})
            console.log("time:", currentTime);
          });
      });
    }
['Cowells', 'Pleasure Point', '38th', 'Steamers']
// TODO: Iterate through a list of names, and create component links with those names instead of hard coding 4 different selectors and links
//click events for each particular beach; try to simplify!
    selectedPleasurePoint = (event) => {
      console.log("Pleasure Point");
      this.setState({selectedBeach:0})
      this.setState({selectedBeachNumber: 1})
    }

    selectedSteamers = (event) => {
      console.log("STEAMERS");
      this.setState({selectedBeach:1})
      this.setState({selectedBeachNumber: 2})
    }

    selectedCowells = (event) => {
      console.log("COWELLS");
      this.setState({selectedBeach:2})
      this.setState({selectedBeachNumber: 3})
    }

    selected38th = (event) => {
      console.log("38th");
      this.setState({selectedBeach:3})
      this.setState({selectedBeachNumber: 4})
    }

    render(){
      if (this.state.selectedBeach === null) {
        return (
        <div className="list-group teal lighten-2 center">
            <h1> Santa Cruz Popular Beaches </h1>
              <h3><a href="#" className="waves-effect waves-light btn-large list-group-item-action black lighten-2" id="pleasure-point" onClick={this.selectedPleasurePoint}>{this.state.beachSpotList[0]}</a></h3>
              <h3><a href="#" className="waves-effect waves-light btn-large list-group-item-action black lighten-2" id="steamer-lane" onClick={this.selectedSteamers}>{this.state.beachSpotList[1]}</a></h3>
              <h3><a href="#" className="waves-effect waves-light btn-large list-group-item-action black lighten-2" id="cowells" onClick={this.selectedCowells}>{this.state.beachSpotList[2]}</a></h3>
              <h3><a href="#" className="waves-effect waves-light btn-large list-group-item-action black lighten-2" id="38th-ave" onClick={this.selected38th}>{this.state.beachSpotList[3]}</a></h3>
          </div>
        )

        // React Router to link to different views.
      } else if (this.state.selectedBeach === 0) {
        return (
          <BeachPage selectedBeachNumber={this.state.selectedBeachNumber} userName={this.props.userName} beachSpotList={this.state.beachSpotList[0]} date={this.state.date} currentTime={this.state.currentTime}/>
        );
      } else if (this.state.selectedBeach === 1) {
          return(
          <BeachPage selectedBeachNumber={this.state.selectedBeachNumber} userName={this.props.userName} beachSpotList={this.state.beachSpotList[1]} date={this.state.date} currentTime={this.state.currentTime}/>
          )
      }
        else if (this.state.selectedBeach === 2) {
        return (
          <BeachPage selectedBeachNumber={this.state.selectedBeachNumber} userName={this.props.userName} beachSpotList={this.state.beachSpotList[2]} date={this.state.date} currentTime={this.state.currentTime}/>
        )
      }
        else if (this.state.selectedBeach === 3) {
        return (
          <BeachPage selectedBeachNumber={this.state.selectedBeachNumber} userName={this.props.userName} beachSpotList={this.state.beachSpotList[3]} date={this.state.date} currentTime={this.state.currentTime}/>
        )
      }
    }
}

export default BeachList;
