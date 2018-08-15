import React, { Component } from 'react';

class ArtCard extends Component {
  render(){
    return(
      <div onClick={(event) => this.props.onClickArtwork (event, this.props.artwork)} className="div--art-card">
        <img src={this.props.primaryimageurl} alt="thumbail"></img>
        <h1>{this.props.title}</h1>
        <h3>{this.props.artist}</h3>
      </div>
    );
  }
}

export default ArtCard;
