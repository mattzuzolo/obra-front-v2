import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnnotationListItem from "../AnnotationListItem"

//This url provides access to annotations with full artwork objects
const annotationWithArtworkUrl = "http://localhost:4000/annotations-artwork";

class AnnotationContainer extends Component {
    constructor(props){
      super(props);

      this.state = {
        activeQuery: "",
        fetchedAnnotations: [],
      }
    }

  componentDidMount(){
    fetch(annotationWithArtworkUrl)
      .then(response => response.json())
      .then(data => this.setState({fetchedAnnotations: data.annotation}))
      .catch(console.error)
  }

  onQueryChange = (event) => {
    this.setState({ activeQuery: event.target.value })
  }

  onClickAnnotation = (event, individualAnnotation, selectedArtwork) => {
    // this.props.selectAnnotation(individualAnnotation)
    this.props.routerProps.history.push(`/artwork/${selectedArtwork.id}`)
    return this.props.selectArtwork(selectedArtwork);
  }

  render(){
    return(
      <div className="container div--index-container">
        {this.state.fetchedAnnotations.map(individualAnnotation => (
          <AnnotationListItem
            key={individualAnnotation._id}
            individualAnnotation={individualAnnotation}
            onClickAnnotation={this.onClickAnnotation}
          />
        ))}
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    selectedArtwork: state.selectedArtwork,
  }
}

function mapDispatchToProps(dispatch){
  return {
    selectArtwork: (chosenArtwork) => {
      dispatch({type: "SELECT_ARTWORK", payload: chosenArtwork})
    },
    selectAnnotation: (chosenAnnotation) => {
      dispatch({type: "SELECT_ANNOTATION", payload: chosenAnnotation})
    },
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AnnotationContainer);

// <AnnotationListItem
//   individualAnnotation={individualAnnotation}
//   onClickAnnotation={this.onClickAnnotation}
// />
