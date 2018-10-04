import React, { Component } from 'react';
import logo from '../../images/logo.png';
import {
  userSignedIn,
  handleSignOut
} from '../../functions/identity/authentication';

class Header extends Component {

  render() {

    return (
      <nav>
          <div className="nav-wrapper">
            <a href="/" className="left brand-logo"><img className="logo-img" src={logo} alt="Graphite"/></a>
            <ul id="nav-mobile" className="right">
              <li>{userSignedIn() ? <a className="hide">Hide</a>: <a href="https://graphitedocs.com/about">About Graphite</a>}</li>
              <li>{userSignedIn() ? <a onClick={handleSignOut}>Sign Out</a> : <a className="hide">Hide</a>}</li>
            </ul>
          </div>
        </nav>
    );
  }
}

export default Header;
