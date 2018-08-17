import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtListContainer from "./ArtListContainer"
let querystring = require('querystring')


class IndexContainer extends Component {
    constructor(props){
      super(props);

      this.state = {
        activeQuery: "",
        submittedQuery: "",
      }
    }

  componentDidMount(){
    fetch("http://localhost:4000/artwork")
      .then(response => response.json())
      .then(data => this.props.updateArtworkArray(data.artwork));
  }

  onQueryChange = (event) => {
    this.setState({ activeQuery: event.target.value })
  }



  handleFormSubmit = (event) => {
    event.preventDefault();

    let submittedQuery = this.state.activeQuery;

    var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
    let searchString = querystring.stringify({
      apikey: "0eec8470-9658-11e8-90a5-d90dedc085a2",
      title: submittedQuery,
      classification: "Paintings"
    })

    fetch(apiEndpointBaseURL + "?" + searchString)
      .then(response => response.json())
      .then(data => filterForImageLinkPresent(data.records))
      .then(dataArray => this.props.updateArtworkArray(dataArray))
      .then(console.log)
  }

  render(){
    return(
      <div className="container div--index-container">

        <form onSubmit={this.handleFormSubmit}>
          <input placeholder="search for art here" value={this.state.activeQuery} onChange={this.onQueryChange} ></input>
          <button>Click me for art</button>

        </form>

        <ArtListContainer routerProps={this.props.routerProps} localArtworkArray={this.state.localArtworkArray} />

      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    artworkArray: state.artworkArray,
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateArtworkArray: (dataArray) => {
      dispatch({type: "UPDATE_ARTWORK_ARRAY", payload: dataArray})
    },
  }
}

let filterForImageLinkPresent = (data) => {
  return data.filter(individualWork => individualWork.primaryimageurl !== null )
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);
