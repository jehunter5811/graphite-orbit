import React, { Component } from 'react';
import Header from '../main/Header';

class DocsList extends Component {

  render() {
    const { title, content } = this.props
    
    return (
      <div>
      <Header />
      <div className="container">
      <button onClick={this.props.newDocument}>Add a doc</button>
      <div>
        <label>Title</label>
        <input onChange={this.props.handleTitle} type="text" defaultValue={title} />
        <label>Content</label>
        <textarea onChange={this.props.handleContent} defaultValue={content}></textarea>
      </div>
      </div>
      </div>
    );
  }
}

export default DocsList;
