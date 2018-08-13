import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnnotationCard from "../AnnotationCard"


// const annotationUrl = "https://agile-anchorage-40481.herokuapp.com/annotations";
const annotationUrl = "http://localhost:4000/annotations";



class DetailContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
        headline: "",
        sourceLink: "",
        content: "",
        xCoord: 0,
        yCoord: 0,
        displayingMarker: false,
        annotationArray: [],
    }

  }

  componentDidMount(){
    fetch(annotationUrl)
      .then(response => response.json())
      .then(data => this.filterAnnotationsByArtwork(data.annotations))
  }

  filterAnnotationsByArtwork = (annotationData) => {
    // console.log("Annotations in filter method:", annotationData)
    // console.log("FETCHED art: ", annotationData[0].artwork);
    // console.log("SELECTED art: ", this.props.selectedArtwork._id)
    let filteredAnnotations = annotationData.filter(individualAnnotation => individualAnnotation.artwork == this.props.selectedArtwork._id);
    // console.log("Filtered anotations", filteredAnnotations);
    this.setState({ annotationArray: filteredAnnotations })
  }


  onAnnotationSubmit = (event) => {
    event.preventDefault();
    // console.log("You submitted an annotation!")
    // console.log("Currently selected artwork", this.props.selectedArtwork)

    let submissionBody = {
      artwork: [this.props.selectedArtwork],
      user: [this.props.loggedInUser],
      headline: this.state.headline,
      source: this.state.sourceLink,
      content: this.state.content,
      xCoord: this.state.xCoord,
      yCoord: this.state.yCoord,
    }

    // console.log("Submission body", submissionBody)

    let postConfig = {
       method: "POST",
       headers: {
         "Content-type": "application/json"
       },
       body: JSON.stringify(submissionBody)
    }

    // console.log("posConfig: ", postConfig);

    fetch(annotationUrl, postConfig)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

  onInputChange = (event) => {
    let fieldName = event.target.name;
    let currentValue = event.target.value;
    this.setState({ [fieldName]: currentValue })
  }

  onArtworkClick = (event) => {
    // console.log("You clicked some artwork", event)
    // getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
    let currentTargetRect = event.currentTarget.getBoundingClientRect(); //figure how to use this later. Useful for reconstructing event?
    let xCoord = event.pageX - currentTargetRect.left;
    let yCoord = event.pageY - currentTargetRect.top;

    this.setState({
      xCoord: xCoord,
      yCoord: yCoord,
      displayingMarker: true,
    })
  }

  onAnnotationCardClick = (event, individualAnnotation) => {
    console.log("You clicked an annotation!!!", individualAnnotation);
    let xCoord = individualAnnotation.xCoord;
    let yCoord = individualAnnotation.yCoord;

    this.setState({
      xCoord: xCoord,
      yCoord: yCoord,
      displayingMarker: true,
    });
  }

  onAnnotationCardDelete = (event, individualAnnotation) => {
    console.log("You attempted a delete!")
  }




  render(){
    // console.log("headline value: ", this.state.headline)
    // console.log("sourceLink value: ", this.state.sourceLink)
    // console.log("content value: ", this.state.content)
    // console.log("Is marker being displayed?", this.state.displayingMarker);
    // console.log(`X/Y coords: ${this.state.xCoord} / ${this.state.yCoord}`);
    // console.log("state at render", this.state)


    let annotationMarkerStyle = {
      top: this.state.yCoord,
      left: this.state.xCoord,
      position: "fixed",
    }


    return(
      <div>
        <div id="annotation-zone"  >
            { this.state.displayingMarker
                      ? <div id="annotation-marker" style={annotationMarkerStyle} ></div>
                      : null
            }
          <img src={this.props.selectedArtwork.imageUrl} alt="" onClick={this.onArtworkClick}></img>
        </div>

        <h1>{this.props.selectedArtwork.title}</h1>
        <h3>{this.props.selectedArtwork.artist}</h3>
        <p>{this.props.selectedArtwork.medium} <br /><a href={this.props.selectedArtwork.url}>Read more here</a></p>

        <form onSubmit={this.onAnnotationSubmit}>
          <label>Headline:</label>
          <input placeholder="headline here" name="headline" value={this.state.headline} onChange={this.onInputChange} ></input>

          <label>Link:</label>
          <input placeholder="source link here" name="sourceLink" value={this.state.sourceLink} onChange={this.onInputChange} ></input>

          <label>Annotation:</label>
          <textarea placeholder="share your annotation here" name="content" value={this.state.content} onChange={this.onInputChange} ></textarea>

          <button>Submit annotation</button>
        </form>

        <div>
          {this.state.annotationArray.map(individualAnnotation => (
            <AnnotationCard
              annotation={individualAnnotation}
              key={individualAnnotation._id}
              id={individualAnnotation._id}
              headline={individualAnnotation.headline}
              source={individualAnnotation.source}
              content={individualAnnotation.content}
              onAnnotationCardClick={this.onAnnotationCardClick}
            />
          ))}
        </div>

      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    selectedArtwork: state.selectedArtwork,
    loggedInUser: state.loggedInUser,
  }
}

export default connect(mapStateToProps)(DetailContainer);


// {this.state.displayingMarker ? }
// <div id="annotation-marker"></div>
