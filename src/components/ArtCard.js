import React, { Component } from 'react';

class ArtCard extends Component {
  render(){
    return(
      <div onClick={(event) => this.props.onClickArtwork (event, this.props.artwork)} className="div--art-card">

        <div className="div--art-card-left">
          <img src={this.props.primaryimageurl} alt="thumbail"></img>
        </div>

        <div className="div--art-card-right">
          <h1 className="h1 art-card-title">{this.props.title}</h1>

        {/*Not all works have an artist attached. Only displays existing artists*/}
            { this.props.artist
                      ? <h3 className="h3 art-card-artist">{this.props.artist}</h3>
                      : null
            }
          <p className="p art-card-detail"><span style={{ fontWeight: 'bold' }}>Medium:</span> {this.props.medium}</p>
          <p className="p art-card-detail"><span style={{ fontWeight: 'bold' }}>Culture of origin:</span> {this.props.culture}</p>
          <p className="p source-credit art-card-detail detail-source"><span style={{ fontWeight: 'bold' }}>Source:</span> <a href={this.props.url}>Harvard Art Museums</a> </p>
        </div>

      </div>
    );
  }
}
export default ArtCard;
