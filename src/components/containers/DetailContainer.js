import React, { Component } from 'react';
import { connect } from 'react-redux';


import AnnotationCard from "../AnnotationCard"
import FullAnnotation from "../FullAnnotation"
import EditForm from "../EditForm"

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
        displayingFullAnnotation: false,
        displayingEditForm: false,
    }
  }

  componentDidMount(){

    //fetches a specific artwork based on URL params
    fetch(`http://localhost:4000/artwork/${this.props.paramsId}`)
      .then(response => response.json())
      .then(foundArtwork => this.props.selectArtwork(foundArtwork.artwork))
      .catch(console.error)

    //Fetches annotation list for the specific work displayed
    fetch(annotationUrl)
      .then(response => response.json())
      .then(data => this.filterAnnotationsByArtwork(data.annotations))
      .then(filteredData => this.setState({annotationArray: filteredData}))
      .catch(console.error)
  }

  //only displays annotations for the selected artwork
  filterAnnotationsByArtwork = (annotationData) => {
    return annotationData.filter(individualAnnotation => individualAnnotation.artwork[0] == this.props.selectedArtwork._id);
  }

  onInputChange = (event) => {
    let fieldName = event.target.name;
    let currentValue = event.target.value;
    this.setState({ [fieldName]: currentValue })
  }

  //Updates state with the coordinates of most recent click for annotation coordinates
  onArtworkClick = (event) => {
    let xCoord = event.clientX - 50;
    let yCoord = event.clientY - 50;

    this.setState({
      xCoord: xCoord,
      yCoord: yCoord,
      //displays the hidden annotation marker so user can see location
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

      //Posts annotation to server. Then optimistically renders the new annotation
      this.postAnnotationFetch(annotationPostSubmissionBody)
      .then(response => {
        if(!response.ok){
          console.log("NOT OK")
          throw new Error("You must be logged in to create an annotation")
        }
        return response
      })
      .then(response => response.json())
      .then(newAnnotation => this.setState({
        annotationArray: [...this.state.annotationArray, newAnnotation],
        headline: "",
        sourceLink: "",
        content: "",
      }) )
      .catch(error => {
        this.props.routerProps.history.push("/login");
        console.log("Error", error)
      })
    }
  }

  postAnnotationFetch = (annotationPostSubmissionBody) => {
    let postAnnotationConfig = {
      Accept: "application/json",
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-auth": localStorage.getItem("token")
        },
        body: JSON.stringify(annotationPostSubmissionBody)
    }
    return fetch(annotationUrl, postAnnotationConfig);
  }


  //Triggers when user selects specific annotation
  //Displays/moves annotation marker tied to the chosen annotation
  onAnnotationCardClick = (event, individualAnnotation) => {
    let xCoord = individualAnnotation.xCoord;
    let yCoord = individualAnnotation.yCoord;

    this.setState({
      xCoord: xCoord,
      yCoord: yCoord,
      displayingMarker: true,
      selectedAnnotation: individualAnnotation,
      displayingEditForm: false,
      displayingFullAnnotation: true,
    });
  }

  //Displays edit form when update button is clicked inside FullAnnotation component
  onAnnotationUpdateFormDisplay = (event) => {
    event.persist();
    event.preventDefault();

    this.setState({
      displayingEditForm: true,
      displayingFullAnnotation: false,
    });
  }

  //Send PUT request to server with updated information
  onAnnotationUpdateSubmit = (event, formState) => {
    event.preventDefault();

    let updateUrl = `http://localhost:4000/annotations/${this.state.selectedAnnotation._id}`
    let updateSubmissionBody = {
        artwork: [this.state.selectedAnnotation.artwork],
        user: [this.state.selectedAnnotation.user],
        // _id: this.state.selectedAnnotation._id,
        headline: formState.headline,
        content: formState.content,
        source: formState.sourceLink,
        xCoord: formState.xCoord,
        yCoord: formState.yCoord,
    }

    let updateConfig = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "x-auth": localStorage.getItem("token"),
      },
      body: JSON.stringify(updateSubmissionBody)
    }

    fetch(updateUrl, updateConfig)
      .then(response => {
        if(!response.ok){
          throw new Error("You can only update your own annotations.")
        }
      })
      .then(() => this.updateSpecificAnnotationInAnnotationArray(this.state.selectedAnnotation, updateSubmissionBody))
      .then(() => this.setState({displayingFullAnnotation: false}))
      .catch(error => {
        alert("You can only update your own annotations.")
      })
  }

  //Optimistically render the fetched update
  updateSpecificAnnotationInAnnotationArray = (individualAnnotation, newAnnotation) => {
    let matchedIndex = this.state.annotationArray.findIndex(annotationArrayItem => annotationArrayItem === individualAnnotation)
    if (matchedIndex > -1) {
      let newArray = [...this.state.annotationArray]
      newArray[matchedIndex] = newAnnotation;
      this.setState({
        annotationArray: newArray,
        displayingEditForm: false,
      })
    }
  }


  onAnnotationCardDelete = (event, individualAnnotation) => {
    let urlWithId = annotationUrl + "/" + individualAnnotation._id
    fetch(urlWithId, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/json",
          "x-auth": localStorage.getItem("token"),
        }
      })
      .then(response => {
        if(!response.ok){
          throw new Error("You can only delete your own annotations.")
        }
      })
      .then(() => this.removeSpecificAnnotationInAnnotationArray(individualAnnotation))
      .catch(error => {
        alert("You can only delete your own annotations.")
      });
  }

  //find the "deleted" annotation in state and remove it to optimstically render
  removeSpecificAnnotationInAnnotationArray = (individualAnnotation) => {
    let matchedIndex = this.state.annotationArray.findIndex(annotationArrayItem => annotationArrayItem === individualAnnotation)
    if (matchedIndex > -1) {
      let newArray = [...this.state.annotationArray]
      newArray.splice(matchedIndex, 1);
      this.setState({
        annotationArray: newArray,
        displayingFullAnnotation: false
      })
    }
  }




  render(){
    //Style for annotation marker that updates on each render
    let annotationMarkerStyle = {
      top: this.state.yCoord,
      left: this.state.xCoord,
    }

    return(
      <div className="container div--detail-container">

        <div className="div--art-annotations-container">

          <div className="annotation-zone">
            {/*Annotation marker is invisible until user actions displays it via state*/}
              { this.state.displayingMarker
                        ? <div id="annotation-marker" style={annotationMarkerStyle} ></div>
                        : null
              }
              <img id="detail-image" alt={this.props.selectedArtwork.title} onClick={this.onArtworkClick} src={this.props.selectedArtwork.primaryimageurl}></img>

              <div className="div--artwork-info">
                <h1>{this.props.selectedArtwork.title}</h1>
                <h3>{this.props.selectedArtwork.artist}</h3>
                <p>Medium: {this.props.selectedArtwork.medium}</p>
                <p>Source: <a href={this.props.selectedArtwork.url}>Harvard Art Museums</a> </p>
              </div>

              <hr/>

              <div className="container div--detail-form">
                <h2>Create an annotation:</h2>
                <form className="detail-form" onSubmit={this.onAnnotationSubmit}>

                  <div className="detail-form-small-inputs">
                    <label className="detail-form-label">Headline:</label>
                    <input className="detail-form-input" placeholder="headline here" name="headline" value={this.state.headline} onChange={this.onInputChange} ></input>

                    <label className="detail-form-label">Link:</label>
                    <input className="detail-form-input" placeholder="source link here" name="sourceLink" value={this.state.sourceLink} onChange={this.onInputChange} ></input>
                  </div>

                  <div className="detail-form-textarea">
                    <label className="detail-textarea-label detail-form-label">Annotation:</label>
                    <br/>
                    <textarea className="detail-form-textarea" placeholder="share your annotation here" name="content" value={this.state.content} onChange={this.onInputChange} ></textarea>
                    <br/>
                    <button className="detail-form-button">Submit annotation</button>
                  </div>

                </form>
              </div>

          </div>

          <div className="div--annotation-list-container">
            <h1 className="h1 h1-annotation-list-container-title">Annotations:</h1>
            {this.state.annotationArray.map(individualAnnotation => (
              <AnnotationCard
                className="div--annotation-card"
                annotation={individualAnnotation}
                selectedAnnotation={this.state.selectedAnnotation}
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

        <div className="div--full-annotation-container">
        {/*Displays full annotation when clicked via state*/}
        { this.state.displayingFullAnnotation
                  ? <FullAnnotation
                    selectedAnnotation={this.state.selectedAnnotation}
                    onAnnotationUpdateFormDisplay={this.onAnnotationUpdateFormDisplay}
                    onAnnotationCardDelete={this.onAnnotationCardDelete}
                    />
                  : null
        }

        {/*Displays update/edit form when clicked via state*/}
        { this.state.displayingEditForm
                  ? <EditForm
                    selectedAnnotation={this.state.selectedAnnotation}
                    xCoord={this.state.xCoord}
                    yCoord={this.state.yCoord}
                    onAnnotationUpdateFormDisplay={this.onAnnotationUpdateFormDisplay}
                    onAnnotationUpdateSubmit={this.onAnnotationUpdateSubmit}
                    />
                  : null
        }
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
