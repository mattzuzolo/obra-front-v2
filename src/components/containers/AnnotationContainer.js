import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnnotationListItem from "../AnnotationListItem"


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
      // .then(data => console.log("with artwork data", data.annotation))
      .then(annotationArray => this.setState({fetchedAnnotations: annotationArray.annotation}))
  }

  onQueryChange = (event) => {
    this.setState({ activeQuery: event.target.value })
  }

  onClickAnnotation = (event, selectedArtwork) => {
    this.props.routerProps.history.push(`/artwork/${selectedArtwork.id}`)
    return this.props.selectArtwork(selectedArtwork);
  }

  render(){
    return(
      <div className="container div--index-container">
          {this.state.fetchedAnnotations.map(individualAnnotation => (
            <AnnotationListItem
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
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AnnotationContainer);
