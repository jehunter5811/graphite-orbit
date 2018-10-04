export function deleteDoc(props) {
     let value = this.state.docs;
     const thisDoc = value.find((doc) => { return doc.id.toString() === props.id}); //comparing strings
     let index = thisDoc && thisDoc.id;
     function findObjectIndex(doc) {
         return doc.id === index; //comparing numbers
     }
     this.setState({ index: value.findIndex(findObjectIndex) })
}
