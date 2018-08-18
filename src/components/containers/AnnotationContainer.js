import React, { Component } from 'react';
// import { connect } from 'react-redux';

class AnnotationContainer extends Component {
    constructor(props){
      super(props);

      this.state = {
        activeQuery: "",
        submittedQuery: "",
      }
    }

  onQueryChange = (event) => {
    this.setState({ activeQuery: event.target.value })
  }

  render(){
    return(
      <div className="container div--index-container">
        <h1>Annotation page coming soon</h1>
      </div>
    );
  }
}

export default AnnotationContainer;


// function mapStateToProps(state){
//   return {
//     artworkArray: state.artworkArray,
//   }
// }
//
// function mapDispatchToProps(dispatch){
//   return {
//     updateArtworkArray: (dataArray) => {
//       dispatch({type: "UPDATE_ARTWORK_ARRAY", payload: dataArray})
//     },
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AnnotationContainer);
