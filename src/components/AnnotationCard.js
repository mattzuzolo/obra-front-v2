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
        <button onClick={(event) => this.props.onAnnotationCardDelete(event, this.props.annotation)} >Click here to delete me</button>
        <button onClick={(event) => this.props.onAnnotationCardPut(event, this.props.annotation)}>Click here to edit this annotation</button>
      </div>
    );
  }
}

export default AnnotationCard;
