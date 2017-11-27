import React, { Component } from 'react'
import SignupModal from './SignupModal.js'
import SignInModal from './SignInModal.js'


class Header extends Component {
  render () {
    if (!this.props.isLoggedIn) {
      return (
        <header>
        <div className="home">
            <nav className='black lighten-1'>
              <a className="brand-logo center">
                <img src="../images/seasIt.png"/>
                <img src="../images/seasIt.png"/>
                <img src="../images/seasIt.png"/>
                <img src="../images/seasIt.png"/>
                <img src="../images/seasIt.png"/>
              </a>
              <a className='brand-logo center'>Seas it</a>
              <ul id='nav-list' className='right'>
                <li><a onClick={this.props.toggleSignInModal}>Sign In</a></li>
                <li><a onClick={this.props.toggleSignupModal}>Sign Up</a></li>
              </ul>
            </nav>
            <SignupModal isSignUpOpen={this.props.isSignUpOpen} toggleSignupModal={this.props.toggleSignupModal} handleSignupSubmit={this.props.handleSignupSubmit} handleChange={this.props.handleChange}
            />
            <SignInModal isSignInOpen={this.props.isSignInOpen} toggleSignInModal={this.props.toggleSignInModal} handleSignInSubmit={this.props.handleSignInSubmit} handleChange={this.props.handleChange}
            />
          </div>
        </header>
      )
    }
    return (
      <header>
        <nav className='black lighten-1 center'>
          <a className="brand-logo center">
            <img src="../images/seasIt.png"/>
            <img src="../images/seasIt.png"/>
            <img src="../images/seasIt.png"/>
            <img src="../images/seasIt.png"/>
            <img src="../images/seasIt.png"/>
          </a>
          <a className='brand-logo'>Seas it</a>
          <ul id='navList' className='right'>
            <li><a>Welcome {this.props.userName}!</a></li>
            <li><a onClick={this.props.handleLogOut}>Log Out</a></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
