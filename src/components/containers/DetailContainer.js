import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnnotationCard from "../AnnotationCard"

// const annotationUrl = "https://agile-anchorage-40481.herokuapp.com/annotations";
const annotationUrl = "http://localhost:4000/annotations";
const artworkUrl = "http://localhost:4000/artwork"

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
    let filteredAnnotations = annotationData.filter(individualAnnotation => individualAnnotation.artwork == this.props.selectedArtwork._id);
    this.setState({ annotationArray: filteredAnnotations })
  }


  onAnnotationSubmit = (event) => {
    event.preventDefault();

    //Check if artwork exists in db.
    //add validations in backend to prevent duplicate apiId

    let artworkSubmission = {
      title: this.props.selectedArtwork.title,
      artist: this.props.selectedArtwork.artist,
      medium: this.props.selectedArtwork.medium,
      century: this.props.selectedArtwork.century,
      culture: this.props.selectedArtwork.century.culture,
      url: this.props.selectedArtwork.url,
      imageUrl: this.props.selectedArtwork.primaryimageurl,
      apiId: this.props.selectedArtwork.id,
    }

    let artworkPostConfig = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(artworkSubmission)
    }


    let submissionBody = {
      artwork: [this.props.selectedArtwork],
      user: [this.props.loggedInUser],
      headline: this.state.headline,
      source: this.state.sourceLink,
      content: this.state.content,
      xCoord: this.state.xCoord,
      yCoord: this.state.yCoord,
    }

    // let postConfig = {
    //    method: "POST",
    //    headers: {
    //      "Content-type": "application/json"
    //    },
    //    body: JSON.stringify(submissionBody)
    // }

    fetch(artworkUrl, artworkPostConfig)
      .then(response => response.json())
      // .then(data => console.log("POST artwork response:", data))
      .then(artworkData => annotationPost(artworkData))
      .then(annotationResponse => annotationResponse.json())
      .then(annotationResponse => console.log("annotationResponse", annotationResponse))
      .catch(error => console.log(error))

    let annotationPost = (artworkData) => {

      let submissionBody = {
        artwork: [artworkData],
        user: [this.props.loggedInUser],
        headline: this.state.headline,
        source: this.state.sourceLink,
        content: this.state.content,
        xCoord: this.state.xCoord,
        yCoord: this.state.yCoord,
      }

      let postConfig = {
         method: "POST",
         headers: {
           "Content-type": "application/json"
         },
         body: JSON.stringify(submissionBody)
      }
      return fetch(annotationUrl, postConfig)
    }
    // fetch(annotationUrl, postConfig)
    //   .then(response => response.json())
    //   .then(data => this.setState({
    //     headline: "",
    //     sourceLink: "",
    //     content: "",
    //     annotationArray: [...this.state.annotationArray, data]
    //   }))
    //   .catch(error => console.log(error));
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
    let xCoord = individualAnnotation.xCoord;
    let yCoord = individualAnnotation.yCoord;

    this.setState({
      xCoord: xCoord,
      yCoord: yCoord,
      displayingMarker: true,
    });
  }

  onAnnotationCardPut = (event, individualAnnotation) => {
    let urlWithId = annotationUrl + "/" + individualAnnotation._id
    // console.log("annotation on render", individualAnnotation)

    // let submissionBody = {
    //   artwork: [this.props.selectedArtwork],
    //   user: [this.props.loggedInUser],
    //   headline: this.state.headline,
    //   source: this.state.sourceLink,
    //   content: this.state.content,
    //   xCoord: this.state.xCoord,
    //   yCoord: this.state.yCoord,
    // }

    // fetch(urlWithId, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify({ message: { real_name: 'Matt', message: 'My edit was successful'}})
    // })
    //   .then( res => res.json())
    //   .then( json => {
    //     console.log(json);
    //   })
  }

  onAnnotationCardDelete = (event, individualAnnotation) => {
    let urlWithId = annotationUrl + "/" + individualAnnotation._id

    fetch(urlWithId, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/json"
        }
      });
  }


  render(){

    let annotationMarkerStyle = {
      top: this.state.yCoord,
      left: this.state.xCoord,
      position: "absolute",
    }

    console.log("Annotation array at render", this.state.annotationArray)
    return(
      <div>
        <div id="annotation-zone"  >
            { this.state.displayingMarker
                      ? <div id="annotation-marker" style={annotationMarkerStyle} ></div>
                      : null
            }
          <img src={this.props.selectedArtwork.primaryimageurl} alt="" onClick={this.onArtworkClick}></img>
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
              onAnnotationCardPut={this.onAnnotationCardPut}
              onAnnotationCardDelete={this.onAnnotationCardDelete}
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
