import React, { Component } from 'react';

class FullAnnotation extends Component {
  render(){
    return(
      <div className="div div--full-annotation">
        <h1>{this.props.selectedAnnotation.headline}</h1>
        <p>{this.props.selectedAnnotation.content}</p>
        <p>Source: <a href={this.props.selectedAnnotation.source}>{this.props.selectedAnnotation.source}</a></p>

        <button className="button button--annotation-card button--annotation-card-update" onClick={(event) => this.props.onAnnotationUpdateFormDisplay(event)} >Update Annotation</button>

        <button className="button button--annotation-card button--annotation-card-delete" onClick={(event) => this.props.onAnnotationCardDelete(event, this.props.selectedAnnotation)} >Delete Annotation</button>
      </div>
    );
  }

}

export default FullAnnotation;
