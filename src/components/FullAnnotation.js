import React, { Component } from 'react';

class FullAnnotation extends Component {
  render(){
    return(
      <div className="div div--full-annotation">
        <h1>{this.props.selectedAnnotation.headline}</h1>
        <p>{this.props.selectedAnnotation.content}</p>
        <p>{this.props.selectedAnnotation.source}</p>
      </div>
    );
  }

}

export default FullAnnotation;
