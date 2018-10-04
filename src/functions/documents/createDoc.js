const uuidv4 = require('uuid/v4');

export const handleTitle = (e) => {
  this.setState({ title: e.target.value });
}

export const handleContent = (e) => {
  this.setState({ content: e.target.value });
}

export function handleAddNewDoc() {
  console.log(this.state)
  const object = {};
  object.title = this.state.title;
  object.content = this.state.content;
  object.date = JSON.stringify(new Date()).split('"')[1].split('T')[0];
  object.id = uuidv4();
  this.setState({ docs: [...this.state.docs, object ], singleDoc: object }, () => {
    // this.setState({ title: "", content: "" })
    this.handleAdd();
  })
}
