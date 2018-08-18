import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtListContainer from "./ArtListContainer"
let querystring = require('querystring')


class AboutContainer extends Component {
  render(){
    return(
      <div className="container div--about-container">
        <h1>OBRA was created by <a href="https://www.github.com/mattzuzolo">Matt Zuzolo</a>.</h1>
        <p>You can view the code on my <a href="https://www.github.com/mattzuzolo">GitHub page</a>, or directly at the <a href="https://github.com/mattzuzolo/obra-front-v2">repository</a>.</p>
        <p className="source-credit">This project was made using art data from <a href="https://github.com/mattzuzolo/obra-front-v2">The Harvard Museum API.</a></p>
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
