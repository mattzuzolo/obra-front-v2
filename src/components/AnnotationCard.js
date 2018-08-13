import React, { Component } from 'react';

class AnnotationCard extends Component {
  render(){
    console.log("Annotation card props", this.props)
    return(
      <div onClick={this.props.onAnnotationCardClick} className="div--annotation-card">
        <h1>{this.props.headline}</h1>
        <p>{this.props.source}</p>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default AnnotationCard;
