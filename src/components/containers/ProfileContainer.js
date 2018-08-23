import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnnotationListItem from "../AnnotationListItem";

const myAnnotationsUrl = "http://localhost:4000/me/annotations"

class ProfileContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      myAnnotationArray: [],
    }
  }

  componentDidMount(){
    fetch(myAnnotationsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth": localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(data => this.setState({myAnnotationArray: data.annotations}))
  }

  onClickAnnotation = (event, selectedArtwork) => {
    this.props.routerProps.history.push(`/artwork/${selectedArtwork.id}`)
    return this.props.selectArtwork(selectedArtwork);
  }

  render(){
    console.log("PROFILECONTAINER STATE AT RENDER", this.state.myAnnotationArray)
    return(
      <div className="container div--profile-container">
        <h1>Welcome to your homepage.</h1>
        <p><span style={{ fontWeight: 'bold' }}>Your email:</span> {this.props.loggedInUser.email}</p>
        <h3>Your annotations:</h3>

          {this.state.myAnnotationArray.map(individualAnnotation => (
            <AnnotationListItem
              key={individualAnnotation._id}
              individualAnnotation={individualAnnotation}
              onClickAnnotation={this.onClickAnnotation}
            />
          ))}

      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    loggedInUser: state.loggedInUser,
    selectedArtwork: state.selectedArtwork,
  }
}

function mapDispatchToProps(dispatch){
  return {
    selectArtwork: (chosenArtwork) => {
      dispatch({type: "SELECT_ARTWORK", payload: chosenArtwork})
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
