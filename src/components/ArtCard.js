import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ArtCard extends Component {
  render(){
    return(
      <Link to={`/artwork/${this.props.artwork.apiId}`} className="div--art-card">
        <img src={this.props.imageUrl} alt="thumbail"></img>
        <h1>{this.props.title}</h1>
        <h3>{this.props.artist}</h3>
      </Link>
    );
  }
}

export default ArtCard;

 // onClick={(event) => this.props.onClickArtwork (event, this.props.artwork)}
