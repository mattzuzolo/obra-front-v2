import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import NavBar from "./components/NavBar"
import IndexContainer from "./components/containers/IndexContainer";
import DetailContainer from "./components/containers/DetailContainer";
import LoginContainer from "./components/containers/LoginContainer";

class App extends Component {

  componentDidMount(){
    //display localled saved artworks at launch
    fetch("http://localhost:4000/artwork")
      .then(response => response.json())
      .then(localData => this.props.updateArtworkArray(localData))
  }

  render() {
    return (
      <div className="container div--app App">
        <Route path="/" component={NavBar} />
          <Switch>

            <Route path ={`/artwork/:id`} render={(routerProps) => {
                // let id = routerProps.match.params.id;
                // let foundArtwork = this.props.artworkArray.find((art) => art.apiId === parseInt(id, 10));
                return <DetailContainer />
              }} />

            <Route path="/artwork" render={(routerProps) => <IndexContainer
                routerProps={routerProps} />}/>

            <Route path="/login" component={LoginContainer} />

          </Switch>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    artworkArray: state.artworkArray,
    selectedArtwork: state.selectedArtwork,
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateArtworkArray: (dataArray) => {
      dispatch({type: "UPDATE_ARTWORK_ARRAY", payload: dataArray})
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
