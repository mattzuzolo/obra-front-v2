import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtListContainer from "./ArtListContainer"
let querystring = require('querystring')


class AboutContainer extends Component {
  render(){
    return(
      <div className="container div--index-container">
        <h1>About page coming soon</h1>
      </div>
    );
  }
}

export default AboutContainer;


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

// export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer);
