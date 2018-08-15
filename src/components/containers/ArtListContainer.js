import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtCard from "../ArtCard"

class ArtListContainer extends Component {

  onClickArtwork = (event, selectedArtwork) => {

    fetch(`http://localhost:4000/artwork/`)
      .then(response => response.json())
      .then(data => findArtworkById(data.artwork, selectedArtwork))
      .then(foundWork => {
        if(foundWork){
          return this.props.selectArtwork(foundWork);
        }
        else {
          return this.props.selectArtwork(selectedArtwork);
        }
      })
      .catch(console.error)

    this.props.routerProps.history.push(`/artwork/${this.props.selectedArtwork.id}`)
    // this.props.selectArtwork(selectedArtwork);
  }

  render(){
    return(
      <div className="container div--art-list-container">
        {this.props.artworkArray.map(individualCard => (
          <ArtCard
            className="artList"
            artwork={individualCard}
            key={individualCard.id}
            id={individualCard.id}
            title={individualCard.title}
            artist={individualCard.artist}

            primaryimageurl={individualCard.primaryimageurl}
            onClickArtwork={this.onClickArtwork}
          />
        ))}
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    artworkArray: state.artworkArray,
    // selectedArtwork: state.selectedArtwork,
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateArtworkArray: (artworkArray => {
      dispatch({type: "UPDATE_ARTWORK_ARRAY", payload: artworkArray})
    }),
    updateTestString: (newString => {
      dispatch({type: "CHANGE_MESSAGE", payload: newString})
    }),
    selectArtwork: (chosenArtwork) => {
      dispatch({type: "SELECT_ARTWORK", payload: chosenArtwork})
    }
  }
}

function findArtworkById(fetchedArray, selectedArtwork){
  return fetchedArray.find(individualArtwork => individualArtwork.id === parseInt(selectedArtwork.id, 10))
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtListContainer);


// {/* imageUrl={individualCard.imageUrl} */}
