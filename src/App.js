import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/main/Main';
import SignIn from './components/main/SignIn';
import SingleDoc from './components/docs/SingleDoc';
import './App.css';
import * as blockstack from 'blockstack';
import {
  loadDB,
  handleAdd,
  handleGet,
  deleteDoc
} from './functions/orbit/dbFunctions';
import {
  userSignedIn,
  checkAuth,
  testCred
} from './functions/identity/authentication';
import {
  handleAddNewDoc
} from './functions/documents/createDoc';
import {
  loadUserData
} from 'blockstack';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: [],
      singleDoc: {},
      title: "",
      content: "",
      blockstackAuth: false,
      all: {},
      index: 0
    }
    this.handleAddNewDoc = handleAddNewDoc.bind(this);
    this.loadDB = loadDB.bind(this);
    this.handleAdd = handleAdd.bind(this);
    this.handleGet = handleGet.bind(this);
    this.testCred = testCred.bind(this);
    this.deleteDoc = deleteDoc.bind(this);
  }

  componentDidMount() {
    if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
    console.log(userSignedIn())
    if(checkAuth() === "blockstack") {
      console.log(loadUserData())
    } else if(checkAuth() === "uPort") {
      console.log("uPort son")
    }
    if(userSignedIn() === true) {
      this.loadDB();
    }
  }


  render() {
    const { docs } = this.state;

    return (
      <div>
      <BrowserRouter>
        <div>
          {
            userSignedIn() ?
            <Route exact path="/" render={(location, match, props) =>
                <Main {...props}
                  handleAddNewDoc={this.handleAddNewDoc}
                  testCred={this.testCred}
                  deleteDoc={this.deleteDoc}
                  docs={docs}
                />}
            /> :
            <div>
              <Route exact path="/" render={(location, match, props) =>
                  <SignIn {...props}
                    blockstackSignIn={this.blockstackSignIn}
                  />}
              />
              <Route exact path="/docs/:id" render={(location, match, props) =>
                  <SingleDoc {...props}
                    docs={docs}
                  />}
              />
            </div>
          }
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

// <button onClick={this.handleAdd}>Add it</button>
// <button onClick={this.handleGet}>Get it</button>
// <button onClick={this.newDocument}>Add a doc</button>
// <div>
//   <label>Title</label>
//   <input onChange={this.handleTitle} type="text" defaultValue={this.state.title} />
//   <label>Content</label>
//   <textarea onChange={this.handleContent} defaultValue={this.state.content}></textarea>
// </div>

export default App;
