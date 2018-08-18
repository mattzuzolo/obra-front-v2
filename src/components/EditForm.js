import React, { Component } from 'react';

class FullAnnotation extends Component {

  onInputChange = (event) => {
    let fieldName = event.target.name;
    let currentValue = event.target.value;
    this.setState({ [fieldName]: currentValue })
  }
  
  render(){
    return(
      <div className="div div--full-annotation">
      <h1>Update your annotation:</h1>
        <form className="container div--detail-form" onSubmit={"this.onAnnotationSubmit"}>
          <div className="detail-form-small-inputs">

            <label className="detail-form-label">Headline:</label>
            <br/>
            <input className="detail-form-input" placeholder="headline here" name="headline" value={"this.state.headline"} onChange={"this.onInputChange"} ></input>
            <br/>
            <label className="detail-form-label">Link:</label>
            <br/>
            <input className="detail-form-input" placeholder="source link here" name="sourceLink" value={"this.state.sourceLink"} onChange={"this.onInputChange"} ></input>
            <br/>
          </div>
            <label className="detail-form-label">Annotation:</label>
            <br/>
            <textarea className="detail-form-textarea" placeholder="share your annotation here" name="content" value={"this.state.content"} onChange={"this.onInputChange"} ></textarea>
            <br/>
            <button className="detail-form-button">Submit annotation</button>

        </form>
      </div>
    );
  }

}

export default FullAnnotation;
