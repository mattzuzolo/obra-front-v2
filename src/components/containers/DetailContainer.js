import React, { Component } from 'react';
import { connect } from 'react-redux';

import FullAnnotation from "../FullAnnotation"
import AnnotationCard from "../AnnotationCard"

const artworkUrl = "http://localhost:4000/artwork"
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
        selectedAnnotation: {},
    }
  }

  componentDidMount(){
    fetch(`http://localhost:4000/artwork/${this.props.paramsId}`)
      .then(response => response.json())
      .then(foundArtwork => this.props.selectArtwork(foundArtwork.artwork))
      .catch(error => console.log("Selected artwork after error: ", this.props.selectedArtwork))

    fetch(annotationUrl)
      .then(response => response.json())
      .then(data => this.filterAnnotationsByArtwork(data.annotations))
  }

  onInputChange = (event) => {
    let fieldName = event.target.name;
    let currentValue = event.target.value;
    this.setState({ [fieldName]: currentValue })
  }

  onArtworkClick = (event) => {
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

  onAnnotationSubmit = (event) => {
    event.preventDefault();
    if(!this.props.selectedArtwork.accessionyear){
      let annotationPostSubmissionBody = {
        artwork: [this.props.selectedArtwork],
        user: [this.props.loggedInUser],
        headline: this.state.headline,
        source: this.state.sourceLink,
        content: this.state.content,
        xCoord: this.state.xCoord,
        yCoord: this.state.yCoord,
      }
      this.postAnnotationFetch(annotationPostSubmissionBody)
      .then(response => response.json())
      .then(newAnnotation => this.setState({
        annotationArray: [...this.state.annotationArray, newAnnotation],
        headline: "",
        sourceLink: "",
        content: "",
      }) )
    }
  }

  postAnnotationFetch = (annotationPostSubmissionBody) => {
      let postAnnotationConfig = {
        Accept: "application/json",
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(annotationPostSubmissionBody)
      }

      return fetch(annotationUrl, postAnnotationConfig);
    }


  filterAnnotationsByArtwork = (annotationData) => {
    let filteredAnnotations = annotationData.filter(individualAnnotation => individualAnnotation.artwork[0] == this.props.selectedArtwork._id);
    this.setState({ annotationArray: filteredAnnotations })
  }

  onAnnotationCardClick = (event, individualAnnotation) => {
    let xCoord = individualAnnotation.xCoord;
    let yCoord = individualAnnotation.yCoord;

    this.setState({
      xCoord: xCoord,
      yCoord: yCoord,
      displayingMarker: true,
      selectedAnnotation: individualAnnotation,
    });
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

    // console.log("STATE AT RENDER DETAIL", this.state.selectedAnnotation)

    let annotationMarkerStyle = {
      top: this.state.yCoord,
      left: this.state.xCoord,
      position: "absolute",
    }

    return(
      <div className="container div--detail-container">

        <div className="div--art-annotations-container">
          <div className="annotation-zone">
              { this.state.displayingMarker
                        ? <div id="annotation-marker" style={annotationMarkerStyle} ></div>
                        : null
              }
              <img id="detail-image" onClick={this.onArtworkClick} src={this.props.selectedArtwork.primaryimageurl}></img>
          </div>

          <div className="div--annotation-list-container">
            {this.state.annotationArray.map(individualAnnotation => (
              <AnnotationCard
                className="div--annotation-card"
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

        <div className="div--artwork-info">
          <h1>{this.props.selectedArtwork.title}</h1>
          <h3>{this.props.selectedArtwork.artist}</h3>
          <p>Medium: {this.props.selectedArtwork.medium}</p>
          <p>Source: <a href={this.props.selectedArtwork.url}>Harvard Art Museums</a> </p>
          <button>Prepare an annotation</button>
        </div>

        <form className="container div--detail-form" onSubmit={this.onAnnotationSubmit}>
          <label>Headline:</label>
          <br/>
          <input className="detail-form-input" placeholder="headline here" name="headline" value={this.state.headline} onChange={this.onInputChange} ></input>
          <br/>
          <label>Link:</label>
          <br/>
          <input className="detail-form-input" placeholder="source link here" name="sourceLink" value={this.state.sourceLink} onChange={this.onInputChange} ></input>
          <br/>
          <label>Annotation:</label>
          <br/>
          <textarea className="detail-form-textarea" placeholder="share your annotation here" name="content" value={this.state.content} onChange={this.onInputChange} ></textarea>
          <br/>
          <button className="detail-form-button">Submit annotation</button>
        </form>

        <FullAnnotation selectedAnnotation={this.state.selectedAnnotation} />


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

function mapDispatchToProps(dispatch){
  return {
    updateArtworkArray: (artworkArray => {
      dispatch({type: "UPDATE_ARTWORK_ARRAY", payload: artworkArray})
    }),
    selectArtwork: (chosenArtwork) => {
      dispatch({type: "SELECT_ARTWORK", payload: chosenArtwork})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);










// {this.state.displayingMarker ? }
// <div id="annotation-marker"></div>



// <img src={this.props.selectedArtwork.primaryimageurl} alt="" onClick={this.onArtworkClick}></img>

//
//
// function annotationFetch(currentUser, data){
//
//   console.log("Data value in fetch function", data)
//
//   let annotationPost = {...data, user: currentUser}
//
//   let postConfig = {
//      method: "POST",
//      headers: {
//        "Content-type": "application/json"
//      },
//      body: JSON.stringify(annotationPost)
//   }
//
//   console.log("Annotation url before fetch", annotationUrl)
//   console.log("postConfig before fetch", postConfig)
//
//   return fetch(annotationUrl, postConfig)
// }







  // onAnnotationSubmit = (event) => {
    // event.preventDefault();
    // console.log("you clicked the annotation button")
    //
    // let submissionBody = {
    //   artwork: [this.props.selectedArtwork],
    //   user: [this.props.loggedInUser],
    //   headline: this.state.headline,
    //   source: this.state.sourceLink,
    //   content: this.state.content,
    //   xCoord: this.state.xCoord,
    //   yCoord: this.state.yCoord,
    // }
    //
    // let postConfig = {
    //    method: "POST",
    //    headers: {
    //      "Content-type": "application/json"
    //    },
    //    body: JSON.stringify({
    //      artwork: [this.props.selectedArtwork],
    //      user: [this.props.loggedInUser],
    //      headline: this.state.headline,
    //      source: this.state.sourceLink,
    //      content: this.state.content,
    //      xCoord: this.state.xCoord,
    //      yCoord: this.state.yCoord,
    //    })
    // }
    //
    // let artworkPostConfig = {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     title: this.props.selectedArtwork.title,
    //     artist: this.props.selectedArtwork.artist,
    //     medium: this.props.selectedArtwork.medium,
    //     century: this.props.selectedArtwork.century,
    //     culture: this.props.selectedArtwork.culture,
    //     url: this.props.selectedArtwork.url,
    //     imageUrl: this.props.selectedArtwork.primaryimageurl,
    //     id: this.props.selectedArtwork.id,
    //   })
    // }
    //
    // // console.log("submissionBody", submissionBody);
    // // console.log("postConfig", postConfig)
    //
    // // fetch(annotationUrl, postConfig)
    // //   .then(response => response.json())
    // //   .then(data => console.log("POST data", data))
    //
    // fetch(artworkUrl, artworkPostConfig)
    //   .then(artworkResponse => artworkResponse.json())
    //   // .then(artworkResponse => console.log("Artwork response:", artworkResponse))
    //   // .then(data => console.log("POSTED artwork", data))
    //   .then(data => annotationFetch([this.props.loggedInUser], data))
    //   .then(annotationResponse => annotationResponse.json())
    //   .then(dataTwo => console.log("Posted annotation", dataTwo))


    //Check if artwork exists in db.
    //add validations in backend to prevent duplicate id
    //
    // let artworkSubmission = {
    //   title: this.props.selectedArtwork.title,
    //   artist: this.props.selectedArtwork.artist,
    //   medium: this.props.selectedArtwork.medium,
    //   century: this.props.selectedArtwork.century,
    //   culture: this.props.selectedArtwork.century.culture,
    //   url: this.props.selectedArtwork.url,
    //   imageUrl: this.props.selectedArtwork.primaryimageurl,
    //   id: this.props.selectedArtwork.id,
    // }

    // let artworkPostConfig = {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     title: this.props.selectedArtwork.title,
    //     artist: this.props.selectedArtwork.artist,
    //     medium: this.props.selectedArtwork.medium,
    //     century: this.props.selectedArtwork.century,
    //     culture: this.props.selectedArtwork.century.culture,
    //     url: this.props.selectedArtwork.url,
    //     imageUrl: this.props.selectedArtwork.primaryimageurl,
    //     id: this.props.selectedArtwork.id,
    //   })
    // }

    // fetch()






    // fetch(artworkUrl, artworkPostConfig)
    //   .then(response => {
    //     if (!response.ok){
    //       throw new Error("This artwork already exists sent in throw error")
    //     }
    //     else {
    //       return response
    //     }
    //   })
    //   .then(response => response.json())
    //   // .then(artworkData => annotationPost(artworkData))
    //   // .then(annotationResponse => annotationResponse.json())
    //   // .then(annotationResponse => console.log("annotationResponse", annotationResponse))
    //   .catch(error => {
    //     if (error === "This artwork already exists - send in the front end"){
    //       fetch(artworkUrl)
    //         .then(response => response.json())
    //         .then(data => console.log("That artwork already exists. Here's a list of artwork", data))
    //         .catch(error => console.log("Error with GET"))
    //     }
    //     else {
    //       console.log(error)
    //     }
    //   })

    // let annotationPost = (artworkData) => {
    //
    //   let submissionBody = {
    //     artwork: [artworkData],
    //     user: [this.props.loggedInUser],
    //     headline: this.state.headline,
    //     source: this.state.sourceLink,
    //     content: this.state.content,
    //     xCoord: this.state.xCoord,
    //     yCoord: this.state.yCoord,
    //   }
    //
    //   let postConfig = {
    //      method: "POST",
    //      headers: {
    //        "Content-type": "application/json"
    //      },
    //      body: JSON.stringify(submissionBody)
    //   }
    //   return fetch(annotationUrl, postConfig)
    // }
    // fetch(annotationUrl, postConfig)
    //   .then(response => response.json())
    //   .then(data => this.setState({
    //     headline: "",
    //     sourceLink: "",
    //     content: "",
    //     annotationArray: [...this.state.annotationArray, data]
    //   }))
    //   .catch(error => console.log(error));
  // }
