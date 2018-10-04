import React, { Component } from 'react';
import Header from './Header';

class Main extends Component {

  render() {
    const {  docs } = this.props
    console.log(docs);
    let documents;
    docs === undefined || docs === {} ? documents = [] : documents = docs;
    return (
      <div>
      <Header />
      <div className="container docs-table">
        <h3>Documents ({documents.length}) <span><button onClick={this.props.handleAddNewDoc.bind(this)} type="button" className="btn branded">New</button></span></h3>
        <div>
          <table>
              <thead>
                  <tr>
                      <th></th>
                      <th>Title</th>
                      <th>Date</th>
                      <th className="uk-table-shrink">IPFS Hash</th>
                      <th className="uk-table-shrink"></th>
                  </tr>
              </thead>
              <tbody>
                {
                  documents.reverse().map(doc => {
                    return (
                      <tr key={doc.id}>
                        <td><input className="uk-checkbox" type="checkbox" /></td>
                        <td><a className="uk-link-reset">{doc.title || "Untitled"}</a></td>
                        <td>{doc.date}</td>
                        <td>{doc.id}</td>
                        <td><a href="#deleteModal" className="red-text modal-trigger">Delete</a></td>
                        <td id="deleteModal" className="modal">
                          <div className="modal-content">
                            <h4>Delete Document</h4>
                            <p>Are you sure you want to delete {doc.title || "Untitled"}?</p>
                          </div>
                          <div className="modal-footer">
                            <a onClick={() => this.props.deleteDoc(doc)} className="modal-close waves-effect waves-red red-text btn-flat">Delete</a>
                            <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
          </table>
      </div>
      </div>
      </div>
    );
  }
}

export default Main;
