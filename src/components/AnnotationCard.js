import React, { Component } from 'react';

class AnnotationCard extends Component {
  render(){
    // console.log("Annotation card props", this.props)
    return(
      <div onClick={(event) => this.props.onAnnotationCardClick(event, this.props.annotation)} className="div--annotation-card">
        <h1>{this.props.headline}</h1>
        <p>{this.props.source}</p>
        <p>{this.props.content}</p>
        <br />
      </div>
    );
  }
}

export default AnnotationCard;
