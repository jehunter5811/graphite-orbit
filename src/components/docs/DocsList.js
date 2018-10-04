import React, { Component } from 'react';
import Header from './Header';

class DocsList extends Component {

  render() {
    const { title, content } = this.props
    return (
      <div>
      <Header />
      <div className="container">
      <button onClick={this.props.handleAdd}>Add it</button>
      <button onClick={this.props.handleGet}>Get it</button>
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
