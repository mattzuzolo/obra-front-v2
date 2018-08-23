import React, { Component } from 'react';
import { connect } from 'react-redux';


class AnnotationCard extends Component {

  truncateString = (string) => {
    if (string.length > 200){
      let shortenedString = string.substring(0, 140)
      let shortenedStringWithFullWords = shortenedString.substr(0, shortenedString.lastIndexOf(" "));
      return shortenedStringWithFullWords + "...";
    }
  }

  getNameFromEmail = (emailAddress) => {
    console.log("EMAIL IN REDUX", this.props.loggedInUser.email)
    if(emailAddress === this.props.loggedInUser.email){
      return "YOU";
    }
    else if (emailAddress){
      let name = emailAddress.split("@");
      return name[0];
    }
    else {
      return emailAddress;
    }
  }

  render(){

    let borderStyle ={}
    if (this.props.selectedAnnotation._id === this.props.annotation._id){
      borderStyle = {
        "border-style": "solid",
        "border-width": "2.5px",
        "border-color": "#39ff14",
      }
    }

    return(
      <div onClick={(event) => this.props.onAnnotationCardClick(event, this.props.annotation)} className="div--annotation-card" style={borderStyle}>
        <h1>{this.props.headline}</h1>
        <p>{this.props.source}</p>
        <p>{this.truncateString(this.props.content)}</p>
        <p className="annotation-creator">Creator: {this.getNameFromEmail(this.props.creator)}</p>
        <br />


      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    loggedInUser: state.loggedInUser,
  }
}

export default connect(mapStateToProps)(AnnotationCard);
