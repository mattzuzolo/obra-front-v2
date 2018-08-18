import React, { Component } from 'react';

class AnnotationCard extends Component {
  render(){
    return(
      <div onClick={(event) => this.props.onAnnotationCardClick(event, this.props.annotation)} className="div--annotation-card">
        <h1>{this.props.headline}</h1>
        <p>{this.props.source}</p>
        <p>{this.props.content}</p>
        <br />
        <button className="button button--annotation-card button--annotation-card-update" onClick={(event) => this.props.onAnnotationCardUpdate(event, this.props.annotation)} >Update Annotation</button>
        <button className="button button--annotation-card button--annotation-card-delete" onClick={(event) => this.props.onAnnotationCardDelete(event, this.props.annotation)} >Delete Annotation</button>
      </div>
    );
  }
}

export default AnnotationCard;
