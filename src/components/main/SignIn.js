import React, { Component } from 'react';
import Header from './Header';
import {
  uPortSignIn
} from '../../functions/identity/authentication';

class SignIn extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="container sign-in center-align">
          <h1>Welcome!</h1>
          <h5>Graphite is a decentralized and encrypted replacement for Google'{/*'*/}s G-Suite. Powered by IPFS, uPort, Ethereum, and distributed nodes around the world, Graphite is totally secure and totally decentralized.</h5>
          <div>
            {/*<button onClick={blockstackSignIn.bind(this)} className="btn btn-primary">Sign in with Blockstack</button>*/}
            <button onClick={uPortSignIn.bind(this)} className="uport-signin">Connect with uPort</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
