import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtListContainer from "./ArtListContainer";
// import $ from 'jquery';

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
      .then(data => this.props.updateArtworkArray(data))
  }

  onQueryChange = (event) => {
    this.setState({ activeQuery: event.target.value })
  }

  // handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   let submittedQuery = this.state.activeQuery;
  //   this.setState({submittedQuery});
  //
  //   //External api access:
  //   // let searchQuery = submittedQuery
  //   // let searchQuery = "rabbit"
  //   var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
  //   var queryString = $.param({
  //       apikey: "0eec8470-9658-11e8-90a5-d90dedc085a2",
  //       title: submittedQuery,
  //       classification: "Paintings"
  //   });
  //
  //   fetch(apiEndpointBaseURL + "?" + queryString)
  //     .then(response => response.json())
  //     // .then(data => console.log("Data from fetch", data))
  //     .then(data => filterForImageLinkPresent(data.records))
  //     .then(dataArray => this.props.updateArtworkArray(dataArray))
  //
  //   // console.log("searchQuery", searchQuery)
  //   // console.log("apiEndpointBaseURL", apiEndpointBaseURL)
  //   // console.log("queryString", queryString)
  //
  //
  //
  //
  //
  //
  //
  // }

  render(){
    return(
      <div className="container div--index-container">
        <form onSubmit={this.handleFormSubmit}>
          <input placeholder="search for art here" value={this.state.activeQuery} onChange={this.onQueryChange} ></input>
          <button>Click me for art</button>
          <ArtListContainer routerProps={this.props.routerProps} />
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);
