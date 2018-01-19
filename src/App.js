import React, { Component } from 'react';
import BodyContainer from './body/BodyContainer.js';
import Header from './head/Header.js'
import './App.css';
import './index.css';
import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        signUpUserName: '',
        signUpFirstName: '',
        signUpLastName: '',
        signUpPassword: '',
        userName: '',
        password: '',
        isLoggedIn: false,
        isSignInOpen: false,
        isSignUpOpen: false,
    }
  }

  handleChange = (event) => {
    let userInfo = $(event.target).closest('.validate').data('id-type');
    this.setState({[userInfo]: event.target.value})
  }

  toggleSignupModal = () => {
    this.setState({isSignUpOpen: !this.state.isSignUpOpen})
  }

  handleSignupSubmit = (event) => {
    event.preventDefault()
    $.ajax({
      method: "POST",
      url: "https://articulat.herokuapp.com/signup",
      data: {
        first_name: this.state.signUpFirstName,
        last_name: this.state.signUpLastName,
        password: this.state.signUpPassword,
        username: this.state.signUpUserName
      }
    })
    .then((res) => {
      this.toggleSignupModal()
    },
    (err) => {
      alert('User already exists')
    })
  }

  toggleSignInModal = () => {
    this.setState({isSignInOpen: !this.state.isSignInOpen})
  }

  handleUserNameChange = (event) => {
    this.setState({userName: event.target.value})
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  handleSignInSubmit = (event) => {
    event.preventDefault()
    $.ajax({
      method: "POST",
      url: "https://articulat.herokuapp.com/login",
      data: {
        username: this.state.userName,
        password: this.state.password
      }
    })
    .then((res) => {
      this.setState({userId: res._id, isLoggedIn: true})
      this.toggleSignInModal
    },
    (err) => {
      alert("Your Credentials are Incorrect")
      this.setState({
        userName: '',
        password: '',
        userId: '',
        isLoggedIn: false
      })
    })
  }

  handleLogOut = (event) => {
    this.setState({isLoggedIn:false})
  }

    render (){
      return (
        <div>

          <div className="background-image-container" style={{height: '300px', postition: 'relative', width: '100vw', overflow: "hidden"}}>
            <div className="background-image" style={{postion: 'relative', top: '0', bottom: '0', right: '0', left: '0'}}> <img src="https://i.imgur.com/Z75BVf5.jpg"/></div>
          </div>

          <div className='section-white'>
            <Header handleChange={(event) => this.handleChange(event)} toggleSignInModal={(event) => this.toggleSignInModal(event)} toggleSignupModal={(event)=> this.toggleSignupModal(event)}
                    handleSignupSubmit={(event) => this.handleSignupSubmit(event)} handleUserNameChange={(event) => this.handleUserNameChange(event)} handlePasswordChange={(event) => this.handlePasswordChange(event)}
                    handleSignInSubmit={(event) => this.handleSignInSubmit(event)} handleLogOut={(event) => this.handleLogOut(event)} userId={this.state.userId} userName={this.state.userName} isLoggedIn={this.state.isLoggedIn}
                    isSignInOpen={this.state.isSignInOpen} isSignUpOpen={this.state.isSignUpOpen} />
            <BodyContainer userId={this.state.userId} isLoggedIn={this.state.isLoggedIn} handleChange={(event => this.handleChange(event))} userName={this.state.userName}/>
          </div>

          <div>
          <div className="background-image-container" style={{height: '500px', postition: 'relative', width: '100vw', overflow: "hidden"}}>
              <div className="background-image" style={{postion: 'relative', top: '0', bottom: '0', right: '0', left: '0'}}> <img src="https://i.imgur.com/LuiImFf.png"/></div>
            </div>
          </div>

          <footer className="page-footer black">
            <div className="container">
              <div className="row">
                <div className="col l6 s12">
                  <h4 className="white-text">About </h4>
                  <p className="grey-text text-lighten-4" style={{fontSize: '20px'}}> This website is retrieving daily information using the API from <a href="http://www.Spitcast.com">Spitcast</a></p>
                </div>
              </div>
            </div>
            <div className="footer-copyright">
              <div className="container" style={{fontSize: '16px'}}>
              © 2017 Copyright StaySeaFunSurf
              Created by <a href='http://stacysuen.rocks'>Stacy Suen</a>
              </div>
            </div>
          </footer>

        </div>
      )
    }
}

export default App;
