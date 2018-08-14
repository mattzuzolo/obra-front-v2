import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtCard from "../ArtCard"

const artworkUrl = "http://localhost:4000/artwork";

class ArtListContainer extends Component {


  onClickArtwork = (event, selectedArtwork) => {

    console.log("artwork", selectedArtwork)

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

      console.log("Clicked artwork before push", )

    this.props.routerProps.history.push(`/artwork/${this.props.selectedArtwork.apiId}`)
    // this.props.selectArtwork(selectedArtwork);
  }

  render(){
    return(
      <div className="container div--art-list-container">
        {this.props.artworkArray.map(individualCard => (
          <ArtCard
            className="artList"
            artwork={individualCard}
            key={individualCard.apiId}
            id={individualCard.apiId}
            title={individualCard.title}
            artist={individualCard.artist}

            imageUrl={individualCard.primaryimageurl}
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
    selectedArtwork: state.selectedArtwork,
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
  console.log("findArtworkById fetchedArray", typeof fetchedArray[0].apiId)
  console.log("findArtworkById selectedArtwork", typeof selectedArtwork.id)
  return fetchedArray.find(individualArtwork => individualArtwork.apiId == selectedArtwork.id)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtListContainer);


// {/* imageUrl={individualCard.imageUrl} */}
