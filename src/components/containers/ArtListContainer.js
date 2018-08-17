import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtCard from "../ArtCard"

const artworkUrl = "http://localhost:4000/artwork"

class ArtListContainer extends Component {

  postArtwork = () => {
    let artworkPostSubmissionBody = {
      title: this.props.selectedArtwork.title,
      artist: this.props.selectedArtwork.people[0].alphasort,
      medium: this.props.selectedArtwork.medium,
      century: this.props.selectedArtwork.century,
      culture: this.props.selectedArtwork.culture,
      url: this.props.selectedArtwork.url,
      primaryimageurl: this.props.selectedArtwork.primaryimageurl,
      id: this.props.selectedArtwork.id
    }

    let postArtworkConfig = {
      Accept: "application/json",
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(artworkPostSubmissionBody)
    }

    return fetch(artworkUrl, postArtworkConfig);
  }

  onClickArtwork = (event, selectedArtwork) => {

    //check to see if artwork exists in internal database
    fetch(`http://localhost:4000/artwork/`)
      .then(response => response.json())
      .then(data => findArtworkById(data.artwork, selectedArtwork))
      .then(foundWork => {
        if(foundWork){
          console.log("This artwork was found")
          this.props.routerProps.history.push(`/artwork/${foundWork.id}`)
          return this.props.selectArtwork(foundWork);
        }
        else {
          this.props.selectArtwork(selectedArtwork);
          console.log("This artwork was NOT found in the internal db", this.props.selectedArtwork)
          this.postArtwork()
            .then(response => response.json())
            .then(newArtwork => this.props.routerProps.history.push(`/artwork/${newArtwork.id}`))

        }
      })
      .catch(console.error)
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
    selectedArtwork: state.selectedArtwork,
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateArtworkArray: (artworkArray => {
      dispatch({type: "UPDATE_ARTWORK_ARRAY", payload: artworkArray})
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
